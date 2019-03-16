import React from "react"
import PageHeader from '@components/pageheader'
import Icon from "@components/icon"
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as Actions from './../../actions'
import SupportTicketForm from './form'

class SupportForm extends React.Component {

  constructor() {
    super() 

    this.handleFormSubmit = this.handleFormSubmit.bind(this)
  }

  handleFormSubmit() {
    const formData = this.supportForm.getData()
    console.log("form data", formData)
    if(formData.name.length && formData.email.length && formData.message.length) {
      this.props.actions.createExciseComplaints({
        name: formData.name,
        email: formData.email,
        state_short_name: "TN",
        reason: formData.reason,
        urgency: formData.urgencyLevel,
        message: formData.message,
        confirmation: formData.isConfirmation
      })
    }
  }

  render() {
    return (
      <div id="supportForm">
        <PageHeader pageName="Get in touch" />
        <p className="sub-header">Please share your queries/feedback. Our support team will contact you ASAP</p>
        <div className="main-container">
          <div className="ticket-form">
            <SupportTicketForm  ref={(node) => { this.supportForm = node }} handleSubmit={this.handleFormSubmit} />
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

const mapStateToProps = state => state.main

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(Actions, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(SupportForm)

//export default SupportForm