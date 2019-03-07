import React from "react"
import "./../form-input.scss"

class TextInput extends React.Component {

  constructor() {
    super()
  }

  validateTextField({fieldName, fieldValue}) {
    let fieldStatus = {}
    
    if (fieldValue.trim().length === 0) {
      fieldStatus = {
        status: true,
        value: `${fieldName} is required`,
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
        onChange={(e) => this.validateTextField({fieldName: this.props.name, fieldValue: e.target.value})}
      />
    )
  }
}

export default TextInput
