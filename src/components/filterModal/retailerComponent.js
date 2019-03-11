import React from "react"
import Label from "../label"
import Select from "../select"

class Retailer extends React.Component {
  constructor() {
    super()

    this.state = {
      retailer: {
        filterby: "",
        value: "",
        idx: ""
      }
    }

    this.handleChange = this.handleChange.bind(this)
    this.getData = this.getData.bind(this)
  }

  getData() {
    return this.state
  }

  handleChange(e) {
    const value = e.target.value
    this.setState({
      retailer: {
        filterby: e.target.name,
        value: this.props.retailerList.find(item => item.value === parseInt(value)).text,
        idx: e.target.value
      }
    })
  }

  render() {
    return(
      <div className="retailer input-field">
        <Label>
          Retailer
        </Label>
        <Select 
          options={["Bangalore", "Chennai"]} 
          name="Retailer"  
        />
      </div>
    )
  }
}

export default Retailer