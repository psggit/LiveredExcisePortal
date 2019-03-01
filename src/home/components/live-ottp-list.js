import React, { Fragment } from "react"
import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import * as Actions from "./../actions"
import LiveOrdersListItem from "./live-ottp-list-item"
import Loader from "@components/loader"
import Button from "@components/button"
//import { pastOrderData } from "./../constants/past-orders-mock"
import { orderAmount } from "./../constants/static-data"
import Search from "@components/search"
import Icon from "@components/icon"
import Pagination from "@components/pagination"
import PageHeader from "@components/pageheader"
import Filter from "@components/filterModal"
import { getQueryObj, getQueryUri } from "@utils/url-utils"
import "@sass/style.scss"

class LiveOrdersList extends React.Component {
  constructor() {
    super()
    this.state = {
      activePage: 1,
      dsoList: [],
      cityList: [],
      limit: 10,
      mountFilter: false,
      filter: [],
      OttpId: ""
    }
    this.handlePageChange = this.handlePageChange.bind(this)
    this.handleRowClick = this.handleRowClick.bind(this)
    this.fetchLiveOttps = this.fetchLiveOttps.bind(this)
    this.handleSearch = this.handleSearch.bind(this)
    this.clearSearchResults = this.clearSearchResults.bind(this)
    this.fetchFilterDropDownData = this.fetchFilterDropDownData.bind(this)
    this.mountFilterModal = this.mountFilterModal.bind(this)
    this.applyFilter = this.applyFilter.bind(this)
    this.resetFilter = this.resetFilter.bind(this)
  }

  componentDidMount() {
    if (location.search.length) {
      this.setQueryParamas()
      this.fetchFilterDropDownData()
    } else {
      this.fetchLiveOttps()
      this.fetchFilterDropDownData()
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

  /**
    * Gets the url parameters and fetches live ottps
    */
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
      this.props.actions.fetchInProgressOTTP({
        limit: parseInt(queryObj.limit),
        offset: queryObj.limit * (queryObj.activePage - 1),
        filter: JSON.parse(decodeURIComponent(queryObj.filter))
      })
    } else {
      this.props.actions.fetchInProgressOTTP({
        limit: parseInt(queryObj.limit),
        offset: queryObj.limit * (queryObj.activePage - 1)
      })
    }
  }

  /**
   * On clicking each liveOrder it takes to detailed view page of that particular order 
   * @param {object} dataObj - Passed from liveOttpListItem 
   * @param {string} dataObj.ottp_id - Used to get the details of clicked live order
   **/
  handleRowClick(dataObj) {
    this.props.history.push(
      `/home/live-orders/${dataObj.ottp_info.ottp_id}`,
      dataObj
    )
  }

  /**
   * Fetches DsoList and CityList to list in filter dropdown
   */
  fetchFilterDropDownData() {
    this.props.actions.fetchDSOList({
      limit: 10000,
      offset: 0
    })
    this.props.actions.fetchCitiesList({})
  }

  /**
   * Navigates to next page
   * @param {object} pagerObj - Passed from pagination component
   * @param {Integer} pagerObj.activePage - Used to calculate the offset to fetch next set of live orders 
   * @param {Integer} pagerObj.pageSize - Used as limit to fetch next set of live orders
   */
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
      this.props.actions.fetchInProgressOTTP({
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
      this.props.actions.fetchInProgressOTTP({
        limit: pagerObj.pageSize,
        offset
      })
    }
   
    history.pushState(
      queryParamsObj,
      "live orders listing",
      `/home/live-orders?${getQueryUri(queryParamsObj)}`
    )
  }

  /**
   * Fetches the live orders of given limit and offset for every 30 secs
   */
  fetchLiveOttps() {
    const queryUri = location.search.slice(1)
    const queryObj = getQueryObj(queryUri)
    if(queryObj.filter) {
      this.props.actions.fetchInProgressOTTP({
        limit: this.state.limit,
        offset: 0,
        filter: JSON.parse(decodeURIComponent(queryObj.filter))
      })
    } else {
      this.props.actions.fetchInProgressOTTP({
        limit: this.state.limit,
        offset: 0,
      })
    }
    this.timeoutId = setTimeout(this.fetchLiveOttps, 30000)
  }

  /**
   * Clears the timer on unmounting the component
   */
  componentWillUnmount() {
    clearTimeout(this.timeoutId)
  }

  /**
   * Fetches the live order of given OttpId
   * @param {string} searchQuery - OttpId passed from searchComponent, used for filtering the live orders
   */
  handleSearch(searchQuery) {
    const filterObj = {
      filterby: "OttpId",
      value: searchQuery
    }
    const urlParams = {
      limit: 10,
      activePage: 1,
      filter: JSON.stringify([filterObj])
    }
    this.props.actions.fetchInProgressOTTP({
      limit: 10,
      offset: 0,
      filter: [filterObj]
    })
    this.setState({filter: [filterObj]})
    history.pushState(urlParams, "live orders listing", `/home/live-orders?${(getQueryUri(urlParams))}`)
  }

  /**
   * Toggles[mount and unmounts] the filter component
   */
  mountFilterModal() {
    this.setState({ mountFilter: !this.state.mountFilter })
  }

  /**
   * Clears the applied filter/search and renders all the live orders
   */
  clearSearchResults() {
    if(this.state.filter.length > 0) {
      this.fetchLiveOttps()
      this.props.history.push(`/home/live-orders`)
    }
  }

  /**
   * Clears the filter
   */
  resetFilter() {
    this.clearSearchResults()
  }

  /**
   * Fetches the filtered live orders
   * @param {array of object} filter - Passed form FilterModal component
   */
  applyFilter(filter) {
    this.setState({limit: 10, filter})
    const queryObj = {
      limit: 10,
      offset: 0,
      activePage: 1,
      filter: JSON.stringify(filter)
    }
    this.props.actions.fetchInProgressOTTP({
      limit: 10,
      offset: 0,
      filter: filter
    })
    history.pushState(queryObj, "live orders listing", `/home/live-orders?${getQueryUri(queryObj)}`)
    this.mountFilterModal()
  }

  render() {
    return (
      <Fragment>
        <PageHeader pageName="Live Orders" />
        <div style={{
          display: "flex",
          marginBottom: "20px",
          justifyContent: "space-between",
          alignItems: "center"
        }}
        > 
          <Search
            placeholder="Search"
            searchText={this.state.OttpId}
            search={this.handleSearch}
            clearSearch={this.clearSearchResults}
          />
          <div style={{ marginLeft: '46px', position: 'relative' }}>
            <span style={{ marginRight: '10px' }}>
              <Button primary onClick={this.resetFilter}>
                <span>Reset Filter</span>
              </Button>
            </span>
            <Button primary onClick={this.mountFilterModal}>
              <Icon name="filter" />
              <span style={{ position: 'relative', top: '-2px', marginLeft: '5px' }}>Filter</span>
            </Button>
            <Filter
              showFilter={this.state.mountFilter}
              filterName="liveOrders"
              applyFilter={this.applyFilter}
              cityList={this.state.cityList}
              dsoList={this.state.dsoList}
              orderAmount={orderAmount}
              //permitStatus={this.permitStatus}
            >
            </Filter>
          </div>
        </div> 
        {!this.props.loadingInProgressOTTP && this.props.inProgressOTTP.length > 1 && (
          <div style={{ margin: "10px 0" }}>
            <Pagination
              activePage={this.state.activePage}
              pageSize={this.state.limit}
              totalItemsCount={this.props.inProgressCount}
              onChangePage={this.handlePageChange}
            />
          </div>
        )}
        {
          <div>
            <table>
              <thead>
                <tr>
                  <th>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center"
                      }}
                    >
                      <span style={{ marginRight: "5px" }}>Permit ID</span>
                      <span className="info" style={{ position: "relative" }}>
                        <Icon name="info" />
                        <span className="tooltip-text">
                          Unique One Time Transport Permit Number
                        </span>
                      </span>
                    </div>
                  </th>
                  <th>Date Issued</th>
                  <th>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center"
                      }}
                    >
                      <span style={{ marginRight: "5px" }}>
                        Delivery Operator
                      </span>
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
                        display: "flex",
                        alignItems: "center"
                      }}
                    >
                      <span style={{ marginRight: "5px" }}>Retailer</span>
                      <span className="info" style={{ position: "relative" }}>
                        <Icon name="info" />
                        <span className="tooltip-text">
                          The retailer/retail outlet which received the order
                        </span>
                      </span>
                    </div>
                  </th>
                  <th>City/Town</th>
                  <th>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center"
                      }}
                    >
                      <span style={{ marginRight: "5px" }}>Order Amount</span>
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
                        display: "flex",
                        alignItems: "center"
                      }}
                    >
                      <span style={{ marginRight: "5px" }}>Permit Status</span>
                      <span className="info" style={{ position: "relative" }}>
                        <Icon name="info" />
                        <span className="tooltip-text">
                          Validity status of a single Permit ID 
                        </span>
                      </span>
                    </div>
                  </th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {!this.props.loadingInProgressOTTP &&
                  this.props.inProgressOTTP &&
                  this.props.inProgressOTTP.map(item => (
                    <LiveOrdersListItem
                      handleClick={this.handleRowClick}
                      key={item.ottp_info.ottp_id}
                      data={item}
                    />
                  ))}
                {this.props.loadingInProgressOTTP && (
                  <tr>
                    <td colSpan="8">
                      <Loader />
                    </td>
                  </tr>
                )}
                {!this.props.loadingInProgressOTTP &&
                  this.props.inProgressOTTP.length === 0 && (
                  <tr>
                    <td style={{ textAlign: "center" }} colSpan="8">
                      No orders found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        }
      </Fragment>
    )
  }
}

const mapStateToProps = state => state.main

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(Actions, dispatch)
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LiveOrdersList)
