import React from "react"
import "./retailer-detail.scss"

const OutletContactDetail = ({outletsCount, name, email, mobile}) => (
  <div className="outlet-detail-card">
    <div className="item">
      <p className="label">Number of Outlets</p>
      <p className="value">{outletsCount}</p>
    </div>
    <div className="item">
      <p className="label">Contact</p>
      <p className="value">{name}</p>
      <p className="value">{mobile}</p>
      <p className="value">{email}</p>
    </div>
  </div>
)

export default OutletContactDetail