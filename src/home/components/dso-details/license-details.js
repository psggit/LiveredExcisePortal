import React from "react"
import "./dso-detail.scss"
import Icon from "@components/icon"

const LicenseDetails = ({type, status, validity, locationsIn}) => (
  <div className="dso-detail-card">
    <div className="item">
      <p className="label">License Type</p>
      <p className="value">{type}</p>
    </div>
    <div className="item">
      <p className="label">License Status</p>
      <div style={{display: 'flex', alignItems: 'center'}}>
        <span style={{marginRight: '2px'}}><Icon name="active-indicator" /></span>
        <p className="value">{status ? 'Active' : 'Inactive'}</p>
      </div>
    </div>
    <div className="item">
      <p className="label">License Validity</p>
      <p className="value">{validity}</p>
    </div>
    <div className="item">
      <p className="label">Locations present in</p>
      <p className="value">{locationsIn}</p>
    </div>
  </div>
)

export default LicenseDetails