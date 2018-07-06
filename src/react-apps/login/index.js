import React from 'react'
import Button from '@components/button/index.js'
import { Api } from '@utils/config'
import '@sass/_animation.scss'
import 'whatwg-fetch'

class Login extends React.Component {
  constructor() {
    super()
    this.state = {
      showOTPField: false,
      isSubmitting: false
    }
    this.handleOTP = this.handleOTP.bind(this)
    this.setPhoneNumber = this.setPhoneNumber.bind(this)
    this.setOTP = this.setOTP.bind(this)
  }

  handleOTP() {
    this.setState({ isSubmitting: true })
    const { phoneNumber } = this.state
    const fetchOptions = { mobile: phoneNumber, otp: null }

    fetch(`${Api.authURl}/excise-person/auth/otp-login`, fetchOptions)
      .then((res) => {
        if (res.status !== 2000) {
          console.log(`Problem with status code ${res.status}`)
          this.setState({ isSubmitting: false })
          return;
        }
        res.json().then(data => {
          // createSession(data)
          // redirect
        })
      })
      .catch(err => {
        console.log(err)
        this.setState({ isSubmitting: false })
      })
  }

  handleLogin() {
    this.setState({ isSubmitting: true })
    const { otp } = this.state
  }

  setPhoneNumber(e) {
    this.setState({ phoneNumber: e.target.value })
  }

  setOTP(e) {
    this.setState({ otp: e.target.value })
  }

  render() {
    const submittingStyle = {
      cursor: 'progress',
      opacity: '0.7'
    }

    return (
      <div style={{
        backgroundColor: '#D5DAE6',
        height: '100vh'
      }}>
        <div
          style={{
            backgroundColor: '#fff',
            borderRadius: '6px',
            padding: '40px',
            width: '100%',
            maxWidth: '400px',
            margin: '0 auto',
            position: 'relative',
            top: '50%',
            transform: 'translateY(-50%)',
            overflow: 'hidden'
          }}>
          <h2 style={{ color: '#49587D', textAlign: 'center', marginBottom: '20px' }}>Live Red</h2>

          {
            !this.state.showOTPField &&
            <React.Fragment>
              <div className="form-group">
                <label>Phone Number</label>
                <input
                  value={this.state.phoneNumber}
                  onChange={this.setPhoneNumber}
                  style={{ width: '100%' }}
                  type="text"
                />
              </div>
              <div className="form-group">
                <Button
                  onClick={this.handleOTP}
                  style={this.state.isSubmitting ? submittingStyle : {}}
                  primary
                >
                  Send otp
                </Button>
              </div>
            </React.Fragment>
          }

          {
            this.state.showOTPField &&
            <React.Fragment>
              <div className="form-group animated bounceInRight">
                <label>OTP</label>
                <input
                  value={this.state.otp}
                  onChange={this.setOTP}
                  style={{ width: '100%' }}
                  maxLength="4"
                  type="text"
                />
              </div>
              <div className="form-group">
                <Button
                  onClick={this.handleOTP}
                  style={this.state.isSubmitting ? submittingStyle : {}}
                  primary
                >
                  Log in
                </Button>
              </div>
            </React.Fragment>
          }


        </div>
      </div>
    )
  }
}


export default Login
