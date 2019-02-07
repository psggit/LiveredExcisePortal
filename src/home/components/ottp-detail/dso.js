import React from 'react'
import './ottp-detail.scss'

const OttpDetailDSO = ({ name, address }) => (
  <div className="ottp-detail-card">
    <div className="item">
      <h4>Delivery Service Provider</h4>
      {/* <p className="label">Name</p> */}
      <p className="value">{name}</p>
    </div>

    <div className="item">
      <h4>Retailer Source</h4>
      <p className="value">
        {address}
      </p>
    </div>
  </div>
)

export default OttpDetailDSO