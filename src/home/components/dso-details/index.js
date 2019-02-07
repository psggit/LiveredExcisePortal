import React from "react"
import LicenseDetails from "./license-details"
import HeadOfficeDetails from "./head-office-details"
import RegionalOfficeDetails from './regional-office-details'

class DSODetails extends React.Component {
  constructor() {
    super()
  }

  render() {
    const headerStyle = {
      background: '#f0f3f6',
      fontSize: '16px',
      lineHeight: '1.13',
      color: '#152935',
      padding: '20px 30px',
      border: '1px solid #dfe3e6'
    }
    const data = this.props.history.location.state
    return (
      <React.Fragment>
        <div style={{display: 'flex', marginBottom: '60px'}}>
          {/* <Icon name="cross"/> */}
          <p 
            style={{
              fontSize: '22px',
              letterSpacing: '0.3px',
              color: '#152935'
            }}
          >
            {data.name}
          </p>
        </div>
        <div style={headerStyle} >
          BASIC INFORMATION
        </div>
        <div style={{display: 'flex', marginBottom: '36px'}}>
          <LicenseDetails 
            type={data.license_type}
            status={data.is_active ? 'Active' :  'Inactive'}
            validity={data.license_validity}
            locationsIn={data.locations_in}
          />
          <HeadOfficeDetails
            name={data.head_office.contact.name}
            email={data.head_office.contact.email}
            mobile={data.head_office.contact.phone}
            city={data.head_office.city}
            address={data.head_office.address}
          />
           <RegionalOfficeDetails
            name={data.regional_office.contact.name}
            email={data.regional_office.contact.email}
            mobile={data.regional_office.contact.phone}
            city={data.regional_office.city}
            address={data.regional_office.address}
          />
        </div>
        {/* <div style={headerStyle} >
          ACTIVITY
        </div>
        <div style={headerStyle} >
          CREDITS HISTORY
        </div>
        <CreditHistory />
        <div style={headerStyle} >
          LICENSE HISTORY
        </div> */}
      </React.Fragment>
    )
  }
}

export default DSODetails