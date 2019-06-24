import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as Actions from "./../../actions"
import { getQueryObj, getQueryUri } from "@utils/url-utils"
import Pagination from '@components/pagination'
import Loader from '@components/loader'
//import { dsoList } from './../constants/dso-list'
import PageHeader from '@components/pageheader'
import ConsumerComplaintsItem from "./consumer-complaints-item"
import Search from "@components/search"

class ConsumerComplaints extends React.Component {
  constructor() {
    super()

    this.state = {
      activePage: 1,
      limit: 10,
      activeTab: 'consumer-complaints',
      reason: "",
      filter: []
    }
    this.handlePageChange = this.handlePageChange.bind(this)
    this.setQueryParamas = this.setQueryParamas.bind(this)
    this.fetchConsumerComplaintList = this.fetchConsumerComplaintList.bind(this)
    // this.setActiveTab = this.setActiveTab.bind(this)
    this.clearSearchResults = this.clearSearchResults.bind(this)
    this.handleSearch = this.handleSearch.bind(this)
  }

  componentDidMount() {
    if (location.search.length) {
      this.setQueryParamas()
    } else {
      this.fetchConsumerComplaintList()
    }
  }


  /**
   * Used to highlight the active tab
   * @param {String} activeTabName - Indicates the active tab name
   */
  // setActiveTab(activeTabName) {
  //   this.setState({ activeTab: activeTabName })
  // }

  /**
    * Gets the url parameters and fetches consumer complaints list
    */
  setQueryParamas() {
    const queryUri = location.search.slice(1)
    const queryObj = getQueryObj(queryUri)

    Object.entries(queryObj).forEach((item) => {
      this.setState({ [item[0]]: item[1] })
    })

    if (queryObj.filter) {
      const filter = JSON.parse(decodeURIComponent(queryObj.filter))
      if (filter.find(item => item.filterby === "Reason")) {
        this.setState({ reason: filter.find(item => item.filterby === "Reason").value })
      }
      this.props.actions.fetchConsumerComplaints({
        limit: parseInt(queryObj.limit),
        offset: queryObj.limit * (queryObj.activePage - 1),
        filter: JSON.parse(decodeURIComponent(queryObj.filter))
      })
    }
    else {
      this.props.actions.fetchConsumerComplaints({
        limit: parseInt(queryObj.limit),
        offset: queryObj.limit * (queryObj.activePage - 1)
      })
    }
  }

  /**
   * Fetches the consumer complaints list for given limit and offset
   */
  fetchConsumerComplaintList() {
    this.props.actions.fetchConsumerComplaints({
      limit: this.state.limit,
      offset: 0
    })
  }

  /**
   * Navigates to next page
   * @param {object} pagerObj - Passed from pagination component
   * @param {Integer} pagerObj.activePage - Used to calculate the offset to fetch next set of consumer complaints
   * @param {Integer} pagerObj.pageSize - Used as limit to fetch next set of consumer complaints
   */
  handlePageChange(pagerObj) {
    this.props.actions.setLoadingAll()
    const offset = pagerObj.pageSize * (pagerObj.activePage - 1)

    this.setState({
      activePage: pagerObj.activePage,
      limit: pagerObj.pageSize
    })

    this.props.actions.fetchConsumerComplaints({
      limit: parseInt(pagerObj.pageSize),
      offset
    })

    const queryParamsObj = {
      activePage: pagerObj.activePage,
      limit: pagerObj.pageSize
    }

    history.pushState(
      queryParamsObj,
      "consumer complaints listing",
      `/home/consumer-complaints?${getQueryUri(queryParamsObj)}`
    )
  }

  /**
   * Clears the applied filter/search and renders all the consumer complaints
   */
  clearSearchResults() {
    if (this.state.filter.length > 0) {
      this.fetchConsumerComplaintList()
      this.props.history.push(`/home/consumer-complaints`)
    }
  }


  /**
   * Fetches the consumer complaint of given reason
   * @param {string} searchQuery - Reason passed from searchComponent, used for filtering the consumer complaint list
   */
  handleSearch(searchQuery) {
    //console.log("searched text", searchQuery)
    const filterObj = {
      filterby: "Reason",
      value: searchQuery
    }
    const urlParams = {
      limit: 10,
      activePage: 1,
      filter: JSON.stringify([filterObj])
    }
    this.props.actions.fetchConsumerComplaints({
      limit: 10,
      offset: 0,
      filter: [filterObj]
    })
    this.setState({ filter: [filterObj] })
    history.pushState(urlParams, "consumer complaints listing", `/home/consumer-complaints?${(getQueryUri(urlParams))}`)
  }

  render() {
    const { activeTab } = this.state
    return (
      <Fragment>
        <div style={{
          marginBottom: "20px",
          marginTop: "26px"
        }}
        >
          <Search
            placeholder="Search by reason type"
            searchText={this.state.reason}
            search={this.handleSearch}
            clearSearch={this.clearSearchResults}
          />
        </div>
        {
          (
            <div style={{ margin: "10px 0" }}>
              <Pagination
                activePage={this.state.activePage}
                pageSize={this.state.limit}
                totalItemsCount={this.props.customerComplaintsCount}
                onChangePage={this.handlePageChange}
              />
            </div>
          )
        }
        <div style={{ width: '100%' }}>
          <table className="logs">
            <thead>
              <tr>
                <th>Date</th>
                <th style={{ width: '70px' }}>Time</th>
                <th style={{ width: '180px' }}>Name</th>
                <th>Age</th>
                <th>City/Town</th>
                <th style={{ width: '100px' }}>Reason Type</th>
                <th>Message</th>
              </tr>
            </thead>
            <tbody>
              {
                !this.props.loadingCustomerComplaints &&
                this.props.customerComplaints &&
                this.props.customerComplaints.map((item, i) => {
                  return <ConsumerComplaintsItem
                    //handleClick={this.handleClick}
                    key={i}
                    data={item}
                  />
                })
              }
              {
                this.props.loadingCustomerComplaints &&
                (
                  <tr>
                    <td colSpan="9">
                      <Loader />
                    </td>
                  </tr>
                )
              }
              {
                !this.props.loadingCustomerComplaints &&
                this.props.customerComplaints.length === 0 &&
                (
                  <tr>
                    <td style={{ textAlign: "center" }} colSpan="9">
                      No complaints found
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

export default connect(mapStateToProps, mapDispatchToProps)(ConsumerComplaints)
