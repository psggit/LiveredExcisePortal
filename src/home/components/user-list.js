import React from "react"
import PageHeader from "@components/pageheader"
import UserPermissionItem from "./user-item";
import Loader from "@components/loader"
import Search from "@components/search"
// import { userList } from "./../constants/user"
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Pagination from "@components/pagination"
import * as Actions from "./../actions"
import { getQueryObj, getQueryUri } from "@utils/url-utils"

class UserPermissions extends React.Component {

  constructor() {
    super()

    this.filter = [
      {
        filterby: "state_id",
        value: "1"
      }
    ]
    this.state = {
      activeTab: "user-permissions",
      loadingUserList: false,
      userList: [],
      name: "",
      limit: 10,
      filter: this.filter,
      activePage: 1
    }
    this.fetchUsersList = this.fetchUsersList.bind(this)
    this.handleSearch = this.handleSearch.bind(this)
    this.clearSearchResults = this.clearSearchResults.bind(this)
    this.handlePageChange = this.handlePageChange.bind(this)
    this.setActiveTab = this.setActiveTab.bind(this)
  }

  componentDidMount() {
    const queryUri = location.search.slice(1)
    const queryObj = getQueryObj(queryUri)

    Object.entries(queryObj).forEach((item) => {
      this.setState({ [item[0]]: item[1] })
    })
    const isSearchAlreadyApplied = queryObj.filter ? JSON.parse(decodeURI(queryObj.filter)).find((item) => item.filterby === "name") ? true : false : false
    if (isSearchAlreadyApplied) {
      this.setState({
        name: JSON.parse(decodeURI(queryObj.filter)).find((item) => item.filterby === "name").value
      })
    }

    this.fetchUsersList({
      limit: queryObj.limit ? parseInt(queryObj.limit) : this.state.limit,
      offset: queryObj.activePage ? parseInt(queryObj.limit * (queryObj.activePage - 1)) : 0,
      filter: queryObj.filter ? JSON.parse(decodeURI(queryObj.filter)) : this.state.filter
    })
  }

  fetchUsersList(payload) {
    this.props.actions.fetchUsersList(payload)
  }

  handleSearch(searchQuery) {
    const filterObj = {
      filterby: "name",
      value: searchQuery
    }
    const isSearchAlreadyApplied = this.state.filter ? this.state.filter.find((item) => item.filterby === "name") ? true : false : false

    let filter = this.state.filter
    if (isSearchAlreadyApplied) {
      filter.pop()
    }

    const payload = {
      activePage: 1,
      offset: 0,
      limit: 10,
      filter: [...filter, filterObj]
    }

    const urlParams = {
      limit: 10,
      activePage: 1,
      filter: JSON.stringify([...this.state.filter, filterObj])
    }
    this.setState(payload)

    this.fetchUsersList(payload)
    history.pushState(
      urlParams,
      "userPermissions",
      `/home/user-permissions?${getQueryUri(urlParams)}`
    )
  }

  clearSearchResults() {
    if (this.state.filter.length > 0) {
      this.setState({
        filter: this.filter,
        name: ""
      });
      this.props.history.push(`/home/user-permissions`)
      this.fetchUsersList({
        limit: 10,
        offset: 0,
        filter: this.filter
      })
    }
  }

  handlePageChange(pagerObj) {
    const queryUri = location.search.slice(1)
    const queryObj = getQueryObj(queryUri)
    let queryParamsObj = {}

    this.setState({
      activePage: pagerObj.activePage,
      limit: pagerObj.pageSize
    })
    this.props.actions.setLoadingAll()
    this.fetchUsersList({
      limit: pagerObj.pageSize,
      offset: pagerObj.pageSize * (pagerObj.activePage - 1),
      filter: queryObj.filter ? JSON.parse(decodeURI(queryObj.filter)) : this.state.filter
    })

    queryParamsObj = {
      limit: pagerObj.pageSize,
      activePage: pagerObj.activePage,
      // offset: pagerObj.pageSize * (pagerObj.activePage - 1),
      filter: queryObj.filter ? (queryObj.filter) : JSON.stringify(this.state.filter)
    }

    history.pushState(
      queryParamsObj,
      "auditlog",
      `/home/audit-log?${getQueryUri(queryParamsObj)}`
    )
  }

  /**
   * Used to highlight the active tab
   * @param {String} activeTabName - Indicates the active tab name
   */
  setActiveTab(activeTabName) {
    this.setState({ activeTab: activeTabName })
  }

  render() {
    const { activeTab, userList } = this.state
    console.log("user", userList)
    return (
      <div id="userPermissions">
        <PageHeader pageName="My Account" />
        <div style={{ display: 'flex', marginBottom: '40px', marginTop: '4px' }}>
          <ul className="nav">
            <li
              onClick={() => this.setActiveTab("my-account")}
              className={`${activeTab === "my-account" ? 'active' : ''}`}
            >
              <a href="/home/account">My Account</a>
            </li>
            <li
              onClick={() => this.setActiveTab("user-permissions")}
              className={`${activeTab === "user-permissions" ? 'active' : ''}`}
            >
              <a href="/home/user-permissions">User Permissions</a>
            </li>
            <li
              onClick={() => this.setActiveTab("audit-log")}
              className={`${activeTab === "audit-log" ? 'active' : ''}`}
            >
              <a href="/home/audit-log">Audit Log</a>
            </li>
          </ul>
        </div>
        <div style={{
          marginBottom: "20px"
        }}
        >
          <Search
            placeholder="Search by name"
            searchText={this.state.name}
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
                totalItemsCount={this.props.userListCount}
                onChangePage={this.handlePageChange}
              />
            </div>
          )
        }
        <div style={{ width: '100%' }}>
          <table>
            <thead>
              <tr>
                <th>User Name</th>
                <th>Type</th>
                <th>Status</th>
                <th>Authentication</th>
              </tr>
            </thead>
            <tbody>
              {
                this.props.userList.map(item => (
                  <UserPermissionItem
                    key={item.id}
                    data={item}
                  />
                ))
              }
              {this.props.loadingUserList && (
                <tr>
                  <td colSpan="8">
                    <Loader />
                  </td>
                </tr>
              )}
              {!this.props.loadingUserList &&
                this.props.userList.length === 0 && (
                  <tr>
                    <td style={{ textAlign: "center" }} colSpan="4">
                      No users found
                  </td>
                  </tr>
                )}
            </tbody>
          </table>
        </div>
        {/* <div style={{
          marginBottom: "20px"
        }}
        > 
          <Search
            placeholder="Search"
            searchText={this.state.retailerName}
            search={this.handleSearch}
            clearSearch={this.clearSearchResults}
          />
        </div> */}
      </div>
    )
  }
}

const mapStateToProps = state => state.main

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(Actions, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(UserPermissions)

//export default UserPermissions