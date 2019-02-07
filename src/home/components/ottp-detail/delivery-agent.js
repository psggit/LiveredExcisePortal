import React from 'react'
import './ottp-detail.scss'

const OttpDetailDeliveryAgent = ({name, age, phone, vehicleLicenseNo, driverLicenseNo}) => (
  <div className="ottp-detail-card">
    <div className="item">
      <h4>Delivery Agent</h4>
      <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
        <div style={{ width: '50%', marginBottom: '30px' }}>
          <p className="label">Name</p>
          <p className="value">{name}</p>
        </div>

        <div style={{ width: '50%' }}>
          <p className="label">Vehicle License No.</p>
          <p className="value">{vehicleLicenseNo}</p>
        </div>

        <div style={{ width: '50%', marginBottom: '30px' }}>
          <p className="label">Age</p>
          <p className="value">{age}</p>
        </div>

        <div style={{ width: '50%' }}>
          <p className="label">Drivers License No.</p>
          <p className="value">{driverLicenseNo}</p>
        </div>

        <div style={{ width: '50%' }}>
          <p className="label">Phone No.</p>
          <p className="value">{phone}</p>
        </div>

        <div style={{ width: '50%' }}>
          <p className="label">Verified with</p>
          <p className="value">Drivers License <br/>PAN Card</p>
        </div>
      </div>
    </div>
  </div>
)

export default OttpDetailDeliveryAgent