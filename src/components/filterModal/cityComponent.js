import React from "react"
import Label from "../label"
import Select from "../select"

class City extends React.Component {
  constructor() {
    super()

    this.state = {
      city: {
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
    console.log("city change", e.target.value)
    const value = e.target.value
    this.setState({
      city: {
        filterby: e.target.name,
        value: this.props.cityList.find(item => item.value === parseInt(value)).text
      }
    })
  }

  render() {
    return(
      <div className="city input-field">
        <Label>
          City/Town
        </Label>
        <Select 
          options={this.props.cityList} 
          name="City"  
          onChange={e => this.handleChange(e)} 
        />
      </div>
    )
  }
}

export default City