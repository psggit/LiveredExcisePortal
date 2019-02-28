import React from "react"
import "./retailer-detail.scss"

const OutletAddressDetail = ({address, locations}) => (
  <div className="outlet-detail-card">
    <div className="item">
      <p className="label">Primary Address</p>
      <p className="value">{address}</p>
    </div>
    <div className="item">
      <p className="label">Locations</p>
      <p className="value">{locations}</p>
    </div>
  </div>
)

export default OutletAddressDetail