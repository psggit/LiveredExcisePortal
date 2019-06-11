import React from "react"
import "./dso-detail.scss"

const HeadOfficeDetails = ({ city, address }) => (
  <div className="dso-detail-card">
    <div className="item">
      <p className="label">Head Office</p>
      <p className="value">{city}</p>
    </div>
    <div className="item">
      <p className="label">Address</p>
      <p className="value">{address}</p>
    </div>
  </div>
)

export default HeadOfficeDetails