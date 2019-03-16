import React from "react"
import "./../form-input.scss"

class TextInput extends React.Component {

  constructor() {
    super()

    this.state = {
      value: ""
    }
    //this.value = ""

    this.handleChange = this.handleChange.bind(this)
  }

  // validateTextField({event, fieldName, fieldValue}) {
  //   let fieldStatus = {}
  //   const keyCode = event.keyCode ? event.keyCode :  event.which
  //   console.log("event code", event.which)
  //   if(keyCode !== 32) {
  //     if (fieldValue.trim().length === 0) {
  //       fieldStatus = {
  //         status: true,
  //         value: `${fieldName} is required`,
  //         fieldName,
  //         fieldValue
  //       }
  //     } else {
  //       fieldStatus = {
  //         status: false,
  //         value: '',
  //         fieldName,
  //         fieldValue
  //       }
  //     }
      
  //     this.props.onChange(fieldStatus)
  
  //   } else {
  //     event.preventDefault()
  //   }
  // }

  handleChange(evt,fieldName) {
    let fieldStatus = {}
    if(evt.target.validity.valid || evt.target.validity.valueMissing) {
      this.setState({value: evt.target.value})
      console.log("value", this.value)
      fieldStatus = {
        fieldName,
        fieldValue: this.value
      }
      this.props.onChange(fieldStatus)
    } else {
      evt.preventDefault()
      fieldStatus = {
        fieldName,
        fieldValue: this.state.value
      }
      this.props.onChange(fieldStatus)
      return false;
    }
  }

  render() {
    return (
      // <input 
      //   name={this.props.name} 
      //   type="text"
      //   autoComplete="off"
      //   onKeyUp={e => this.validateTextField({event: e, fieldName: this.props.name, fieldValue: e.target.value})}
      //   //onChange={(e) => this.validateTextField({fieldName: this.props.name, fieldValue: e.target.value})}
      // />
      <input
        type="text"
        name={this.props.name}
        autoComplete="off"
        pattern="^[A-Za-z0-9]*$"
        onInput={(e) => this.handleChange(e, this.props.name) }
        value={this.state.value}
        //autocomplete="off"
        //required
      />
    )
  }
}

export default TextInput
