import React from 'react'
import './ottp-detail.scss'

const OttpDetailDSO = ({ name, sourceRetailer }) => (
  <div className="ottp-detail-card">
    <div className="item">
      <h4>Delivery Service Provider</h4>
      <p className="label">Name</p>
      <p className="value">Swiggy</p>
    </div>

    <div className="item">
      <h4>Retailer Source</h4>
      <p className="value">
      Tonique
TG, 645, Rd Number 36, Aditya Enclave, Venkatagiri, Jubilee Hills, Hyderabad, 500033
      </p>
    </div>
  </div>
)

export default OttpDetailDSO