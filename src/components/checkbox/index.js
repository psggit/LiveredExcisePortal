import React from 'react'
import './checkbox.scss'
import Icon from './../icon'

class Checkbox extends React.Component {
  constructor() {
    super()
    this.state = {
      checked: false
    }
    this.handleChange = this.handleChange.bind(this)
  }
  handleChange(e) {
    const { checked } = e.target
    this.setState({ checked })
    // this.props.onCheck(value)
  }
  render() {
    return (
      <div className={`checkbox ${this.state.checked ? 'checked' : ''}`}>
        <input type="checkbox" onChange={this.handleChange} />
        <Icon name="checkbox" />
      </div>
    )
  }
}

export default Checkbox
