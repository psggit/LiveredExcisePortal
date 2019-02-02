import React from 'react'
import Button from '@components/button/index.js'
import { Api } from '@utils/config'
import '@sass/_animation.scss'
import { POST } from '@utils/fetch'
import { createSession } from './session'
import Notify from '@components/notification'
import loginBg from '@images/login-bg.jpg'
import Header from '@components/header';

class Login extends React.Component {
  constructor() {
    super()
    this.state = {
      email: '',
      password: 'fefwfewf'
    }

    this.handleLogin = this.handleLogin.bind(this)
    this.handleEmailChange = this.handleEmailChange.bind(this)
    this.handlePassword = this.handlePassword.bind(this)
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

  handleLogin() {
    const { email, password } = this.state

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
  
  handlePassword() {
    this.setState({ password: e.target.value })
  }

  handleEmailChange() {
    this.setState({ email: e.target.value })
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
           <div style={{ padding :'40px' }}>
              <React.Fragment>
                <div className="form-group">
                  <label style={{ color: '#152935', fontWeight: '500' }}>Email Address</label>
                  <input
                    spellCheck={false}
                    onKeyDown={this.handleKeyPress}
                    onChange={this.handleEmailChange}
                    style={{ width: '100%' }}
                    type="text"
                  />
                </div>
                <div className="form-group">
                  <label style={{ color: '#152935', fontWeight: '500' }}>Password</label>
                  <input
                    onKeyDown={this.handleKeyPress}
                    onChange={this.handlePassword}
                    style={{ width: '100%' }}
                    type="password"
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
           </div>
          </div>
     </React.Fragment>
    )
  }
}


export default Login
