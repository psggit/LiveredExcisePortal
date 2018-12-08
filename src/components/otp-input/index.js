import React from 'react'
import './otp-input.scss'

class OtpInput extends React.Component {
  constructor() {
    super()
    this.state = {
      otpArr: []
    }
    this.handleKeyDown = this.handleKeyDown.bind(this)
    this.getOtp = this.getOtp.bind(this)
  }
  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyDown)
  }
  componentWillUnmount() {
    document.addEventListener('keydown', this.handleKeyDown)
  }
  getOtp() {
    return this.otpArr.join()
  }
  handleKeyDown(e) {
    const updatedOtpArr = this.state.otpArr.slice()
    const escapeIsPressed = e.keyCode == 27
    const backspaceIsPressed = e.keyCode == 8 
    const reg = /^\d+$/

    if (backspaceIsPressed) {
      updatedOtpArr.pop()
    }
    
    if (reg.test(e.key)) {
      updatedOtpArr.push(e.key)
    }

    if (updatedOtpArr.length <= 6)  {
      this.setState({ otpArr: updatedOtpArr })
    }
  }
  render() {
    return (
      <div className="otp-input-container">
        <div className="otp-input-item">
          <span>{ this.state.otpArr[0] }</span>
        </div>
        <div className="otp-input-item">
          <span>{ this.state.otpArr[1] }</span>
        </div>
        <div className="otp-input-item">
          <span>{ this.state.otpArr[2] }</span>
        </div>
        <div className="otp-input-item">
          <span>{ this.state.otpArr[3] }</span>
        </div>
        <div className="otp-input-item">
          <span>{ this.state.otpArr[4] }</span>
        </div>
        <div className="otp-input-item">
          <span>{ this.state.otpArr[5] }</span>
        </div>
      </div>
    )
  }
}

export default OtpInput