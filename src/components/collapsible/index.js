import React from 'react'
import './collapsible.scss'
import Icon from './../icon'

class Collapsible extends React.Component {
  constructor() {
    super()
    this.state = {
      isCollpased: false
    }
    this.handleClick = this.handleClick.bind(this)
  }
  handleClick() {
    this.setState({
      isCollpased: !this.state.isCollpased
    })
  }
  render() {
    return (
      <div>
        <div className="collapsible--wrapper">
          <div onClick={this.handleClick} className="collapsible--header">
            <div style={{ display: 'flex' }}>
              <p>
                { this.props.title }
              </p>
              <span className="info" style={{ position: 'relative', top: '7px', marginLeft: '12px', display: 'inline-block' }}>
                <Icon name="info" />
                <span className="tooltip-text" style={{ top: '45px' }}>
                  {this.props.tooltipText} 
                </span>
              </span>
            </div>
            <Icon name="down" />
          </div>
          <div className={`collapsible--body ${this.state.isCollpased ? 'collapsed' : ''}`}>
            { this.props.children }
          </div>
        </div>
      </div>
    )
  }
}


export default Collapsible