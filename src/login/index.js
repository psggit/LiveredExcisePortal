import React from 'react'
import Button from '@components/button/index.js'
import '@sass/_animation.scss'
import { POST } from '@utils/fetch'
import { createSession } from './session'
import Notify from '@components/notification'
import Header from '@components/header';

class Login extends React.Component {
  constructor() {
    super()
    this.state = {
      showOTPField: false,
      isSubmitting: false,
      phoneNumber: '',
      otp: ''
    }
    this.handleOTP = this.handleOTP.bind(this)
    this.handleLogin = this.handleLogin.bind(this)
    this.setPhoneNumber = this.setPhoneNumber.bind(this)
    this.setOTP = this.setOTP.bind(this)
    this.handleKeyPress = this.handleKeyPress.bind(this)
  }

  handleKeyPress(e) {
    if (e.keyCode === 13) {
      if (this.state.showOTPField) {
        this.handleLogin()
      } else {
        this.handleOTP()
      }
    }
  }

  handleOTP() {
    const { phoneNumber, otp } = this.state
    if (phoneNumber.length === 10) {
      this.setState({ isSubmitting: true })

      POST({
        api: '/excise-person/auth/otp-login',
        apiBase: 'gremlinUrl',
        handleError: false,
        cors: true,
        data: { mobile: phoneNumber, otp: null }
      })
        .then((json) => {
          if (json.status) {
            Notify(json.status, 'warning')
            this.setState({ isSubmitting: false })
          } else {
            Notify('OTP sent to mobile number', 'success')
            this.setState({ showOTPField: true, isSubmitting: false })
          }
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
        handleError: false,
        data: { otp, mobile: phoneNumber }
      })
        .then(json => {
          if (json.data) {
            Notify(JSON.parse(json.data).message, 'warning')
          } else {
            createSession(json)
            window.location.href = '/home/live-ottp'
          }
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
      <React.Fragment>
        <Header isLoggedIn={false} />
        <div style={{
          backgroundColor: '#fff',
          border: '1px solid #d9d9d9',
          width: '100%',
          maxWidth: '400px',
          margin: '0 auto',
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          overflow: 'hidden'
        }}>
          <h3 style={{ fontSize: '24px', color: '#444', textAlign: 'center', lineHeight: '54px', fontWeight: '600', borderBottom: '1px solid #d9d9d9' }}>Login</h3>
          <div style={{ padding: '40px' }}>
            {
              !this.state.showOTPField &&
              <React.Fragment>
                <div className="form-group">
                  <label style={{ color: '#152935', fontWeight: '500' }}>Enter Phone Number</label>
                  <input
                    maxLength={10}
                    value={this.state.phoneNumber}
                    onKeyDown={this.handleKeyPress}
                    onChange={this.setPhoneNumber}
                    style={{ width: '100%' }}
                    type="text"
                  />
                </div>
                <div className="form-group">
                  <Button
                    onClick={this.handleOTP}
                    style={this.state.isSubmitting ? submittingStyle : { boxShadow: '0 2px 4px 0 #333' }}
                    primary
                  >
                    Get otp &amp; login
                  </Button>
                </div>
              </React.Fragment>
            }

            {
              this.state.showOTPField &&
              <React.Fragment>
                <div className="form-group animated bounceInRight">
                  <label style={{ color: '#fff' }}>Enter OTP</label>
                  <input
                    value={this.state.otp}
                    onChange={this.setOTP}
                    onKeyDown={this.handleKeyPress}
                    style={{ width: '100%' }}
                    maxLength="6"
                    type="text"
                  />
                  <span
                    style={{ fontSize: '12px', color: '#fff' }}
                  >
                    Click <a onClick={this.handleOTP} style={{ color: '#fff', cursor: 'pointer', textDecoration: 'underline' }}>here</a> to resend
                  </span>
                </div>

                <div className="form-group">
                  <Button
                    onClick={this.handleLogin}
                    style={this.state.isSubmitting ? submittingStyle : { boxShadow: '0 2px 4px 0 #333' }}
                    primary
                  >
                    Login
                  </Button>
                </div>
              </React.Fragment>
            }
          </div>
        </div>
      </React.Fragment>
    )
  }
}


export default Login
