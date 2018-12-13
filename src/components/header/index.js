import React from 'react'
import './header.scss'
import Icon from './../icon'

class Header extends React.Component {
  constructor() {
    super()
  }

  render() {
    return (
      <div className="header">
      <div className="upper">
        <p>
          Logout
        </p>
      </div>
      <div className="lower">
        <div className="brand">
          <Icon name="excise-logo" />
          
          <div className="brand--name">
            Excise Department<br />
            <span>
            of Telengana
            </span>
          </div>
        </div>

        <div className="header--items">
          <div className="item">
            <Icon name="support" />
            <span>
              Support
            </span>
          </div>

          <div className="item">
            <Icon name="account" />
            <span>
              Account Settings
            </span>
          </div>
        </div>
      </div>
      </div>
    )
  }
}

export default Header
