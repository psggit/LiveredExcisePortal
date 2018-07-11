import React from 'react'
import Button from '@components/button/index.js'
import { Api } from '@utils/config'
import '@sass/_animation.scss'
import { POST } from '@utils/fetch'

class Login extends React.Component {
  constructor() {
    super()
    this.state = {
      showOTPField: false,
      isSubmitting: false,
      phoneNumber: ''
    }
    this.handleOTP = this.handleOTP.bind(this)
    this.setPhoneNumber = this.setPhoneNumber.bind(this)
    this.setOTP = this.setOTP.bind(this)
  }

  handleOTP() {
    const { phoneNumber } = this.state
    if (phoneNumber.length === 10) {
      this.setState({ isSubmitting: true })
      const fetchOptions = { mobile: phoneNumber, otp: null }
      POST({
        api: '/excise-person/auth/otp-login',
        apiBase: 'gremlinUrl',
        handleError: true,
        type: 'Public',
        data: { mobile: phoneNumber, otp: null }
      })
        .then((json) => {
          // createSession(json)
          this.setState({ showOTPField: true })
        })
        .catch((err) => {
          alert(err)
          this.setState({ isSubmitting: false })
        })
    }
  }

  handleLogin() {
    const { otp, phoneNumber } = this.state

    if (otp.length === 6) {
      this.setState({ isSubmitting: true })
      POST({
        api: '/excise-person/auth/otp-login',
        apiBase: 'gremlinUrl',
        handleError: true,
        type: 'Public',
        data: { otp, mobile: phoneNumber }
      })
        .then(json => {
          window.location.href = '/home/live-ottp'
        })
        .catch(err => {
          alert(err)
          this.setState({ isSubmitting: false })
        })
    }
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
                  maxLength={10}
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
                  maxLength="6"
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
