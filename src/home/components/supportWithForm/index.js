import React from "react"
import PageHeader from '@components/pageheader'
import Icon from "@components/icon"
import Label from '@components/label'
import "./supportWithForm.scss"
import Button from "@components/button"
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
      isConfirmation: false
    }
  }
  render() {
    const {name, email, designation, urgencyLevel, reason, message} = this.state
    return (
      <div id="supportForm">
        <PageHeader pageName="Get in touch" />
        <p>Please share your queries/feedback. Our support team will contact you ASAP</p>
        <div className="main-container">
          <div className="ticket-form">
            <div className="row">
              <div>
                <Label>
                  Name
                </Label>
                <input type="text" value={name} />
              </div>
              <div>
                <Label>
                  Email address
                </Label>
                <input type="text" value={email} />
              </div>
            </div>
            <div>
              <Label>
                Designation
              </Label>
              <input type="text" value={designation} />
            </div>
            <div className="row">
              <div>
                <Label>
                  Urgency level
                </Label>
                <input type="text" value={urgencyLevel} />
              </div>
              <div>
                <Label>
                  Select a reason
                </Label>
                <input type="text" value={reason} />
              </div>
            </div>
            <div>
              <Label>
                Message
              </Label>
              <textarea placeholder="Write a message" />
            </div>
            <div className="confirmation-text">
              <input style={{marginRight: '5px'}} type="checkbox" name="checkbox" id="checkbox_id" value="value" />
              <label for="checkbox_id">Send me a confirmation email</label>
            </div>
            <div className="submit">
              <Button primary>Submit</Button>
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