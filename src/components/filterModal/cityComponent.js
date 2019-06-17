import React from "react"
import Label from "../label"
import Select from "../select"

class City extends React.Component {
  constructor(props) {
    super(props)
    console.log("city props", props)
    this.state = {
      city: {
        filterby: "",
        value: "",
        cityName: "",
        idx: props && props.selectedCityIdx ? props.selectedCityIdx : -1
      }
    }

    this.handleChange = this.handleChange.bind(this)
    this.getData = this.getData.bind(this)
  }

  getData() {
    return this.state
  }

  handleChange(e) {
    // console.log("city change", e.target.value)
    const value = e.target.value
    this.setState({
      city: {
        filterby: e.target.name,
        //value: value.toString(),
        value: this.props.cityList.find(item => item.value === parseInt(value)).text,
        idx: e.target.value,
        cityName: this.props.cityList.find(item => item.value === parseInt(value)).text
      }
    })
  }

  render() {
    return (
      <div className="city input-field">
        <Label>
          City/Town
        </Label>
        <Select
          options={this.props.cityList}
          name="City"
          onChange={e => this.handleChange(e)}
          value={this.props.selectedCityIdx}
        />
      </div>
    )
  }
}

export default City