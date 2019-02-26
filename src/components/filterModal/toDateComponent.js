import React from "react"
import Label from "../label"
import Icon from "../icon"

class ToDate extends React.Component {
  constructor() {
    super()

    this.state = {
      toDate: {
        filterby: "",
        value: ""
      }
    }

    this.handleChange = this.handleChange.bind(this)
    this.getData = this.getData.bind(this)
  }

  getData() {
    return this.state
  }

  handleChange(e) {
    //const value = e.target.value
    this.setState({
      toDate: {
        filterby: "To",
        value: e.target.value
      }
    })
  }

  render() {
    return(
      <div style={{position: 'relative'}} className="input-field">
        <span className="calendar-icon">
          <Icon name="calendar" />
        </span>
        <Label>
          To
        </Label>
        <input 
          type="date" 
          max="9999-12-31" 
          name="toDate"
          onChange={this.handleChange}
        />
      </div>
    )
  }
}

export default ToDate