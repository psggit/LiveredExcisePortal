import React from 'react'
import './sidemenu.scss'
import Icon from './../icon'

class SideMenu extends React.Component {
  checkActiveClass(value) {
    if (this.props.currentRoute === value) {
      return 'active'
    }
    return ''
  }

  handleClick(e) {
    this.props.onClick(e)
  }

  handleChangeRoute(e, currentRoute) {
    e.preventDefault()
    console.log("route", currentRoute)
    this.props.history.push(`/home/${currentRoute}`)
  }

  render() {
    const { menuItems } = this.props
    console.log("sidemenu", this.props)
    return (
      <div className="side-menu">
        {
          menuItems.map((item, i) => <div key={i} className={`side-menu__item ${this.checkActiveClass(item.value)}`}>
              <a
                href={`/home/${item.value}`}
                onClick={(e) => { this.handleChangeRoute(e, item.value) }}
              >
              <span>
                <Icon name={item.icon} />
              </span>
                { item.label }
              </a>
            </div>
          )
        }
      </div>
    )
  }
}

export default SideMenu
