import React from "react"
import Label from '@components/label'
import Select from "@components/select"
import "./supportWithForm.scss"
import Icon from "@components/icon"
import Button from "@components/button"
import TextInput from "@components/form-inputs/text-input"
import EmailInput from "@components/form-inputs/email-input"

class TicketForm extends React.Component {
  constructor() {
    super()
    this.state = {
      name: "",
      email: "",
      designation: "",
      urgencyLevel: "",
      reason: "",
      message: "",
      selectedReasonIdx: "",
      selectedUrgencyLevelIdx: "",
      isConfirmation: false,
      nameErr: {
        status: false,
        value: ""
      },
      emailErr: {
        status: false,
        value: ""
      },
      designationErr: {
        status: false,
        value: ""
      }
    }

    this.urgency_level = [
      { text: "Low", value: 1 },
      { text: "Medium", value: 2 },
      { text: "High", value: 3 }
    ]

    this.reason = [
      { text: "MRP violation", value: 1 },
      { text: "Late Delivery", value: 2 },
      { text: "reason3", value: 3 }
    ]

    this.handleChange = this.handleChange.bind(this)
    this.handleSelectChange = this.handleSelectChange.bind(this)
    this.handleTextareaChange = this.handleTextareaChange.bind(this)
    this.getData = this.getData.bind(this)
  }

  handleChange(fieldStatusObj) {
    console.log("data", fieldStatusObj)
    this.setState({ [fieldStatusObj.fieldName]: fieldStatusObj.fieldValue })
    // const errName = `${fieldStatusObj.fieldName}Err`
    // if (!fieldStatusObj.status) {
    //   this.setState({
    //     [fieldStatusObj.fieldName]: fieldStatusObj.fieldValue,
    //     [errName]: {
    //       status: fieldStatusObj.status,
    //       value: fieldStatusObj.value
    //     }
    //   })
    // } else {
    //   this.setState({
    //     [errName]: {
    //       status: fieldStatusObj.status,
    //       value: fieldStatusObj.value
    //     }
    //   })
    // }
  }

  handleTextareaChange(e) {
    this.setState({ message: e.target.value })
  }

  handleSelectChange(e, fieldName) {
    if (fieldName.includes("reason")) {
      // console.log("reason", this.reason.find((item) => item.value === parseInt(e.target.value)).text)
      this.setState({
        selectedReasonIdx: parseInt(e.target.value),
        reason: this.reason.find((item) => item.value === parseInt(e.target.value)).text
      })
    } else {
      // console.log("urgency level", this.urgency_level.find((item) => item.value === parseInt(e.target.value)).text)
      this.setState({
        selectedUrgencyLevelIdx: parseInt(e.target.value),
        urgencyLevel: this.urgency_level.find((item) => item.value === parseInt(e.target.value)).text
      })
    }
  }

  getData() {
    return this.state
  }

  render() {
    const { designationErr, nameErr, emailErr } = this.state
    console.log("state", this.state)
    return (
      <React.Fragment>
        <div className="row">
          <div className="input-field">
            <Label>
              Name
            </Label>
            <TextInput name="name" onChange={this.handleChange} />
            {
              nameErr.status &&
              <p className="error-message">* {nameErr.value}</p>
            }
          </div>
          <div className="input-field">
            <Label>
              Email address
              </Label>
            <EmailInput name="email" onChange={this.handleChange} />
            {
              emailErr.status &&
              <p className="error-message">* {emailErr.value}</p>
            }
          </div>
        </div>
        <div className="input-field">
          <Label>
            Designation
            </Label>
          <TextInput name="designation" onChange={this.handleChange} />
          {
            designationErr.status &&
            <p className="error-message">* {designationErr.value}</p>
          }
        </div>
        <div className="row">
          <div className="input-field">
            <Label>
              Urgency level
            </Label>
            <Select
              options={this.urgency_level}
              name="urgencyLevel"
              // placeholder="Pick an option"
              value={this.state.selectedUrgencyLevelIdx}
              onChange={e => this.handleSelectChange(e, "urgency_level")}
            />
          </div>
          <div className="input-field">
            <Label>
              Select a reason
            </Label>
            <Select
              options={this.reason}
              name="reason"
              value={this.state.selectedReasonIdx}
              // placeholder="Pick an option"
              onChange={e => this.handleSelectChange(e, "reason")}
            />
          </div>
        </div>
        <div className="input-field">
          <Label>
            Message
            </Label>
          <textarea
            placeholder="Write a message"
            name="message"
            onChange={this.handleTextareaChange}
          />
        </div>
        <div className="confirmation-text" onClick={() => { this.setState({ isConfirmation: !this.state.isConfirmation }) }}>
          <span className="icon">
            {
              !this.state.isConfirmation
                ? <Icon name="rectangle" />
                : <Icon name="filledRectangle" />
            }
          </span>
          <span className="text"> Send me a confirmation email </span>
        </div>
        <div className="submit">
          <Button primary onClick={this.props.handleSubmit}>Submit</Button>
        </div>
      </React.Fragment>
    )
  }
}

export default TicketForm