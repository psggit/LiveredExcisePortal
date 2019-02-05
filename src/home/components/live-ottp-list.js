import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
//import Pagination from 'react-js-pagination'
import * as Actions from './../actions'
import LiveOrdersListItem from './live-ottp-list-item'
import Loader from '@components/loader'
import '@sass/_pagination.scss'
import Button from '@components/button'
import data from './../constants/live-orders-mock'
import Search from '@components/search'
import Toggle from '@components/toggle'
import Icon from '@components/icon'
import Pagination from '@components/pagination'
import PageHeader from '@components/pageheader'
import Filter from "@components/filterModal"

class LiveOrdersList extends React.Component {
  constructor() {
    super()
    this.pagesLimit = 10
    this.state = {
      activePage: 1,
      pageOffset: 0,
      data: data,
      loading: false,
      mountFilter: false
    }
    this.handlePageChange = this.handlePageChange.bind(this)
    this.handleClick = this.handleClick.bind(this)
    this.defaultData = this.defaultData.bind(this)
    this.filteredData = this.filteredData.bind(this)
    this.resetPagination = this.resetPagination.bind(this)
    this.handleSearch = this.handleSearch.bind(this)
    this.fetchData = this.fetchData.bind(this)
    this.mountFilterModal = this.mountFilterModal.bind(this)
  }

  handleClick(orderId, e) {
    this.props.history.push(`/home/live-orders/${orderId}`)
  }

  fetchData() {
    this.props.actions.fetchInProgressOTTP({
      limit: this.pagesLimit,
      offset,
      status: filters.status === 'all' ? undefined : filters.status
    })
  }

  handlePageChange(pagerObj) {
    clearTimeout(this.timeoutId)
    //console.log("pager obj", pagerObj)
    // const offset = this.pagesLimit * (pageNumber - 1)
    // const { filters } = this.props
    // this.setState({ activePage: pageNumber, pageOffset: offset })
    // this.props.actions.fetchInProgressOTTP({
    //   limit: this.pagesLimit,
    //   offset,
    //   status: filters.status === 'all' ? undefined : filters.status
    // })
  }

  resetPagination() {
    this.setState({ activePage: 1 })
  }

  componentDidMount() {
    //this.fetchData()
    this.defaultData()
  }

  defaultData() {
    const queryUri = location.search.slice(1).split('=')
    const status = queryUri[1]
    this.props.actions.fetchInProgressOTTP({
      limit: this.pagesLimit,
      offset: 0,
      status: status === 'all' ? undefined : status
    })

    this.timeoutId = setTimeout(this.defaultData, 30000)
  }

  filteredData() {
    this.props.actions.fetchInProgressOTTP({
      limit: this.pagesLimit,
      offset: 0,
      status: this.filters.status === 'all' ? undefined : this.filters.status
    })

    this.timeoutId = setTimeout(this.filteredData, 30000)
  }

  componentDidUpdate(prevProps) {
    const { filters } = this.props
    this.filters = Object.assign({}, filters)
    if (filters && JSON.stringify(prevProps.filters) !== JSON.stringify(filters)) {
      this.props.actions.setLoadingAll()
      this.resetPagination()
      clearTimeout(this.timeoutId)
      this.filteredData()
    }
  }

  componentWillUnmount() {
    clearTimeout(this.timeoutId)
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
      <PageHeader pageName="Live Orders" />
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
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div>
            <Toggle />
            <span style={{
              color: '#5a6872',
              fontSize: '14px',
              marginLeft: '10px'
              }}>
              Delivery enabled
            </span>
          </div>
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
      </div>
      <div style={{margin: '10px 0'}}>
        <Pagination
          activePage={1}
          pageSize={10}
          totalItemsCount={1000}
          //pageRangeDisplayed={5}
          onChangePage={this.handlePageChange}
        />
      </div>
        <div>
          <table>
            <thead>
              <tr>
                <th>Permit ID</th>
                <th>Date issued</th>
                <th>Time issued</th>
                <th>DSO</th>
                <th>Retailer</th>
                <th>City/Town</th>
                <th>Order amount</th>
                <th>Permit status</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {
                !this.state.loading
                ? this.state.data.map(item => (
                  <LiveOrdersListItem
                    handleClick={this.handleClick}
                    handleOrderAssign={this.openAssignOrderModal}
                    handleShowNotes={this.handleShowNotes}
                    key={item.ottp_id}
                    data={item}
                  />
                ))
                : (
                  <tr>
                    <td colSpan="6">
                      <Loader />
                    </td>
                  </tr>
                )
              }
              {
                !this.state.loading && !this.state.data.length &&
                <tr>
                  <td style={{ textAlign: 'center' }} colSpan="6">
                    No records found
                  </td>
                </tr>
              }
            </tbody>
          </table>
        </div>
        {/* {
          !this.props.loadingInProgressOTTP && this.props.inProgressOTTP.length
          ? <Pagination
            activePage={this.state.activePage}
            itemsCountPerPage={this.pagesLimit}
            totalItemsCount={this.props.inProgressCount}
            pageRangeDisplayed={5}
            onChange={this.handlePageChange}
          />
          : ''
        } */}
      </Fragment>
    )
  }
}

const mapStateToProps = state => state.main

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(Actions, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(LiveOrdersList)
