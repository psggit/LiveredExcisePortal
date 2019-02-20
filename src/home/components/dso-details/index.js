import React from "react"
import LicenseDetails from "./license-details"
import HeadOfficeDetails from "./head-office-details"
import RegionalOfficeDetails from './regional-office-details'
import { connect } from 'react-redux'
import * as Actions from '../../actions'
import { bindActionCreators } from 'redux'

class DSODetails extends React.Component {
  constructor() {
    super()
  }

  componentDidMount() {
    const { dsoId } = this.props.match.params
    this.props.actions.fetchDSODetails({
      id: dsoId
    })
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
    const data = this.props.DSODetail
    return (
      <React.Fragment>
        {
          !this.props.loadingDSODetail &&
          <div>
            <div style={{display: 'flex', marginBottom: '60px'}}>
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
                //type={data.license_type}
                type={""}
                //status={data.is_active ? 'Active' :  'Inactive'}
                status={""}
                //validity={data.license_validity}
                validity={""}
                //locationsIn={data.locations_in}
                locationsIn={""}
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
            <div style={{display: 'flex', background: '#fff', width: '100%'}}>
              <div>
                
              </div>
              <div>
                
              </div>
            </div> */}
          </div>
        }
      </React.Fragment>
    )
  }
}

// export default DSODetails

const mapStateToProps = state => state.main

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(Actions, dispatch)
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DSODetails)