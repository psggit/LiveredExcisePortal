import React from "react"
import LicenseDetails from "./license-details"
import HeadOfficeDetails from "./head-office-details"
import Icon from '@components/icon'
import RegionalOfficeDetails from './regional-office-details'
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
            <div style={{display: 'flex', marginBottom: '60px', alignItems: 'center', justifyContent: 'space-between'}}>
              <p 
                style={{
                  fontSize: '22px',
                  letterSpacing: '0.3px',
                  color: '#152935'
                }}
              >
                {data.dso_name}
              </p>
              <div style={{display: 'flex', alignItems: 'center'}}>
                <span style={{marginRight: '10px'}}>
                  <Icon name="active-indicator" />
                </span>
                <p>{data.is_active ? 'DELIVERY ENABLED' : 'DELIVERY DISABLED' }</p>
              </div>
            </div>
            <div style={headerStyle} >
              BASIC INFORMATION
            </div>
            <div style={{display: 'flex', marginBottom: '36px'}}>
              <LicenseDetails 
                status={data.is_validated}
                dateOfValidation={data.validation_date}
                locationsIn={data.locations}
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