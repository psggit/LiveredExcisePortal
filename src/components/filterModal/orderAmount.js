import React from "react"
import Label from "../label"
import Select from "../select"

class OrderAmount extends React.Component {
  constructor() {
    super()

    this.state = {
      orderAmount: {
        filterby: "",
        value: "",
        lowerrange: 0,
        upperrange: 0,
        idx: ""
      },
    }

    this.handleChange = this.handleChange.bind(this)
    this.getData = this.getData.bind(this)
  }

  getData() {
    return this.state
  }

  handleChange(e) {
    const value = e.target.value
    const range = this.props.orderAmount.find(item => item.value === parseInt(value)).text.split('-')
    this.setState({
      orderAmount: {
        filterby: e.target.name,
        value:  this.props.orderAmount.find(item => item.value === parseInt(value)).text,
        lowerrange: parseInt(range[0]),
        upperrange: parseInt(range[1]),
        idx: e.target.value
      }
    })
  }

  render() {
    return(
      <div className="order-amount input-field">
        <Label>
          Order Amount
        </Label>
        <Select 
          options={this.props.orderAmount}
          name="Order Amount" 
          onChange={e => this.handleChange(e)}
          value={this.props.selectedOrderAmntIdx}
        />
      </div>
    )
  }
}

export default OrderAmount