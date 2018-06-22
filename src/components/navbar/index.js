import React from 'react'
import getIcon from './../getIcon'
import './navbar.scss'

class Navbar extends React.Component {
  checkActiveClass(value) {
    if (this.props.currentRoute === value) {
      return 'active'
    }
    return undefined
  }

  handleChangeRoute(e, currentRoute) {
    e.preventDefault()
    this.props.history.push(`/home/${currentRoute}`)
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

        <div className="col logout">
          <span>{ getIcon('logout') }</span>
          <span>Logout</span>
        </div>
      </div>
    )
  }
}

export default Navbar
