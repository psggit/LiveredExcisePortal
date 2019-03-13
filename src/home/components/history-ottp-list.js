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
import FilteredParams from "@components/filteredParams"

class HistoryOrdersList extends React.Component {
  constructor() {
    super()
    this.state = {
      activePage: 1,
      limit: 10,
      dsoList: [],
      cityList: [],
      retailerList: [],
      mountFilter: false,
      filter: [],
      OttpId: "",
      isFilterApplied: false,
      selectedCityIdx: "",
      selectedDsoIdx: "",
      selectedRetailerIdx: "",
      selectedOrderAmntIdx: "",
      fromDate: "",
      toDate: ""
    }
  
    this.handlePageChange = this.handlePageChange.bind(this)
    this.handleRowClick = this.handleRowClick.bind(this)
    this.handleSearch = this.handleSearch.bind(this)
    this.clearSearchResults = this.clearSearchResults.bind(this)
    this.applyFilter = this.applyFilter.bind(this)
    this.mountFilterModal = this.mountFilterModal.bind(this)
    this.fetchFilterDropDownData = this.fetchFilterDropDownData.bind(this)
    this.fetchHistoryOttps = this.fetchHistoryOttps.bind(this)
    this.resetFilter = this.resetFilter.bind(this)
    this.setSelectedDropDownValue = this.setSelectedDropDownValue.bind(this)
    this.setFilteredFieldState = this.setFilteredFieldState.bind(this)
  }

  componentDidMount() {
    if (location.search.length) {
      this.setQueryParamas()
      this.fetchFilterDropDownData()
    } else {
      this.fetchHistoryOttps()
      this.fetchFilterDropDownData()
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.DSOList !== prevProps.DSOList) {
      let dsoList = this.props.DSOList.map((item, i) => {
        return {text: item.dso_name, value: i}
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
    } else if(this.props.retailerList !== prevProps.retailerList) {
      let retailerList = this.props.retailerList.map((item, i) => {
        return {text: item.name, value: i}
      })
      retailerList = [...retailerList, {text: "All", value: retailerList.length}]
      this.setState({retailerList})
    }
  }

  /**
   * Sets the dropdown field with selected value
   * @param {String} name - selected dropdown field name
   * @param {String} value - selected dropdown field index
   */
  setFilteredFieldState(fieldName, value) {
    if(fieldName !== "FromDate" && fieldName !== "ToDate") {
      const selectedFieldIdx = `selected${fieldName}Idx`
      this.setState({ [selectedFieldIdx]: value })
    } else if(fieldName === "FromDate") {
      this.setState({ fromDate: value})
    } else if (fieldName === "ToDate") {
      this.setState({ toDate: value})
    }
  }

  /**
   * Sets the filtered dropdown value on page reload
   */
  setSelectedDropDownValue(item) {
    switch(item.filterby) {
      case 'City':
        this.setFilteredFieldState('City', item.idx)
      break;
      case 'Delivery Operator':
        this.setFilteredFieldState('Dso', item.idx)
      break;
      case 'Order Amount':
        this.setFilteredFieldState('OrderAmnt', item.idx)
      break;
      case 'Retailer':
        this.setFilteredFieldState('Retailer', item.idx)
      break;
      case 'From':
        this.setFilteredFieldState('FromDate', item.value)
      break;
      case 'To':
        this.setFilteredFieldState('ToDate', item.value)
      break;
    }
  }

  /**
    * Gets the url parameters and fetches pastOrder Ottps
  **/
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

      filter.map((item) => {
        this.setSelectedDropDownValue(item)
      })

      this.setState({isFilterApplied: true,  filter: JSON.parse(decodeURIComponent(queryObj.filter))})
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

  /**
   * On clicking each pastorder it takes to detailed view page of that particular order 
   * @param {object} dataObj - Passed from historyOttpListItem 
   * @param {string} dataObj.ottp_id - Used to get the details of clicked past order
   **/
  handleRowClick(dataObj) {
    this.props.history.push(`/home/past-orders/${dataObj.ottp_info.ottp_id}`, dataObj)
  }

  /**
   * Navigates to next page
   * @param {object} pagerObj - Passed from pagination component
   * @param {Integer} pagerObj.activePage - Used to calculate the offset to fetch next set of past orders 
   * @param {Integer} pagerObj.pageSize - Used as limit to fetch next set of past orders
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

  /**
   * Fetches the past orders of given limit and offset
   */
  fetchHistoryOttps() {
    this.props.actions.fetchHistoryOTTP({
      limit: this.state.limit,
      offset: 0
    })
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
    this.props.actions.fetchRetailerList({
      limit: 10000,
      offset: 0,
      state_short_name: "TN"
    })
  }

  /**
   * Fetches the past order of given OttpId
   * @param {string} searchQuery - OttpId passed from searchComponent, used for filtering the past orders
   */
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
    this.setState({filter: [filterObj]})
    history.pushState(urlParams, "past orders listing", `/home/past-orders?${(getQueryUri(urlParams))}`)
  }

  /**
   * Toggles[mount and unmounts] the filter component
   */
  mountFilterModal() {
    this.setState({ mountFilter: !this.state.mountFilter })
  }

  /**
   * Clears the applied filter/search and renders all the past orders
   */
  clearSearchResults() {
    if(this.state.filter.length > 0) {
      this.fetchHistoryOttps()
      this.props.history.push(`/home/past-orders`)
      this.setState({isFilterApplied: false})
    }
  }

  /**
   * Fetches the filtered past orders
   * @param {array of object} filter - Passed form FilterModal component
   */
  applyFilter(filter) {
    let filterArr = filter
    if(this.state.filter) {
      filterArr = this.state.filter
      filter.map((item) => {
        filterArr.push(item)
      })
    }
    this.setState({
      limit: 10, 
      filter: filterArr, 
      isFilterApplied: true
    })

    const queryObj = {
      limit: 10,
      offset: 0,
      activePage: 1,
      filter: JSON.stringify(filterArr)
    }
    this.props.actions.fetchHistoryOTTP({
      limit: 10,
      offset: 0,
      filter: filterArr
    })
    history.pushState(queryObj, "past orders listing", `/home/past-orders?${getQueryUri(queryObj)}`)
    this.mountFilterModal()
  }

  resetFilter() {
    this.clearSearchResults()
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
            placeholder="Search by permit Id"
            search={this.handleSearch}
            searchText={this.state.OttpId}
            clearSearch={this.clearSearchResults}
          />
          <div style={{ marginLeft: '46px', position: 'relative' }}>
            <span style={{ marginRight: '10px' }}>
              <Button secondary onClick={this.resetFilter}>
                <span>Reset Filter</span>
              </Button>
            </span>
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
              retailerList={this.state.retailerList}
              selectedCityIdx={this.state.selectedCityIdx}
              selectedDsoIdx={this.state.selectedDsoIdx}
              selectedOrderAmntIdx={this.state.selectedOrderAmntIdx}
              selectedRetailerIdx={this.state.selectedRetailerIdx}
              fromDate={this.state.fromDate}
              toDate={this.state.toDate}
            >
            </Filter>
          </div>
        </div>
        {
          this.state.isFilterApplied &&
          <FilteredParams data={this.state.filter} />
        }
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
                        Total volume of alcoholic beverages
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
                        Validity status of a single Permit ID (Active/Expired)
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
                        Age verified for legal drinking age with proof of a valid government ID
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
                  handleClick={this.handleRowClick}
                  key={item.ottp_info.ottp_id }
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
