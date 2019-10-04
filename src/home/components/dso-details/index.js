import React from "react"
import LicenseDetails from "./license-details"
import HeadOfficeDetails from "./head-office-details"
import Icon from '@components/icon'
import HeadOfficeContactDetails from './head-office-contact-details'
import LocationAndRegionalDetails from "./location-details"
import { connect } from 'react-redux'
import * as Actions from '../../actions'
import { bindActionCreators } from 'redux'

class DSODetails extends React.Component {
  constructor() {
    super()

    this.fetchDsoDetails = this.fetchDsoDetails.bind(this)
  }

  componentDidMount() {
    this.fetchDsoDetails()
  }

  /**
   * Fetches dso details of given dso_id
   */
  fetchDsoDetails() {
    const { dsoId } = this.props.match.params
    this.props.actions.fetchDSODetails({
      dso_id: dsoId
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
            <div style={{ marginBottom: '60px' }}>
              <p
                style={{
                  fontSize: '22px',
                  letterSpacing: '0.3px',
                  color: '#152935'
                }}
              >
                {data.dso_name}
              </p>
              {/* <div style={{ display: 'flex', alignItems: 'center' }}>
                <span style={{ marginRight: '5px', display: 'flex' }}>
                  <Icon name="active-indicator" />
                </span>
                <span>{data.is_active ? 'DELIVERY ENABLED' : 'DELIVERY DISABLED'}</span>
              </div> */}
            </div>
            <div style={headerStyle}>
              BASIC INFORMATION
            </div>
            <div style={{ background: '#fff', padding: '20px 30px' }}>
              <div style={{ display: 'flex', marginBottom: '20px' }}>
                <LicenseDetails
                  licenseType={data.license_type}
                  licenseStatus={data.license_status}
                  licenseExpiry={data.license_expiry}
                />
                <HeadOfficeDetails
                  city={data.head_office.city}
                  address={data.head_office.address}
                />
                <HeadOfficeContactDetails
                  name={data.head_office.contact.name}
                  email={data.head_office.contact.email}
                  mobile={data.head_office.reg_office_contact_phone}
                />
              </div>
              <LocationAndRegionalDetails locations={data.state_details} />
            </div>
          </div>
        }
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => state.main

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(Actions, dispatch)
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DSODetails)