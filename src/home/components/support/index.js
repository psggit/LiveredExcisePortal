import React from "react";
import "./support.scss";
import { POST } from "@utils/fetch";

class Support extends React.Component {
  constructor() {
    super();
    this.state = {
      reason: "",
      message: "",
      ottpId: ""
    };
    this.reasons = [
      {
        text: "Wrong product(s) delivered / Product(s) missing",
        value: 0
      },
      {
        text: "Product(s) delivered late",
        value: 1
      },
      {
        text: "Proper packaging absent",
        value: 2
      },
      {
        text: "MRP violation",
        value: 3
      },
      {
        text: "Product(s) damaged/ tampered/ spurious",
        value: 4
      },
      {
        text: "Inappropriate behaviour by agent",
        value: 5
      }
    ];
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleMessageChange = this.handleMessageChange.bind(this);
  }

  componentDidMount() {
    this.setState({ ottpId: location.search.split("=")[1] });
  }

  handleMessageChange(e) {
    //console.log("message", e.target.value)
    this.setState({ message: e.target.value });
  }

  handleChange() {
    console.log("change", document.getElementById("reason").value);
    const selectedReasonIdx = parseInt(document.getElementById("reason").value);
    console.log(
      "selected reason",
      this.reasons.find(item => item.value === selectedReasonIdx).text
    );
    this.setState({
      reason: this.reasons.find(item => item.value === selectedReasonIdx).text
    });
  }

  handleSubmit() {
    console.log("inside submit", this.state);
    const { message, ottpId, reason } = this.state;
    POST({
      api: "http://192.168.5.86:8087/livered/createComplaints",
      //apiBase: "api1",
      handleError: false,
      prependBaseUrl: false,
      data: { 
        complaint_message: message, 
        ottp_id: ottpId, 
        reason 
      }
    })
      .then((json) => {
        location.href="complaint-success"
      })
      .catch((error) => {
        location.href="complaint-failure"
      });
  }

  render() {
    return (
      <div id="support" className="container">
        <div className="main-header">
          Excise Department
          {/* <span>
            of Pondicherry
          </span> */}
        </div>
        <div className="body">
          <div className="header">
            <p className="title">Grievances & Complaints</p>
            <p className="sub-title">Ref OTTP ID# 678263525086</p>
          </div>
          <div className="content">
            <div className="form-group">
              <label>Please select a reason</label>
              <select id="reason" onChange={() => this.handleChange()}>
                <option value="" disabled selected>
                  Choose a reason
                </option>
                {this.reasons.map(item => {
                  return <option value={item.value}>{item.text}</option>;
                })}
              </select>
            </div>
            <div className="form-group">
              <label>Message</label>
              <div>
                <textarea
                  placeholder="Write a message"
                  value={this.state.message}
                  onChange={e => this.handleMessageChange(e)}
                />
              </div>
            </div>
            <div className="form-group">
              <button onClick={() => this.handleSubmit()}>Submit</button>
            </div>
          </div>
          <div className="footer">
            <div>
              <p className="text">For any other support, please contact us</p>
              <p className="ottp-id">00 800 1008110</p>
            </div>
            <div>
              <p className="text" style={{ color: "#4a90e2" }}>
                Operating hours
              </p>
              <p className="text">Mon - Fri (09:00 AM - 18:00 PM)</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Support;
