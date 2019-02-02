import React from 'react'
import './ottp-detail.scss'

const OttpDetailCustomer = ({ name, sourceRetailer }) => (
  <div className="ottp-detail-card">
    <div className="item">
      <h4>Customer Details</h4>
      <p className="label">Age</p>
      <p className="value">23</p>
    </div>

    <div className="item">
      <p className="label">Address</p>
      <p className="value">
      2 Krishna Nagar Street, Hyderabad, 
Telanagana 560067
      </p>
    </div>

    <div className="item">
      <p className="label">Phone No.</p>
      <p className="value">+91 74563 1999</p>
    </div>
  </div>
)

export default OttpDetailCustomer