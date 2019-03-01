import React from "react"
import "./dso-detail.scss"
import Icon from "@components/icon"
import Moment from "moment"

const LicenseDetails = ({status, dateOfValidation, locationsIn}) => (
  <div className="dso-detail-card">
    <div className="item">
      <p className="label">License Status</p>
      <p className="value">{status  ? "Validated" : "Not Validated"}</p>
      {/* <div style={{display: 'flex', alignItems: 'center'}}>
        <span style={{marginRight: '2px'}}><Icon name="active-indicator" /></span>
        <p className="value">{status  ? "Validated" : "Not Validated"}</p>
      </div> */}
    </div>
    <div className="item">
      <p className="label">Date of Validation</p>
      <p className="value">{ Moment(dateOfValidation).format('DD/MM/YYYY') }</p>
    </div>
    <div className="item">
      <p className="label">Locations present in</p>
      <p className="value">{locationsIn}</p>
    </div>
  </div>
)

export default LicenseDetails