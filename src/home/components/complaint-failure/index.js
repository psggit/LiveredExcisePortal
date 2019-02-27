import React from "react"
import "./../complaint-success/complaint-success.scss"
import Icon from "@components/icon"

class complaintFailure extends React.Component {
  constructor() {
    super()
  }

  handleClick() {
    location.href="/support"
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
          <div className="content failure">
            <Icon name="failure" />
            <p className="header text">Something went wrong!</p>
            <button onClick={this.handleClick}>Try again</button>
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

export default complaintFailure
 