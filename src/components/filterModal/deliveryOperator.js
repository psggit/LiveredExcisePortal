import React from "react"
import Label from "../label"
import Select from "../select"

class DeliveryOperator extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      dso: {
        filterby: "",
        value: "",
        idx: this.props.selectedDsoIdx ? this.props.selectedDsoIdx : 0 
      }
    }

    this.handleChange = this.handleChange.bind(this)
    this.getData = this.getData.bind(this)
  }

  componentDidUpdate(prevProps) {
    if (prevProps.selectedDsoIdx !== this.props.selectedDsoIdx) {
      this.setState({
        dso: {...this.state.dso, idx: this.props.selectedDsoIdx ? this.props.selectedDsoIdx : 0} 
      })
    }
  }

  getData() {
    return this.state
  }

  handleChange(e) {
    const value = e.target.value
    this.setState({
      dso: {
        filterby: e.target.name,
        value: this.props.dsoList.find(item => item.value === parseInt(value)).text,
        dso_id: this.props.dsoList.find(item => item.value === parseInt(value)).dso_id,
        idx: this.props.dsoList.find(item => item.value === parseInt(value)).value
      }
    })
  }

  render() {
    console.log("dsp", this.props.dsoList, this.state.dso)
    return (
      <div className="delivery-operator input-field">
        <Label>
          Delivery Operator
        </Label>
        <Select
          options={this.props.dsoList}
          name="Delivery Operator"
          onChange={e => this.handleChange(e)}
          value={this.state.dso.idx}
        />
      </div>
    )
  }
}

export default DeliveryOperator