import React from "react"
import Icon from "@components/icon"
import OutletDetail from "./outlet-detail"
import OutletAddressDetail from "./outlet-address-detail"
import OutletContactDetail from "./outlet-contact-detail"

class RetailerDetail extends React.Component {
  constructor() {
    super()
  }

  render() {
    const data = this.props.history.location.state
    return (
      <React.Fragment>
        <div style={{display: 'flex', marginBottom: '70px'}}>
          <Icon name="cross"/>
          <p 
            style={{
              fontSize: '32px',
              letterSpacing: '0.3px',
              color: '#152935'
            }}
          >
            Tonique
          </p>
        </div>
        <div 
          style={{
            background: '#f0f3f6',
            fontSize: '16px',
            lineHeight: '1.13',
            color: '#152935',
            padding: '20px 30px'
          }}
        >
          BASIC INFORMATION
        </div>
        <div style={{display: 'flex'}}>
          <OutletDetail 
            storeCode={data.code}
            licenseType={data.license_type}
            licenseStatus={data.license_status ? 'Active' : 'Inactive'}
            licenceValidity={data.licence_validity}
          />
           <OutletAddressDetail
            outletsCount={data.outlets_count}
            city={data.city}
            address={data.address}
          />

          <OutletContactDetail
            name={data.name}
            email={data.email}
            mobile={data.contact}
          />
        </div>
        </React.Fragment>
    )
  }
}

export default RetailerDetail