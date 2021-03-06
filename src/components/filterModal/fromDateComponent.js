import React from "react"
import Label from "../label"
import Icon from "../icon"
import Moment from "moment"

class FromDate extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      fromDate: {
        filterby: "",
        value: this.props.fromDate ? this.props.fromDate : ""
      }
    }

    this.handleChange = this.handleChange.bind(this)
    this.getData = this.getData.bind(this)
  }

  componentDidUpdate(prevProps) {
    if (prevProps.fromDate !== this.props.fromDate) {
      this.setState({
        fromDate: { ...this.state.fromDate, value: this.props.fromDate ? this.props.fromDate : "" }
      })
    }
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
          value={ this.state.fromDate.value}
        />
      </div>
    )
  }
}

export default FromDate