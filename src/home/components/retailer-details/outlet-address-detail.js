import React from "react"
import "./retailer-detail.scss"

const OutletAddressDetail = ({outletsCount, address, city}) => (
  <div className="outlet-detail-card">
    <div className="item">
      <p className="label">Number of Outlets</p>
      <p className="value">{outletsCount}</p>
    </div>
    <div className="item">
      <p className="label">City/Town</p>
      <p className="value">{city}</p>
    </div>
    <div className="item">
      <p className="label">Address</p>
      <p className="value">{address}</p>
    </div>
  </div>
)

export default OutletAddressDetail