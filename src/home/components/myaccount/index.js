import React from "react"
import PageHeader from "@components/pageheader"
import "./account.scss"
import Icon from "@components/icon"

class MyAccount extends React.Component {

  constructor() {
    super()
    this.state = {
      activeTab: "my-account"
    }
    this.setActiveTab = this.setActiveTab.bind(this)
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
      <div id="account">
        <PageHeader pageName="My Account" />
        <div style={{display: 'flex', marginBottom: '40px', marginTop: '4px'}}>
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
          </ul>
        </div>

        <div className="header">
          MY PROFILE
        </div>
        <div className="profile-container">
          <div className="profile-detail-card">
            <div className="item">
              <p className="label">Name</p>
              <p className="value">Ravikumar</p>
            </div>
            <div className="item">
              <p className="label">Email Address</p>
              <p className="value">rav1@gmail.com</p>
            </div>
            <div className="item">
              <p className="label">Phone Number</p>
              <p className="value">9087654321</p>
            </div>
          </div>
          <div className="profile-detail-card">
            <div className="item">
              <p className="label">Password</p>
              <p className="value">***************</p>
            </div>
          </div>
        </div>

        <div className="header">
          NOTIFICATIONS
        </div>
        <div className="notification-container">
          <p className="label">Channel</p>
          <div className="channel">
            <span className="icon">
              <Icon name="calendar" />
            </span>
            <p>Text Message</p>
          </div>
          <div className="channel">
            <span className="icon">
              <Icon name="calendar" />
            </span>
            <p>Email</p>
          </div>
        </div>
      </div>
    )
  }
}

export default MyAccount