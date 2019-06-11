import React from "react"
import "./dso-detail.scss"

const RegionalOfficeDetails = ({ name, mobile, email }) => (
  <div className="dso-detail-card">
    <div className="item">
      <p className="label">Contact</p>
      <p className="value">{name}</p>
      <p className="value">{mobile}</p>
      <p className="value">{email}</p>
    </div>
  </div>
)

export default RegionalOfficeDetails