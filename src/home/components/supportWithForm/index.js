import React from "react"
import PageHeader from '@components/pageheader'
import Icon from "@components/icon"
import Label from '@components/label'
import Select from "@components/select"
import "./supportWithForm.scss"
import Button from "@components/button"
import TextInput from "@components/form-inputs/text-input"
import EmailInput from "@components/form-inputs/email-input"
//import "./../supportWithoutForm/supportWithoutForm.scss"

class SupportForm extends React.Component {

  constructor() {
    super() 
    this.state = {
      name: "",
      email: "",
      designation: "",
      urgencyLevel: "",
      reason: "",
      message: "",
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
      {
        text: "level1",
        value: 0
      },
      {
        text: "level2",
        value: 1
      },
      {
        text: "level3",
        value: 2
      }
    ]

    this.reason = [
      {
        text: "reason1",
        value: 0
      },
      {
        text: "reason2",
        value: 1
      },
      {
        text: "reason3",
        value: 2
      }
    ]

    this.handleChange = this.handleChange.bind(this)
    this.handleCheckboxChange = this.handleCheckboxChange.bind(this)
    this.handleFormSubmit = this.handleFormSubmit.bind(this)
    this.handleTextareaChange = this.handleTextareaChange.bind(this)
  }

  handleChange(fieldStatusObj) {
    //console.log("handle number change", fieldStatusObj)
    const errName = `${fieldStatusObj.fieldName}Err`
    if (!fieldStatusObj.status) {
      this.setState({
        [fieldStatusObj.fieldName]: fieldStatusObj.fieldValue,
        [errName]: {
          status: fieldStatusObj.status,
          value: fieldStatusObj.value
        }
      })
    } else {
      //console.log("err")
      // const errName = `${fieldStatusObj.fieldName}Err`
      this.setState({
        [errName]: {
          status: fieldStatusObj.status,
          value: fieldStatusObj.value
        }
      })
    }
  }

  handleTextareaChange(e) {
    this.setState({message: e.target.value})
  }

  handleSelectChange(e, fieldName) {
    //console.log("select change", e.target.value)
    if(fieldName.includes("reason")) {
      console.log("reason", this.reason.find((item) => item.value === parseInt(e.target.value)).text)
      this.setState({
        reason: this.reason.find((item) => item.value === parseInt(e.target.value)).text
      })
    } else {
      console.log("urgency level", this.urgency_level.find((item) => item.value === parseInt(e.target.value)).text)
      this.setState({
        urgencyLevel: this.urgency_level.find((item) => item.value === parseInt(e.target.value)).text
      })
    }
  }

  handleCheckboxChange(e) {
    //console.log("checked", e.target.checked)
    this.setState({confirmationEmail: e.target.checked})
  }

  handleFormSubmit() {
    console.log("submit state", this.state)
  }

  render() {
    const {designationErr, nameErr, emailErr} = this.state
    console.log("state", this.state)
    return (
      <div id="supportForm">
        <PageHeader pageName="Get in touch" />
        <p>Please share your queries/feedback. Our support team will contact you ASAP</p>
        <div className="main-container">
          <div className="ticket-form">
            <div className="row">
              <div className="input-field">
                <Label>
                  Name
                </Label>
                <TextInput name="name" onChange={this.handleChange}/>
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
              <TextInput name="designation" onChange={this.handleChange}/>
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
                  name="urgency level"  
                  // placeholder="Pick an option"
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
            <div className="confirmation-text">
              <input 
                style={{marginRight: '5px'}} 
                type="checkbox" 
                name="confirmationEmail" 
                id="confirmationEmail" 
                onChange={this.handleCheckboxChange}
                //value="value" 
              />
              <label for="confirmationEmail">Send me a confirmation email</label>
            </div>
            <div className="submit">
              <Button primary onClick={this.handleFormSubmit}>Submit</Button>
            </div>
          </div>
          <div className="contact-details">
            <p>You can also reach us via phone/email</p>
            <div className="icon">
              <Icon name="callButton" />
              <p className="contact-link">00 800 1008110</p>
            </div>
            <div className="icon">
              <Icon name="mailButton" />
              <p className="contact-link">support@livered.com</p>
            </div>
            <div className="footer">
              <p className="title">Operating hours</p>
              <p className="text">9:00 AM to 18:00 PM from Monday to Friday, Closed on Saturday and Sunday</p>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default SupportForm