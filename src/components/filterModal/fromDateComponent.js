import React from "react"
import Label from "../label"
import Icon from "../icon"

class FromDate extends React.Component {
  constructor() {
    super()

    this.state = {
      fromDate: {
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
      fromDate: {
        filterby: "From",
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
          From
        </Label>
        <input 
          type="date" 
          max="9999-12-31" 
          name="fromDate"
          onChange={this.handleChange}
        />
      </div>
    )
  }
}

export default FromDate