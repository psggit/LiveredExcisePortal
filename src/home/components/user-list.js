import React from "react"
import PageHeader from "@components/pageheader"
import UserPermissionItem from "./user-item";
import Loader from "@components/loader"
// import { userList } from "./../constants/user"
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as Actions from "./../actions"

class UserPermissions extends React.Component {

  constructor() {
    super()
    this.state = {
      activeTab: "user-permissions",
      loadingUserList: false,
      userList: []
    }
    this.fetchUsersList = this.fetchUsersList.bind(this)
    this.setActiveTab = this.setActiveTab.bind(this)
  }

  componentDidMount() {
    this.fetchUsersList()
  }

  fetchUsersList() {
    this.props.actions.fetchUsersList({
      state_id: 1
    })
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
              {/* {
                !this.props.loadingUserList &&
                this.props.userList &&
                this.props.userList.map(item => (
                  <UserPermissionItem
                    key={item.id}
                    data={item}
                  />
                ))
              } */}
              {
                userList.map(item => (
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