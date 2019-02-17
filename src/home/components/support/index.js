import React from "react"
import "./support.scss"

class Support extends React.Component {
  constructor() {
    super()
  }

  handleChange() {
    console.log("change", document.getElementById("reason").value)
  }

  render() {
    return (
      <div id="support" className="container">
        <div className="main-header">
          Excise Department of Pondicherry
      </div>
        <div className="body">
          <div className="header">
            <p className="title">Grievances & Complaints</p>
            <p className="sub-title">Ref OTTP ID# 678263525086</p>
          </div>
          <div className="content">
            <div className="form-group">
              <label>Please select a reason</label>
              <select id="reason" onChange="handleChange()">
                <option value="" disabled selected>Choose a reason</option>
                <option value="a">a</option>
                <option value="b">b</option>
                <option value="c">c</option>
                <option value="d">d</option>
              </select>
            </div>
            <div className="form-group">
              <label>Message</label>
              <div>
                <textarea placeholder="Write a message"></textarea>
              </div>
            </div>
            <div className="form-group">
              <button onClick="handleSubmit()" disabled>
                Submit
            </button>
            </div>
          </div>
          <div className="footer">
            <div>
              <p className="text">For any other support, please contact us</p>
              <p className="ottp-id">00 800 1008110</p>
            </div>
            <div>
              <p className="text" style={{ 'color': '#4a90e2' }}>Operating hours</p>
              <p className="text">Mon - Fri (09:00 AM - 18:00 PM)</p>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Support