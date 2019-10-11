import React from "react"
import Label from "../label"
import Select from "../select"

class City extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      city: {
        filterby: "",
        value: "",
        cityName: "",
        idx: props && props.selectedCityIdx ? props.selectedCityIdx : 0
      }
    }

    this.handleChange = this.handleChange.bind(this)
    this.getData = this.getData.bind(this)
  }

  componentDidUpdate(prevProps) {
    if(prevProps.selectedCityIdx !== this.props.selectedCityIdx) {
      this.setState({
        city: { ...this.state.city, idx: this.props.selectedCityIdx ? this.props.selectedCityIdx : 0 }
      })
    }
  }

  getData() {
    return this.state
  }

  handleChange(e) {
    const value = e.target.value
    this.setState({
      city: {
        filterby: e.target.name,
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
          value={this.state.city.idx}
        />
      </div>
    )
  }
}

export default City