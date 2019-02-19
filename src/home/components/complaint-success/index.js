import React from "react"
import "./complaint-success.scss"
import Icon from "@components/icon"

class complaintSuccess extends React.Component {
  constructor() {
    super()
  }

  render() {
    return (
      <div id="complaintSuccess" className="container">
        <div className="main-header">
          Excise Department
          {/* <span>
            of Pondicherry
          </span> */}
        </div>
        <div className="body">
          <div className="content">
            <Icon name="success" />
            <p className="header text">Thank you!</p>
            <p className="sub-header text">We'll look into it ASAP</p>
          </div>
          <div className="footer">
            <div>
              <p className="text">For any other support, please contact us</p>
              <p className="ottp-id">00 800 1008110</p>
            </div>
            <div>
              <p className="text" style={{ color: '#4a90e2' }}>Operating hours</p>
              <p className="text">Mon - Fri (09:00 AM - 18:00 PM)</p>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default complaintSuccess
 