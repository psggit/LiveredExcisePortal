import React from 'react'
import './select.scss'
import Icon from './../icon'

class Select extends React.Component {
  constructor() {
    super()
    this.handleChange = this.handleChange.bind(this)
  }
  handleChange(e) {
    // console.log(e.target.value)
    this.props.onChange({value: e.target.value, targetName: e.target.name})
  }
  render() {
    return (
      <div className="select--container">
        <Icon name="down-small" size="10"/>
        <select
          placeholder={this.props.placeholder}
          className={`select ${this.props.small ? 'small' : ''}`}
          name={this.props.name}
          onChange={this.handleChange}>
          <option value="" disabled selected>
            Choose a {this.props.name}
          </option>
        {
          this.props.options.map((item, i) => (
            <option key={i} value={item.value}>{ item.text }</option>
          ))
        }
      </select>
      </div>
    )
  }
}

export default Select