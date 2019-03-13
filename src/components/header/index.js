import React from "react";
import "./header.scss";
import Icon from "./../icon";
import Dialog from "./../dialog";
import Button from "./../button";
import { POST } from "@utils/fetch";

class Header extends React.Component {
  constructor() {
    super()
    this.state = {
      showLogoutModal: false
    }
    this.logout = this.logout.bind(this)
    this.mountModal = this.mountModal.bind(this)
    this.unMountModal = this.unMountModal.bind(this)
    this.openDropdown = this.openDropdown.bind(this)
    this.handleClick = this.handleClick.bind(this)
  }

  mountModal() {
    this.setState({ showLogoutModal: true })
  }

  unMountModal() {
    console.log("unmount modal")
    this.setState({ showLogoutModal: false })
  }

  openDropdown() {
    console.log("open dropdown")
    this.setState({ showDropdown: !this.state.showDropdown })
  }

  // logout() {
  //   console.log("handle logout")
  //   this.setState({ showLogoutModal: false })
  // }

  logout() {
    this.setState({ showLogoutModal: false })
    POST({
      api: "/retailer/auth/user/logout",
      apiBase: "api1",
      handleError: false,
      cors: true
    })
      .then(response => {
        if (response.status !== 200) {
          console.log(
            `Looks like there was a problem. Status Code: ${response.status}`
          )
          localStorage.clear()
          location.href = "/login"
          return
        }
        response.json().then(data => {
          localStorage.clear()
          location.href = "/login"
        })
      })
      .catch(err => {
        console.log("Fetch Error :-S", err)
        localStorage.clear()
        location.href = "/login"
      })
  }

  handleClick() {
    console.log("click")
    location.href="/home/support"
  }

  render() {
    const { showLogoutModal, showDropdown } = this.state
    return (
      <div className="header">
        {/* {
        this.props.isLoggedIn
        ? (
          <div className="upper">
            <p onClick={this.mountModal}>
              Logout
            </p>
          </div>
        )
        : ''
      } */}
        <div className="lower">
          <div className="brand">
            <Icon name="excise-logo" />

            <div className="brand--name">
              Excise Department
              <br />
              {/* <span>
            of Pondicherry
            </span> */}
            </div>
          </div>

          {this.props.isLoggedIn ? (
            <div className="header--items">
              <div className="item" onClick={this.handleClick}>
                <Icon name="support" />
                <span>Support</span>
              </div>

              <div className="item" onClick={this.openDropdown}>
                <Icon name="account" />
                <span>My Account</span>
                <Icon name="down-arrow" />
                <div
                  className={`dropdown-menu ${showDropdown ? "show" : "hide"}`}
                >
                  <div
                    //onClick={() => this.mountModal()}
                    className="menu-item os s9"
                  >
                    Account Settings
                  </div>
                  <div
                    onClick={() => this.mountModal()}
                    className="menu-item os s9"
                  >
                    Logout
                  </div>
                </div>
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
        {showLogoutModal && (
          <Dialog
            title="Do you want to logout?"
            onClick={this.unMountModal}
            actions={[
              <Button onClick={() => this.unMountModal()} secondary>
                No
              </Button>,
              <Button onClick={() => this.logout()} primary>
                Yes
              </Button>
            ]}
          />
        )}
      </div>
    );
  }
}

export default Header;
