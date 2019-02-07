import React from 'react'
import './ottp-detail.scss'

const OttpDetailCustomer = ({ age, address, phone }) => (
  <div className="ottp-detail-card">
    <div className="item">
      <h4>Customer Details</h4>
      <p className="label">Age</p>
      <p className="value">{age}</p>
    </div>

    <div className="item">
      <p className="label">Address</p>
      <p className="value">
        {address}
      </p>
    </div>

    <div className="item">
      <p className="label">Phone No.</p>
      <p className="value">{phone}</p>
    </div>
  </div>
)

export default OttpDetailCustomer