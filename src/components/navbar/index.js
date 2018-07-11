import React from 'react'
import getIcon from './../getIcon'
import './navbar.scss'
import { Api } from '@utils/config'

class Navbar extends React.Component {
  checkActiveClass(value) {
    if (this.props.currentRoute === value) {
      return 'active'
    }
    return undefined
  }

  handleChangeRoute(e, currentRoute) {
    e.preventDefault()
    if (this.props.currentRoute !== currentRoute) {
      this.props.history.push(`/home/${currentRoute}`)
    }
  }

  handleLogout() {
    const fetchOptions = {
      method: 'get',
      credentials: 'include',
      mode: 'cors',
      'x-hasura-role': 'user'
    }

    fetch(`${Api.authUrl}/user/logout`, fetchOptions)
      .then((response) => {
        if (response.status !== 200) {
          console.log(`Looks like there was a problem. Status Code: ${response.status}`)
          localStorage.clear()
          location.href = '/login'
          return
        }
        response.json().then((data) => {
          localStorage.clear()
          location.href = '/login'
        })
      })
      .catch((err) => {
        console.log('Fetch Error :-S', err)
        localStorage.clear()
        location.href = '/login'
      })
  }

  render() {
    const { menuItems, menuItemsMap, currentRoute } = this.props
    return (
      <div className="navbar">
        <div className="col navbar-brand">
          <h4>Live Red</h4>
        </div>

        <div className="col menu-items">
          <div className="menu-items-inner">
            {
              menuItems.map((item, i) => (
                <a
                  href={`/home/${item.value}`}
                  key={i}
                  className={this.checkActiveClass(item.value)}
                  onClick={(e) => { this.handleChangeRoute(e, item.value) }}
                >
                  { item.label }
                </a>
              ))
            }
          </div>
        </div>

        <div onClick={this.handleLogout} className="col logout">
          <span>{ getIcon('logout') }</span>
          <span>Logout</span>
        </div>
      </div>
    )
  }
}

export default Navbar
