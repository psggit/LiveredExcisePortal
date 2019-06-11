import React from "react"
import "./dso-detail.scss"
import Icon from "@components/icon"
import Moment from "moment"

const LicenseDetails = ({ licenseType, licenseStatus, licenseExpiry }) => (
  <div className="dso-detail-card">
    <div className="item">
      <p className="label">License Type</p>
      <p className="value">{licenseType}</p>
    </div>
    <div className="item">
      <p className="label">License Status</p>
      {/* <p className="value">{licenseStatus  ? "Active" : ""}</p> */}
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <span style={{ marginRight: '2px' }}>
          {
            licenseStatus
              ? <Icon name="active-indicator" />
              : <Icon name="active-indicator" />
          }
        </span>
        <p className="value">{licenseStatus ? "Active" : "Inactive"}</p>
      </div>
    </div>
    <div className="item">
      <p className="label">License Expiry</p>
      <p className="value">{Moment(licenseExpiry).format("DD-MM-YYYY")}</p>
    </div>
  </div>
)

export default LicenseDetails