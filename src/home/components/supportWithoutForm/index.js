import React from "react"
import './supportWithoutForm.scss'
import Icon from "@components/icon"

class Support extends React.Component {
  render() {
    return (
      <div id="support">
        <div className="body">
          <p className="title-text">For any support, please contact us</p>
          <div className="content">
            <div>
              <Icon name="callButton" />
              <p>00 800 1008110</p>
            </div>
            <div>
              <Icon name="mailButton" />
              <p>support@livered.com</p>
            </div>
          </div>
          <div className="footer">
            <p className="title">Operating hours</p>
            <p className="text">9:00 AM to 18:00 PM from Monday to Friday, Closed on Saturday and Sunday</p>
          </div>
        </div>
      </div>
    )
  }
}

export default Support