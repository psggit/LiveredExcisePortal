import React from "react"
import Button from "@components/button/index.js"
import "@sass/_animation.scss"
import { POST } from "@utils/fetch"
import { createSession } from "./session"
import Notify from "@components/notification"
import Header from "@components/header"
import { validateEmail, validateTextField } from "@utils/validators"

class Login extends React.Component {
  constructor() {
    super()
    this.state = {
      email: "",
      password: "",
      isSubmitting: false,
      showLoginErr: false
    }

    this.handleLogin = this.handleLogin.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePassword = this.handlePassword.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.handleClick = this.handleClick.bind(this)
  }

  handleKeyPress(e) {
    if (e.keyCode === 13) {
      this.handleLogin()
    }
  }

  handleLogin(e) {
    e.preventDefault()
    document.cookie = "livered=123;"
    createSession({ hasura_id: 123, state_id: 1 })
    window.location.href = "/home/overview"
    // const { email, password } = this.state
    // const emailErr = validateEmail({
    //   fieldName: "Email ID",
    //   fieldValue: email
    // })
    // this.setState({ emailErr })

    // const passwordErr = validateTextField({
    //   fieldName: "Password",
    //   fieldValue: password
    // })
    // this.setState({ passwordErr })

    //if (!emailErr.status && !passwordErr.status) {
    //this.setState({ isSubmitting: true })
    // POST({
    //   api: "/retailer/auth/login",
    //   apiBase: "api1",
    //   handleError: false,
    //   data: { email, password }
    // })
    //   .then((json) => {
    //     if (json.data) {
    //       Notify(JSON.parse(json.data).message, "warning")
    //     } else {
    //       createSession(json)
    //       window.location.href = "/home/overview"
    //     }
    //   })
    //   .catch((error) => {
    //     this.setState({ showLoginErr: true })
    //   })
    //}
  }

  handlePassword(e) {
    this.setState({ password: e.target.value, showLoginErr: false })
    // const errName = `${e.target.name}Err`

    // this.setState({
    //   [e.target.name]: e.target.value,
    //   [errName]: validateTextField({ fieldName: 'Password', fieldValue: e.target.value }),
    // })
  }

  handleEmailChange(e) {
    // const errName = `${e.target.name}Err`

    // this.setState({
    //   [e.target.name]: e.target.value,
    //   [errName]: validateEmail({ fieldName: 'Email ID', fieldValue: e.target.value }),
    // })
    this.setState({ email: e.target.value, showLoginErr: false })
  }

  handleClick() {
    location.href = "/home/support"
  }

  render() {
    const submittingStyle = {
      cursor: "progress",
      opacity: "0.7"
    }
    // const { emailErr, passwordErr } = this.state
    return (
      <React.Fragment>
        <Header />
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "400px",
            margin: "0 auto"
          }}
        >
          <div
            style={{
              backgroundColor: "#fff",
              border: "1px solid #d9d9d9",
              width: "100%",
              overflow: "hidden"
            }}
          >
            <h3
              style={{
                fontSize: "24px",
                color: "#444",
                textAlign: "center",
                lineHeight: "54px",
                fontWeight: "600",
                borderBottom: "1px solid #d9d9d9"
              }}
            >
              Login
          </h3>
            <div style={{ padding: "40px 40px 40px 40px" }}>
              <form onSubmit={this.handleLogin}>
                <div className="form-group">
                  <label style={{ color: "#152935", fontWeight: "500" }}>
                    Email ID
                </label>
                  <input
                    spellCheck={false}
                    onKeyDown={this.handleKeyPress}
                    onChange={this.handleEmailChange}
                    style={{ width: "100%" }}
                    pattern="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
                    type="text"
                    name="email"
                    required
                    autoComplete="off"
                  // className={`${emailErr.status ? "error" : undefined}`}
                  />
                  {/* {emailErr.status && <p className="__error">{emailErr.value}</p>} */}
                </div>
                <div className="form-group">
                  <label style={{ color: "#152935", fontWeight: "500" }}>
                    Password
                </label>
                  <input
                    onKeyDown={this.handleKeyPress}
                    onChange={this.handlePassword}
                    style={{ width: "100%" }}
                    type="password"
                    name="password"
                    pattern="^[^-\s][a-zA-Z0-9_\s-]+$"
                    required
                  // className={`${passwordErr.status ? "error" : undefined}`}
                  />
                  {/* {passwordErr.status && (
                    <p className="__error">{passwordErr.value}</p>
                  )} */}
                </div>
                <div className="form-group" style={{ textAlign: "center" }}>
                  <Button
                    //onClick={this.handleLogin}
                    style={
                      this.state.isSubmitting
                        ? submittingStyle
                        : { boxShadow: "0 2px 4px 0 #333" }
                    }
                    primary
                  >
                    Login
                </Button>
                </div>
              </form>
            </div>
            {this.state.showLoginErr && (
              <p
                style={{
                  display: "flex",
                  justifyContent: "center",
                  //marginTop: '0px',
                  paddingBottom: "20px",
                  color: "#ff3b30",
                  fontSize: "16px"
                }}
              >
                Wrong username or password
            </p>
            )}
          </div>
          <p style={{
            textAlign: "center",
            marginTop: "24px",
            cursor: "pointer",
          }}
            onClick={this.handleClick}
          >
            Having trouble? Contact Support
        </p>
        </div>
      </React.Fragment>
    )
  }
}

export default Login
