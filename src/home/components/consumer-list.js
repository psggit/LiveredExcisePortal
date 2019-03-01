import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as Actions from './../actions'
import ConsumerListItem from './customer-list-item'
import { getQueryObj, getQueryUri } from "@utils/url-utils"
import Pagination from '@components/pagination'
import Loader from '@components/loader'
import PageHeader from '@components/pageheader'
import Search from "@components/search"

class ConsumerManagement extends React.Component {
  constructor() {
    super()

    this.state = {
      activePage: 1,
      limit: 10,
      activeTab: 'consumers',
      cityName: "",
      filter: []
    }
    this.handlePageChange = this.handlePageChange.bind(this)
    this.setQueryParamas = this.setQueryParamas.bind(this)
    this.fetchConsumerList = this.fetchConsumerList.bind(this)
    this.setActiveTab = this.setActiveTab.bind(this)
    this.clearSearchResults = this.clearSearchResults.bind(this)
    this.handleSearch = this.handleSearch.bind(this)
  }

  componentDidMount() {
    if (location.search.length) {
      this.setQueryParamas()
    } else {
      this.fetchConsumerList()
    }
  }

  /**
    * Gets the url parameters and fetches consumer list
    */
  setQueryParamas() {
    const queryUri = location.search.slice(1)
    const queryObj = getQueryObj(queryUri)

    Object.entries(queryObj).forEach((item) => {
      this.setState({ [item[0]]: item[1] })
    })

    if(queryObj.filter) {
      const filter = JSON.parse(decodeURIComponent(queryObj.filter))
      if(filter.find(item => item.filterby === "CityName")) {
        this.setState({cityName: filter.find(item => item.filterby === "CityName").value})
      }
      this.props.actions.fetchConsumerList({
        limit: parseInt(queryObj.limit),
        offset: queryObj.limit * (queryObj.activePage - 1),
        filter: JSON.parse(decodeURIComponent(queryObj.filter))
      })
    } else {
      this.props.actions.fetchConsumerList({
        limit: parseInt(queryObj.limit),
        offset: queryObj.limit * (queryObj.activePage - 1)
      })
    }
  }

  /**
   * Fetches the consumer list of given limit and offset
   */
  fetchConsumerList() {
    this.props.actions.fetchConsumerList({
      limit: this.state.limit,
      offset: 0
    })
  }

  /**
   * Navigates to next page
   * @param {object} pagerObj - Passed from pagination component
   * @param {Integer} pagerObj.activePage - Used to calculate the offset to fetch next set of consumers
   * @param {Integer} pagerObj.pageSize - Used as limit to fetch next set of consumers
   */
  handlePageChange(pagerObj) {
    this.props.actions.setLoadingAll()
    const offset = pagerObj.pageSize * (pagerObj.activePage - 1)

    this.setState({
      activePage: pagerObj.activePage,
      limit: pagerObj.pageSize
    })

    this.props.actions.fetchConsumerList({
      limit: pagerObj.pageSize,
      offset
    })

    const queryParamsObj = {
      activePage: pagerObj.activePage,
      limit: pagerObj.pageSize
    }

    history.pushState(
      queryParamsObj,
      "consumer listing",
      `/home/consumers?${getQueryUri(queryParamsObj)}`
    )
  }

  /**
   * Clears the applied filter/search and renders all the consumers
   */
  clearSearchResults() {
    if(this.state.filter.length > 0) {
      this.fetchConsumerList()
      this.props.history.push(`/home/consumers`)
    }
  }


  /**
   * Fetches the consumer details of given city name
   * @param {string} searchQuery - cityName passed from searchComponent, used for filtering the consumer list
   */
  handleSearch(searchQuery) {
    //console.log("searched text", searchQuery)
    const filterObj = {
      filterby: "CityName",
      value: searchQuery
    }
    const urlParams = {
      limit: 10,
      activePage: 1,
      filter: JSON.stringify([filterObj])
    }
    this.props.actions.fetchConsumerList({
      limit: 10,
      offset: 0,
      filter: [filterObj]
    })
    this.setState({filter: [filterObj]})
    history.pushState(urlParams, "consumer listing", `/home/consumers?${(getQueryUri(urlParams))}`)
  }

  /**
   * Used to highlight the active tab
   * @param {String} activeTabName - Indicates the active tab name
   */
  setActiveTab(activeTabName) {
    this.setState({ activeTab: activeTabName })
  }

  render() {
    const { activeTab } = this.state
    return (
      <Fragment>
        <PageHeader pageName="Consumer Complaints" />
        <div style={{display: 'flex', marginBottom: '40px', marginTop: '4px'}}>
          <ul className="nav">
            <li 
              onClick={() => this.setActiveTab("consumer")} 
              className={`${activeTab === "consumers" ? 'active' : ''}`}
            >
              <a href="/home/consumers">Consumer Log</a>
            </li>
            <li
              onClick={() => this.setActiveTab("consumer-complaints")}
              className={`${activeTab === "consumer-complaints" ? 'active' : ''}`}
            >
              <a href="/home/consumer-complaints">Consumer Complaints</a>
            </li>
          </ul>
        </div>
        {
          !this.props.loadingConsumerList && this.props.customerList.length > 0 && 
          (
            <div style={{ margin: "10px 0" }}>
              <Pagination
                activePage={this.state.activePage}
                pageSize={this.state.limit}
                totalItemsCount={this.props.customerListCount}
                onChangePage={this.handlePageChange}
              />
            </div>
          )
        }
        <div style={{
          marginBottom: "20px",
          marginTop: "26px"
        }}
        > 
          <Search
            placeholder="Search by City/Town"
            searchText={this.state.cityName}
            search={this.handleSearch}
            clearSearch={this.clearSearchResults}
          />
        </div>
        <div style={{ width: '100%' }}>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Age</th>
                <th>Address</th>
                <th>City/Town</th>
                {/* <th>Total Orders</th>
                <th>Weekly Orders(Avg)</th> */}
              </tr>
            </thead>
            <tbody>
              {
                !this.props.loadingCustomerList &&
                this.props.customerList &&
                this.props.customerList.map((item,i) => {
                  return  <ConsumerListItem
                    key={i}
                    data={item}
                  />
                })
              }
              {
                this.props.loadingCustomerList && 
                (
                  <tr>
                    <td colSpan="9">
                      <Loader />
                    </td>
                  </tr>
                )
              }
              {
                !this.props.loadingCustomerList &&
                this.props.customerList.length === 0 && 
                (
                  <tr>
                    <td style={{ textAlign: "center" }} colSpan="9">
                      No consumers found
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

export default connect(mapStateToProps, mapDispatchToProps)(ConsumerManagement)
