import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as Actions from './../actions'
import HistoryOrdersListItem from './history-ottp-list-item'
import Pagination from '@components/pagination'
import Loader from '@components/loader'
import { getQueryObj, getQueryUri } from "@utils/url-utils";
import Icon from "@components/icon"
import {pastOrderData} from "./../constants/past-orders-mock"
import "@sass/style.scss"
import PageHeader from "@components/pageheader"
import Filter from "@components/filterModal"
import Search from "@components/search"
import Button from "@components/button"
import {orderAmount} from "./../constants/static-data"

class HistoryOrdersList extends React.Component {
  constructor() {
    super()
    this.state = {
      activePage: 1,
      limit: 10,
      dsoList: [],
      cityList: [],
      mountFilter: false,
      filter: [],
      OttpId: ""
    }
  
    this.handlePageChange = this.handlePageChange.bind(this)
    this.handleClick = this.handleClick.bind(this)
    this.resetPagination = this.resetPagination.bind(this)
    this.handleSearch = this.handleSearch.bind(this)
    this.clearSearchResults = this.clearSearchResults.bind(this)
    this.applyFilter = this.applyFilter.bind(this)
    this.mountFilterModal = this.mountFilterModal.bind(this)
    this.fetchDropDownData = this.fetchDropDownData.bind(this)
    this.fetchHistoryOttps = this.fetchHistoryOttps.bind(this)
  }

  handleClick(dataObj) {
    this.props.history.push(`/home/past-orders/${dataObj.ottp_info.ottp_id}`, dataObj)
  }

  handlePageChange(pagerObj) {
    const queryUri = location.search.slice(1)
    const queryObj = getQueryObj(queryUri)

    let queryParamsObj = {}
    this.props.actions.setLoadingAll()
    clearTimeout(this.timeoutId)
    const offset = pagerObj.pageSize * (pagerObj.activePage - 1)
    this.setState({
      activePage: pagerObj.activePage,
      limit: pagerObj.pageSize
    })

    if(queryObj.filter && queryObj.filter.length) {
      queryParamsObj = {
        activePage: pagerObj.activePage,
        limit: pagerObj.pageSize,
        filter: queryObj.filter
      }
      this.props.actions.fetchHistoryOTTP({
        limit: pagerObj.pageSize,
        activePage: pagerObj.activePage,
        offset,
        filter: JSON.parse(decodeURIComponent(queryObj.filter))
      })
    } else {
      queryParamsObj = {
        activePage: pagerObj.activePage,
        limit: pagerObj.pageSize
      }
      this.props.actions.fetchHistoryOTTP({
        limit: pagerObj.pageSize,
        offset
      })
    }
  }

  resetPagination() {
    this.setState({ activePage: 1 })
  }

  componentDidMount() {
    if (location.search.length) {
      this.setQueryParamas()
      this.fetchDropDownData()
    } else {
      this.fetchHistoryOttps()
      this.fetchDropDownData()
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.DSOList !== prevProps.DSOList) {
      let dsoList = this.props.DSOList.map((item, i) => {
        return {text: item.name, value: i}
      })
      dsoList = [...dsoList, {text: "All", value: dsoList.length}]
      this.setState({dsoList})
    } else if(this.props.cityList !== prevProps.cityList) {
      let max = 0
      let cityList = this.props.cityList.map((item) => {
        if (parseInt(item.id) > max) {
          max = item.id
        }
        return {text: item.city, value: item.id}
      })
      cityList = [...cityList, {text: "All", value: parseInt(max) + 1}]
      this.setState({cityList})
    }
  }

  setQueryParamas() {
    const queryUri = location.search.slice(1)
    const queryObj = getQueryObj(queryUri)

    Object.entries(queryObj).forEach((item) => {
      this.setState({ [item[0]]: item[1] })
    })

    if(queryObj.filter) {
      const filter = JSON.parse(decodeURIComponent(queryObj.filter))
      if(filter.find(item => item.filterby === "OttpId")) {
        this.setState({OttpId: filter.find(item => item.filterby === "OttpId").value})
      }
      this.props.actions.fetchHistoryOTTP({
        limit: parseInt(queryObj.limit),
        offset: queryObj.limit * (queryObj.activePage - 1),
        filter: JSON.parse(decodeURIComponent(queryObj.filter))
      })
    } else {
      this.props.actions.fetchHistoryOTTP({
        limit: parseInt(queryObj.limit),
        offset: queryObj.limit * (queryObj.activePage - 1)
      })
    }

  }

  fetchHistoryOttps() {
    this.props.actions.fetchHistoryOTTP({
      limit: this.state.limit,
      offset: 0
    })
  }

  fetchDropDownData() {
    this.props.actions.fetchDSOList({
      limit: 10000,
      offset: 0
    })
    this.props.actions.fetchCitiesList({})
  }

  handleSearch(searchQuery) {
    //console.log("searched text", searchQuery)
    const filterObj = {
      filterby: "OttpId",
      value: searchQuery
    }
    const urlParams = {
      limit: 10,
      activePage: 1,
      filter: JSON.stringify([filterObj])
    }
    this.props.actions.fetchHistoryOTTP({
      limit: 10,
      offset: 0,
      filter: [filterObj]
    })
    history.pushState(urlParams, "past orders listing", `/home/past-orders?${(getQueryUri(urlParams))}`)
  }

  mountFilterModal() {
    this.setState({ mountFilter: !this.state.mountFilter })
  }

  clearSearchResults() {
    this.fetchHistoryOttps()
    this.props.history.push(`/home/past-orders`)
  }

  applyFilter(filter) {
    this.setState({limit: 10})
    const queryObj = {
      limit: 10,
      offset: 0,
      activePage: 1,
      filter: JSON.stringify(filter)
    }
    this.props.actions.fetchHistoryOTTP({
      limit: 10,
      offset: 0,
      filter: filter
    })
    history.pushState(queryObj, "past orders listing", `/home/past-orders?${getQueryUri(queryObj)}`)
    this.mountFilterModal()
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
            searchText={this.state.OttpId}
            clearSearch={this.clearSearchResults}
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
              dsoList={this.state.dsoList}
              cityList={this.state.cityList}
              orderAmount={orderAmount}
            >
            </Filter>
          </div>
        </div>
        {!this.props.loadingHistoryOTTP && this.props.historyOTTPData.length > 1 && (
          <div style={{ margin: "10px 0" }}>
            <Pagination
              activePage={this.state.activePage}
              pageSize={this.state.limit}
              totalItemsCount={this.props.historyOTTPCount}
              onChangePage={this.handlePageChange}
            />
          </div>
        )}
        <div>
          <table>
            <thead>
              <tr>
                <th>
                  <div 
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                    }}
                  >
                    <span style={{marginRight: '5px'}}>Permit ID</span>
                    <span className="info" style={{ position: "relative" }}>
                      <Icon name="info" />
                      <span className="tooltip-text">
                        Unique One Time Transport Permit Number
                      </span>
                    </span>
                  </div>
                </th>
                <th>
                  <div 
                    style={{
                      display: 'flex',
                      alignItems: 'center',
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
                    }}
                  >
                    <span style={{marginRight: '5px'}}>Delivery Operator</span>
                    <span className="info" style={{ position: "relative" }}>
                      <Icon name="info" />
                      <span className="tooltip-text">
                        On-demand application through which a customer places an order
                      </span>
                    </span>
                  </div>
                </th>
                <th>
                  <div 
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                    }}
                  >
                    <span style={{marginRight: '5px'}}>Retailer</span>
                    <span className="info" style={{ position: "relative" }}>
                      <Icon name="info" />
                      <span className="tooltip-text">
                        The retailer/retail outlet which received the order
                      </span>
                    </span>
                  </div>
                </th>
                <th>
                  <div 
                    style={{
                      display: 'flex',
                      alignItems: 'center',
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
                    }}
                  >
                    <span style={{marginRight: '5px'}}>Order Amount</span>
                    <span className="info" style={{ position: "relative" }}>
                      <Icon name="info" />
                      <span className="tooltip-text">
                        Price of the chosen alcohol beverage against its quantity
                      </span>
                    </span>
                  </div>
                </th>
                <th>
                  <div 
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                    }}
                  >
                    <span style={{marginRight: '5px'}}>Volume (ml)</span>
                    <span className="info" style={{ position: "relative" }}>
                      <Icon name="info" />
                      <span className="tooltip-text">
                        Unique One Time Transport Permit Number
                      </span>
                    </span>
                  </div>
                </th>
                <th>
                  <div 
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                    }}
                  >
                    <span style={{marginRight: '5px'}}>Permit Status</span>
                    <span className="info" style={{ position: "relative" }}>
                      <Icon name="info" />
                      <span className="tooltip-text">
                        Validity status of a single Permit ID
                      </span>
                    </span>
                  </div>
                </th>
                <th>
                  <div 
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                    }}
                  >
                    <span style={{marginRight: '5px'}}>Customer Age Verification</span>
                    <span className="info" style={{ position: "relative" }}>
                      <Icon name="info" />
                      <span className="tooltip-text">
                        Unique One Time Transport Permit Number
                      </span>
                    </span>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              {!this.props.loadingHistoryOTTP &&
              this.props.historyOTTPData &&
              this.props.historyOTTPData.map(item => (
                <HistoryOrdersListItem
                  handleClick={this.handleClick}
                  key={item.ottp_id}
                  data={item}
                />
              ))}
              {this.props.loadingHistoryOTTP && (
                <tr>
                  <td colSpan="9">
                    <Loader />
                  </td>
                </tr>
              )}
              {!this.props.loadingHistoryOTTP &&
              this.props.historyOTTPData.length === 0 && (
                <tr>
                  <td style={{ textAlign: "center" }} colSpan="9">
                    No orders found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Fragment>
    )
  }
}

const mapStateToProps = state => state.main

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(Actions, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(HistoryOrdersList)
