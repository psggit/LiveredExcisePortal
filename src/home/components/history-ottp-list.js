import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as Actions from './../actions'
import HistoryOrdersListItem from './history-ottp-list-item'
import Pagination from '@components/pagination'
//import '@sass/_pagination.scss'
import Loader from '@components/loader'
import Icon from "@components/icon"
import {pastOrderData} from "./../constants/past-orders-mock"
import "@sass/style.scss"
import PageHeader from "@components/pageheader"
import Filter from "@components/filterModal"
import Search from "@components/search"
import Button from "@components/button"

class HistoryOrdersList extends React.Component {
  constructor() {
    super()
    this.pagesLimit = 10
    this.state = {
      activePage: 1,
      pageOffset: 0,
      data: pastOrderData.data,
      loading: false,
      mountFilter: false
    }
    this.handlePageChange = this.handlePageChange.bind(this)
    this.handleClick = this.handleClick.bind(this)
    this.resetPagination = this.resetPagination.bind(this)
    this.handleSearch = this.handleSearch.bind(this)
    this.applyFilter = this.applyFilter.bind(this)
    this.mountFilterModal = this.mountFilterModal.bind(this)
  }

  handleClick(dataObj) {
    console.log("data", dataObj)
    this.props.history.push(`/home/past-orders/${dataObj.order.order_id}`, dataObj)
  }

  handlePageChange(pageNumber) {
    const offset = this.pagesLimit * (pageNumber - 1)
    const { filters } = this.props
    this.setState({ activePage: pageNumber, pageOffset: offset })
    this.props.actions.fetchHistoryOTTP({
      limit: this.pagesLimit,
      offset,
      // from_date: filters.from,
      // to_date: filters.to,
      //status: filters.status === 'all' ? undefined : filters.status
    })
  }

  resetPagination() {
    this.setState({ activePage: 1 })
  }

  componentDidMount() {
    const queryUri = location.search.slice(1)
    let today = new Date()
    today.setUTCHours(0, 0, 0, 0)
    let tommorrow = new Date(today.getTime())
    tommorrow.setDate(tommorrow.getDate() + 1)
    tommorrow.setUTCHours(0, 0, 0, 0)

    const queryObj = {}

    queryUri.split('&')
    .map(item => item.split('='))
    .forEach(([key, value]) => {
      queryObj[key] = value
    })


    this.props.actions.fetchHistoryOTTP({
      limit: this.pagesLimit,
      offset: 0,
      from_date: queryObj.from_date || today,
      to_date: queryObj.to_date || tommorrow,
      status: queryObj.status === 'all' ? undefined : queryObj.status
    })
  }

  componentDidUpdate(prevProps) {
    const { filters } = this.props
    if (JSON.stringify(prevProps.filters) !== JSON.stringify(filters)) {
      this.props.actions.setLoadingAll()
      this.resetPagination()
      this.props.actions.fetchHistoryOTTP({
        limit: this.pagesLimit,
        offset: 0,
        from_date: filters.from,
        to_date: filters.to,
        status: filters.status === 'all' ? undefined : filters.status
      })
    }
  }

  handleSearch(searchQuery) {
    console.log("searched text", searchQuery)
  }

  mountFilterModal() {
    this.setState({ mountFilter: !this.state.mountFilter })
  }

  applyFilter() {
    console.log("apply filter")
  }

  render() {
    return (
      <Fragment>
        <PageHeader pageName="Past Orders" />
        <div style={{
          display: 'flex',
          marginBottom: '20px',
          justifyContent: 'space-between',
          alignItems: 'center'
          }}>
          <Search
            placeholder="Search"
            search={this.handleSearch}
          />
          <div style={{ marginLeft: '46px', position: 'relative' }}>
            <Button primary onClick={this.mountFilterModal}>
              <Icon name="filter" />
              <span style={{ position: 'relative', top: '-2px', marginLeft: '5px' }}>Filter</span>
            </Button>
            <Filter
              showFilter={this.state.mountFilter}
              filterName="pastOrders"
              applyFilter={this.applyFilter}
            >
            </Filter>
          </div>
        </div>
        <div>
          <table>
            <thead>
              <tr>
                <th>
                  <div 
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      //justifyContent: 'space-around'
                    }}
                  >
                    <span style={{marginRight: '5px'}}>Permit ID</span>
                    <span><Icon name="info" /></span>
                  </div>
                </th>
                <th>
                  <div 
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      //justifyContent: 'space-around'
                    }}
                  >
                    <span style={{marginRight: '5px'}}>Time</span>
                  </div>
                </th>
                <th>
                  <div 
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      //justifyContent: 'space-around'
                    }}
                  >
                    <span style={{marginRight: '5px'}}>Delivery Operator</span>
                    <span><Icon name="info" /></span>
                  </div>
                </th>
                <th>
                  <div 
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      //justifyContent: 'space-around'
                    }}
                  >
                    <span style={{marginRight: '5px'}}>Retailer</span>
                    <Icon name="info" />
                  </div>
                </th>
                <th>
                  <div 
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      //justifyContent: 'space-around'
                    }}
                  >
                    <span style={{marginRight: '5px'}}>City/Town</span>
                  </div>
                </th>
                <th>
                  <div 
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      //justifyContent: 'space-around'
                    }}
                  >
                    <span style={{marginRight: '5px'}}>Order Amount</span>
                    <span><Icon name="info" /></span>
                  </div>
                </th>
                <th>
                  <div 
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      //justifyContent: 'space-around'
                    }}
                  >
                    <span style={{marginRight: '5px'}}>Volume (Litres)</span>
                    <span><Icon name="info" /></span>
                  </div>
                </th>
                <th>
                  <div 
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      //justifyContent: 'space-around'
                    }}
                  >
                    <span style={{marginRight: '5px'}}>Permit Status</span>
                    <span><Icon name="info" /></span>
                  </div>
                </th>
                <th>
                  <div 
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      //justifyContent: 'space-around'
                    }}
                  >
                    <span style={{marginRight: '5px'}}>Customer Age Verification</span>
                    <span><Icon name="info" /></span>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              {
                !this.state.loading
                ? this.state.data.map(item => (
                  <HistoryOrdersListItem
                    handleClick={this.handleClick}
                    key={item.ottp_id}
                    data={item}
                  />
                ))
                : (
                  <tr>
                    <td colSpan="7">
                      <Loader />
                    </td>
                  </tr>
                )
              }
              {
                !this.props.loadingHistoryOTTP && !this.props.historyOTTPData.length &&
                <tr>
                  <td style={{ textAlign: 'center' }} colSpan='7'>
                    No records found
                  </td>
                </tr>
              }
            </tbody>
          </table>
        </div>
        {
          !this.props.loadingHistoryOTTP && this.props.historyOTTPData.length
          ? <Pagination
            activePage={this.state.activePage}
            itemsCountPerPage={this.pagesLimit}
            totalItemsCount={this.props.historyOTTPCount}
            pageRangeDisplayed={5}
            onChange={this.handlePageChange}
          />
          : ''
        }

      </Fragment>
    )
  }
}

const mapStateToProps = state => state.main

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(Actions, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(HistoryOrdersList)
