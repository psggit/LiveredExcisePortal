import React from "react"
import "./dso-detail.scss"

const RegionalOfficeDetails = ({name, mobile, email, city, address}) => (
  <div className="dso-detail-card">
    <div className="item">
      <p className="label">Regional Office</p>
      <p className="value">{city}</p>
    </div>
    <div className="item">
      <p className="label">Address</p>
      <p className="value">{address}</p>
    </div>
    <div className="item">
      <p className="label">Contact</p>
      <p className="value">{name}</p>
      <p className="value">{mobile}</p>
      <p className="value">{email}</p>
    </div>
  </div>
)

export default RegionalOfficeDetails