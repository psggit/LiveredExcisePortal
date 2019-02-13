import React from 'react'
import './header.scss'
import Icon from './../icon'
import Dialog from "./../dialog"
import Button from './../button'

class Header extends React.Component {
  constructor() {
    super()
    this.state = {
      showLogoutModal: false
    }
    this.logout = this.logout.bind(this)
    this.mountModal = this.mountModal.bind(this)
    this.unMountModal = this.unMountModal.bind(this)
  }

  mountModal() {
    this.setState({ showLogoutModal: true })
  }

  unMountModal() {
    console.log("unmount modal")
    this.setState({ showLogoutModal: false })
  }

  logout() {
    console.log("handle logout")
    this.setState({ showLogoutModal: false })
  }

  render() {
    const{ showLogoutModal } = this.state
    return (
      <div className="header">
      {
        this.props.isLoggedIn
        ? (
          <div className="upper">
            <p onClick={this.mountModal}>
              Logout
            </p>
          </div>
        )
        : ''
      }
      <div className="lower">
        <div className="brand">
          <Icon name="excise-logo" />
          
          <div className="brand--name">
            Excise Department<br />
            {/* <span>
            of Telengana
            </span> */}
          </div>
        </div>

       {
         this.props.isLoggedIn
         ? (
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
         )
         : ''
       }
      </div>
      {
        showLogoutModal &&
        <Dialog
          title="Do you want to logout?"
          actions={[
            (
              <Button
                onClick={() => this.unMountModal()}
                secondary
              >
              No
              </Button>
            ),
            (
              <Button
                onClick={() => this.logout()}
                primary
              >
              Yes
              </Button>
            )
          ]}
        >
        </Dialog>
      }
      </div>
    )
  }
}

export default Header
