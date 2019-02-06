import React from "react"
import "./retailer-detail.scss"

const OutletDetail = ({storeCode, licenseType, licenseStatus, licenceValidity}) => (
  <div className="outlet-detail-card">
    <div className="item">
      <p className="label">Store Code</p>
      <p className="value">{storeCode}</p>
    </div>
    <div className="item">
      <p className="label">License Type</p>
      <p className="value">{licenseType}</p>
    </div>
    <div className="item">
      <p className="label">License Status</p>
      <p className="value">{licenseStatus}</p>
    </div>
    <div className="item">
      <p className="label">License Validity</p>
      <p className="value">{licenceValidity}</p>
    </div>
  </div>
)

export default OutletDetail