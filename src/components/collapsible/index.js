import React from 'react'
import './collapsible.scss'

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
            <p>
            { this.props.title }
            </p>
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