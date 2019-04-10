import React from 'react'
import './ottp-detail.scss'
import Icon from "@components/icon"

const OttpDetailCustomer = ({ age, address, phone, name, verifiedDocs }) => (
  <div className="ottp-detail-card">
    <div className="item">
      <h4>Customer Details</h4>
      <div className="row">
        <div>
          <p className="label">Name</p>
          <p className="value">{name}</p>
        </div>
        {
          verifiedDocs &&
          <div>
            <div className="icon">
              <span><Icon name="green-flag" /></span>
              <span className="label">Verified With</span>
            </div>
            <p className="value">{verifiedDocs}</p>
          </div>
        }
      </div>
    </div>

    <div className="item">
      <p className="label">Age</p>
      <p className="value">{age}</p>
    </div>

    <div className="item">
      <p className="label">Address</p>
      <p className="value">
        {address}
      </p>
    </div>

    {/* <div className="item">
      <p className="label">Phone No.</p>
      <p className="value">{phone}</p>
    </div> */}
  </div>
)

export default OttpDetailCustomer