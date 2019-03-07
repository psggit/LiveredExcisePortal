import React from "react"

class EmailInput extends React.Component {
  constructor() {
    super()
  }

  validateEmail({fieldName, fieldValue}) {
    let fieldStatus = {}
    const emailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    
    if (fieldValue.trim().length === 0) {
      fieldStatus = {
        status: true,
        value: `${fieldName} is required`,
        fieldName,
        fieldValue
      }
    } else if (!emailRegex.test(fieldValue)) {
      fieldStatus = {
        status: true,
        value: `${fieldName} is invalid`,
        fieldName,
        fieldValue
      }
    } else {
      fieldStatus = {
        status: false,
        value: '',
        fieldName,
        fieldValue
      }
    }
    this.props.onChange(fieldStatus)
  }

  render() {
    return (
      <input 
        name={this.props.name} 
        type="text"
        autoComplete="off"
        onChange={(e) => this.validateEmail({fieldName: this.props.name, fieldValue: e.target.value})}
      />
    )
  }
}

export default EmailInput