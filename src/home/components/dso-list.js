import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as Actions from './../actions'
import DSOListItem from './dso-list-item'
import { getQueryObj, getQueryUri } from "@utils/url-utils";
import Pagination from '@components/pagination'
import Loader from '@components/loader'
//import { dsoList } from './../constants/dso-list'
import PageHeader from '@components/pageheader'
import Icon from "@components/icon"
import Search from "@components/search"

class DSOList extends React.Component {
  constructor() {
    super()

    this.state = {
      activePage: 1,
      limit: 10,
      dsoName: "",
      filter: []
    }
    this.handlePageChange = this.handlePageChange.bind(this)
    this.handleRowClick = this.handleRowClick.bind(this)
    this.setQueryParamas = this.setQueryParamas.bind(this)
    this.handleSearch = this.handleSearch.bind(this)
    this.fetchDsoList = this.fetchDsoList.bind(this)
    this.clearSearchResults = this.clearSearchResults.bind(this)
  }

  componentDidMount() {
    if (location.search.length) {
      this.setQueryParamas()
    } else {
      this.fetchDsoList()
    }
  }

  /**
    * Gets the url parameters and fetches dso's
    */
  setQueryParamas() {
    const queryUri = location.search.slice(1)
    const queryObj = getQueryObj(queryUri)

    Object.entries(queryObj).forEach((item) => {
      this.setState({ [item[0]]: item[1] })
    })

    if(queryObj.filter) {
      const filter = JSON.parse(decodeURIComponent(queryObj.filter))
      if(filter.find(item => item.filterby === "DsoName")) {
        this.setState({dsoName: filter.find(item => item.filterby === "DsoName").value})
      }
      this.props.actions.fetchDSOList({
        limit: parseInt(queryObj.limit),
        offset: queryObj.limit * (queryObj.activePage - 1),
        filter: JSON.parse(decodeURIComponent(queryObj.filter))
      })
    } else {
      this.props.actions.fetchDSOList({
        limit: parseInt(queryObj.limit),
        offset: queryObj.limit * (queryObj.activePage - 1)
      })
    }
  }

  /**
   * Fetches the dso's of given limit and offset
   */
  fetchDsoList() {
    this.props.actions.fetchDSOList({
      limit: this.state.limit,
      offset: 0
    })
  }

  /**
   * On clicking each dso it takes to detailed view page of that dso
   * @param {object} dataObj - Passed from dsoListItem 
   * @param {string} dataObj.id - Used to get the details of clicked dso
   **/
  handleRowClick(dataObj) {
    this.props.history.push(`/home/delivery-operators/${dataObj.id}`, dataObj)
  }

  /**
   * Navigates to next page
   * @param {object} pagerObj - Passed from pagination component
   * @param {Integer} pagerObj.activePage - Used to calculate the offset to fetch next set of dso's
   * @param {Integer} pagerObj.pageSize - Used as limit to fetch next set of dso's
   */
  handlePageChange(pagerObj) {
    this.props.actions.setLoadingAll()
    const offset = pagerObj.pageSize * (pagerObj.activePage - 1)

    this.setState({
      activePage: pagerObj.activePage,
      limit: pagerObj.pageSize
    })

    this.props.actions.fetchDSOList({
      limit: pagerObj.pageSize,
      offset
    })

    const queryParamsObj = {
      activePage: pagerObj.activePage,
      limit: pagerObj.pageSize
    }

    history.pushState(
      queryParamsObj,
      "past orders listing",
      `/home/delivery-operators?${getQueryUri(queryParamsObj)}`
    )
  }

  /**
   * Clears the applied filter/search and renders all the dso's
   */
  clearSearchResults() {
    if(this.state.filter.length > 0) {
      this.fetchDsoList()
      this.props.history.push(`/home/delivery-operators`)
    }
  }


  /**
   * Fetches the dso of given name
   * @param {string} searchQuery - dsoName passed from searchComponent, used for filtering the dso list
   */
  handleSearch(searchQuery) {
    //console.log("searched text", searchQuery)
    const filterObj = {
      filterby: "DsoName",
      value: searchQuery
    }
    const urlParams = {
      limit: 10,
      activePage: 1,
      filter: JSON.stringify([filterObj])
    }
    this.props.actions.fetchDSOList({
      limit: 10,
      offset: 0,
      filter: [filterObj]
    })
    this.setState({filter: [filterObj]})
    history.pushState(urlParams, "dso listing", `/home/delivery-operators?${(getQueryUri(urlParams))}`)
  }

  render() {
    return (
      <Fragment>
        <PageHeader pageName="Delivery Service Operators" />
        <div style={{
          display: "flex",
          marginBottom: "20px",
          justifyContent: "space-between",
          alignItems: "center"
        }}
        > 
          <Search
            placeholder="Search"
            searchText={this.state.dsoName}
            search={this.handleSearch}
            clearSearch={this.clearSearchResults}
          />
        </div>
        {
          !this.props.loadingDSOList && this.props.DSOList.length > 1 && 
          (
            <div style={{ margin: "10px 0" }}>
              <Pagination
                activePage={this.state.activePage}
                pageSize={this.state.limit}
                totalItemsCount={this.props.DSOListCount}
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
                <th>Head Quaters</th>
                <th>Location Servicable</th>
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
                      Current status of Delivery Operator if their service is enabled or disabled
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
                        Current status of Delivery Operator if their service is enabled or disabled
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
                    <span style={{ marginRight: "5px" }}>Delivery Service Status</span>
                    <span className="info" style={{ position: "relative" }}>
                      <Icon name="info" />
                      <span className="tooltip-text">
                        Current status of Delivery Operator if their service is enabled or disabled
                      </span>
                    </span>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              {
                !this.props.loadingDSOList &&
                this.props.DSOList &&
                this.props.DSOList.map(item => (
                  <DSOListItem
                    handleClick={this.handleRowClick}
                    key={item.id}
                    data={item}
                  />
                ))
              }
              {
                this.props.loadingDSOList && 
                (
                  <tr>
                    <td colSpan="9">
                      <Loader />
                    </td>
                  </tr>
                )
              }
              {
                !this.props.loadingDSOList &&
                this.props.DSOList.length === 0 && 
                (
                  <tr>
                    <td style={{ textAlign: "center" }} colSpan="9">
                      No delivery service operators found
                    </td>
                  </tr>
                )
              }
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

export default connect(mapStateToProps, mapDispatchToProps)(DSOList)
