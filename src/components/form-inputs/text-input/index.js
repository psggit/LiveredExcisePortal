import React from "react"
import "./../form-input.scss"

class TextInput extends React.Component {

  constructor() {
    super()
  }

  // validateNumType(keyCode) {
  //   let allowed = [ 8, 46, 37, 39, 9, 189 ]
  //   const res = allowed.indexOf(keyCode) > -1 || (keyCode == 190) || (keyCode >=48 && keyCode <=57) || (keyCode >=96 && keyCode <= 105)
  //   return res
  // }
 
  // validateNumberField({event, fieldName, fieldValue}) {
  //   console.log("event", event)
  //   if(this.validateNumType(event.keyCode)) {
  //     this.props.onChange(fieldValue)
  //   } else {
  //     event.preventDefault()
  //   }
  // }
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
