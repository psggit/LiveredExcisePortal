import React from "react"
import Label from "../label"
import Icon from "../icon"
import Moment from "moment"

class ToDate extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      toDate: {
        filterby: "",
        value: this.props.toDate ? this.props.toDate : ""
      }
    }

    this.handleChange = this.handleChange.bind(this)
    this.getData = this.getData.bind(this)
  }

  componentDidUpdate(prevProps) {
    if (prevProps.toDate !== this.props.toDate) {
      this.setState({
        toDate: { ...this.state.toDate, value: this.props.toDate ? this.props.toDate : "" }
      })
    }
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
    // console.log("props", this.props)
    return (
      <div style={{ position: 'relative' }} className="input-field">
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
          value={this.state.toDate.value}
        />
      </div>
    )
  }
}

export default ToDate