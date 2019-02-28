import React from "react"
import OutletDetail from "./outlet-detail"
import OutletAddressDetail from "./outlet-address-detail"
import OutletContactDetail from "./outlet-contact-detail"
import { connect } from 'react-redux'
import * as Actions from '../../actions'
import { bindActionCreators } from 'redux'
import Icon from "@components/icon"

class RetailerDetail extends React.Component {
  constructor() {
    super()
  }

  componentDidMount() {
    const { retailerId } = this.props.match.params
    this.props.actions.fetchRetailerDetails({
      retailer_id: retailerId
    })
    this.props.actions.fetchOutletList({
      limit: 10000,
      offset: 0,
      retailer_id: retailerId
    })
  }

  render() {
    const data = this.props.history.location.state
    return (
      <React.Fragment>
        <div 
          style={{
            display: 'flex', 
            marginBottom: '60px', 
            justifyContent: 'space-between', 
            alignItems: 'baseline'
          }}
        >
          <p 
            style={{
              fontSize: '22px',
              letterSpacing: '0.3px',
              color: '#152935'
            }}
          >
            {data.name}
          </p>
          <p>
            {data.is_active ? <Icon name="active-indicator" /> : <Icon name="expired" />}
            <span 
              style={{ 
                display: 'inline-block', 
                fontSize: '14px', 
                marginLeft: '5px', 
                marginBottom: '20px', 
                textTransform: 'uppercase' 
              }}
            >
              {data.is_active ? "Service Enabled" : "Service Disabled"}
            </span>
          </p>
        </div>
        <div 
          style={{
            background: '#f0f3f6',
            fontSize: '16px',
            lineHeight: '1.13',
            color: '#152935',
            padding: '20px 30px',
            border: '1px solid #dfe3e6'
          }}
        >
          BASIC INFORMATION
        </div>
        <div style={{display: 'flex'}}>
          <OutletDetail 
            // storeCode={data.code}
            storeCode=""
            licenseType={data.license_type}
            licenseStatus={data.license_status ? 'Active' : 'Inactive'}
            licenceValidity={data.license_expiry}
            // licenceValidity={data.licence_validity}
          />
          <OutletContactDetail
            outletsCount={data.number_of_outlets}
            // city={data.city}
            name={data.name}
            email={data.email}
            mobile={data.mobile_number}
          />
          <OutletAddressDetail
            address={data.primary_address}
            locations={data.locations}
          />
        </div>
        {
          !this.props.loadingOutletList &&
          this.props.outletList.length > 0 &&
          <React.Fragment>
          <div
            style={{
              background: '#f0f3f6',
              fontSize: '16px',
              lineHeight: '1.13',
              color: '#152935',
              padding: '20px 30px',
              border: '1px solid #dfe3e6',
              marginTop: '36px'
            }}
          >
            OUTLETS
          </div>
            <div>
              <table>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Date Issued</th>
                    <th>City/Town</th>
                    <th>Address</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    this.props.outletList.map(item => (
                      <tr key={item.outlet_code}>
                        <td>{ item.outlet_name }</td>
                        <td>{ item.city }</td>
                        <td>{ item.address }</td>
                        <td>{ item.outlet_code }</td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </React.Fragment>
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
)(RetailerDetail)
