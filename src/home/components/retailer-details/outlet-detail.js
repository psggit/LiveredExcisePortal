import React from "react"
import "./retailer-detail.scss"
import Icon from "@components/icon"
import Moment from "moment"

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
      <div style={{display: 'flex', alignItems: 'center'}}>
        <span style={{marginRight: '2px'}}><Icon name="active-indicator" /></span>
        <p className="value">{licenseStatus}</p>
      </div>
    </div>
    <div className="item">
      <p className="label">License Validity</p>
      <p className="value">{Moment(licenceValidity).format('DD/MM/YYYY')}</p>
    </div>
  </div>
)

export default OutletDetail