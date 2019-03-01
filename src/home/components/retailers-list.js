import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as Actions from './../actions'
import RetailersListItem from './retailer-list-item'
import Pagination from '@components/pagination'
import Search from '@components/search'
import PageHeader from '@components/pageheader'
import Loader from "@components/loader"
import Icon from "@components/icon"
import { getQueryObj, getQueryUri } from "@utils/url-utils"
//import { retailersList } from './../constants/retailers-list'

class RetailersList extends React.Component {
  constructor() {
    super()
    this.state = {
      activePage: 1,
      limit: 10,
      retailerName: "",
      filter: []
    }
    this.state_short_name = "TN"
    this.handlePageChange = this.handlePageChange.bind(this)
    this.handleClick = this.handleClick.bind(this)
    this.fetchRetailersList = this.fetchRetailersList.bind(this)
    this.setQueryParamas = this.setQueryParamas.bind(this)
    this.clearSearchResults = this.clearSearchResults.bind(this)
    this.handleSearch = this.handleSearch.bind(this)
  }

  componentDidMount() {
    if (location.search.length) {
      this.setQueryParamas()
    } else {
      this.fetchRetailersList()
    }
  }

  /**
    * Gets the url parameters and fetches retailer list
    */
  setQueryParamas() {
    const queryUri = location.search.slice(1)
    const queryObj = getQueryObj(queryUri)

    Object.entries(queryObj).forEach((item) => {
      this.setState({ [item[0]]: item[1] })
    })

    if(queryObj.filter) {
      const filter = JSON.parse(decodeURIComponent(queryObj.filter))
      if(filter.find(item => item.filterby === "RetailerName")) {
        this.setState({retailerName: filter.find(item => item.filterby === "RetailerName").value})
      }
      this.props.actions.fetchRetailerList({
        limit: parseInt(queryObj.limit),
        offset: queryObj.limit * (queryObj.activePage - 1),
        state_short_name: this.state_short_name,
        filter: JSON.parse(decodeURIComponent(queryObj.filter))
      })
    } else {
      this.props.actions.fetchRetailerList({
        limit: parseInt(queryObj.limit),
        state_short_name: this.state_short_name,
        offset: queryObj.limit * (queryObj.activePage - 1)
      })
    }
  }

  /**
   * Fetches the retailer list of given limit and offset
   */
  fetchRetailersList() {
    this.props.actions.fetchRetailerList({
      limit: this.state.limit,
      offset: 0,
      state_short_name: this.state_short_name
    })
  }

  /**
   * On clicking each retailer it takes to detailed view page of that retailer
   * @param {object} dataObj - Passed from retailerListItem 
   * @param {string} dataObj.retailer_id - Used to get the details of clicked retailer
   **/
  handleClick(dataObj) {
    this.props.history.push(`/home/retailers/${dataObj.retailer_id}`, dataObj)
  }

  /**
   * Navigates to next page
   * @param {object} pagerObj - Passed from pagination component
   * @param {Integer} pagerObj.activePage - Used to calculate the offset to fetch next set of retailers
   * @param {Integer} pagerObj.pageSize - Used as limit to fetch next set of retailers
   */
  handlePageChange(pagerObj) {
    this.props.actions.setLoadingAll()
    const offset = pagerObj.pageSize * (pagerObj.activePage - 1)

    this.setState({
      activePage: pagerObj.activePage,
      limit: pagerObj.pageSize
    })

    this.props.actions.fetchRetailerList({
      limit: pagerObj.pageSize,
      offset,
      state_short_name: this.state_short_name
    })

    const queryParamsObj = {
      activePage: pagerObj.activePage,
      limit: pagerObj.pageSize
    }

    history.pushState(
      queryParamsObj,
      "retailers listing",
      `/home/retailers?${getQueryUri(queryParamsObj)}`
    )
  }

  /**
   * Clears the applied filter/search and renders all the retailers
   */
  clearSearchResults() {
    if(this.state.filter.length > 0) {
      this.fetchRetailersList()
      this.props.history.push(`/home/retailers`)
    }
  }


  /**
   * Fetches the retailer details of given name
   * @param {string} searchQuery - retailerName passed from searchComponent, used for filtering the retailer list
   */
  handleSearch(searchQuery) {
    //console.log("searched text", searchQuery)
    const filterObj = {
      filterby: "RetailerName",
      value: searchQuery
    }
    const urlParams = {
      limit: 10,
      activePage: 1,
      filter: JSON.stringify([filterObj])
    }
    this.props.actions.fetchRetailerList({
      limit: 10,
      offset: 0,
      filter: [filterObj]
    })
    this.setState({filter: [filterObj]})
    history.pushState(urlParams, "retailer listing", `/home/retailers?${(getQueryUri(urlParams))}`)
  }

  render() {
    return (
      <Fragment>
        <PageHeader pageName="Retailers" />
        <div style={{
          marginBottom: "20px"
        }}
        > 
          <Search
            placeholder="Search"
            searchText={this.state.retailerName}
            search={this.handleSearch}
            clearSearch={this.clearSearchResults}
          />
        </div>
        {
          !this.props.loadingRetailerList && this.props.retailerList.length > 1 &&
          (
            <div style={{ margin: "10px 0" }}>
              <Pagination
                activePage={this.state.activePage}
                pageSize={this.state.limit}
                totalItemsCount={this.props.retailerListCount}
                onChangePage={this.handlePageChange}
              />
            </div>
          )
        }
        <div style={{ width: '100%' }}>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>City/Town</th>
                <th>Address</th>
                <th>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center"
                    }}
                  >
                    <span style={{ marginRight: "5px" }}>License Type</span>
                    <span className="info" style={{ position: "relative" }}>
                      <Icon name="info" />
                      <span className="tooltip-text">
                        Type of license acquired by Authorized Retailer
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
                    <span style={{ marginRight: "5px" }}>License Status</span>
                    <span className="info" style={{ position: "relative" }}>
                      <Icon name="info" />
                      <span className="tooltip-text">
                        Current status of Retailer’s license 
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
                    <span style={{ marginRight: "5px" }}>Service Status</span>
                    <span className="info" style={{ position: "relative" }}>
                      <Icon name="info" />
                      <span className="tooltip-text">
                        Current status of Retailer if their service is enabled or disabled
                      </span>
                    </span>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              {
                !this.props.loadingRetailerList &&
                this.props.retailerList &&
                this.props.retailerList.map(item => (
                  <RetailersListItem
                    handleClick={this.handleClick}
                    key={item.retailer_id}
                    data={item}
                  />
                ))
              }
              {this.props.loadingRetailerList && (
                <tr>
                  <td colSpan="8">
                    <Loader />
                  </td>
                </tr>
              )}
              {!this.props.loadingRetailerList &&
                this.props.retailerList.length === 0 && (
                <tr>
                  <td style={{ textAlign: "center" }} colSpan="8">
                    No retailers found
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

export default connect(mapStateToProps, mapDispatchToProps)(RetailersList)
