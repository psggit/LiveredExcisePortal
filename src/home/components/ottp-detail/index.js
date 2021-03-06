import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import * as Actions from '../../actions'
import { bindActionCreators } from 'redux'
import OttpDetailDSO from './dso'
import { mountModal } from '@components/ModalBox/utils'
import moment from 'moment'
import '@sass/order-detail.scss'
import Icon from '@components/icon'
import OttpDetailCustomer from './customer'
import OttpDetailDeliveryAgent from './delivery-agent'
import OttpDetailOrder from './order'

class OTTPDetail extends Component {
  constructor() {
    super()
    this.fetchOrderDetails = this.fetchOrderDetails.bind(this)
    // this.openGmap = this.openGmap.bind(this)
    // this.unmountOrderDetail = this.unmountOrderDetail.bind(this)
  }

  componentDidMount() {
    this.fetchOrderDetails()
  }

  /**
   * Fetches live/past orders details of given ottpId
   */
  fetchOrderDetails() {
    const { ottpId } = this.props.match.params
    this.props.actions.setLoading('loadingOTTPDetail')
    this.props.actions.fetchOTTPDetail({
      ottp_info: {
        ottp_id: ottpId
      }
    })
  }

  render() {
    const data = this.props.OTTPDetailData
    console.log("data", data)
    return (
      <div>
        {
          !this.props.loadingOTTPDetail &&
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <div>
                <p style={{ fontSize: '12px', marginBottom: '5px' }}>PERMIT ID</p>
                <h3 style={{ color: '#3d70b2', borderBottom: '2px solid #3d70b2' }}>{data.ottp_info.ottp_id}</h3>
              </div>
              <div>
                {data.ottp_info.status === "closed" ? <Icon name="expired" /> : <Icon name="active-indicator" />}
                <span style={{ display: 'inline-block', fontSize: '14px', marginLeft: '5px', marginBottom: '20px', textTransform: 'uppercase' }}>{data.ottp_info.status}</span>
                <p style={{ fontSize: '12px' }}>
                  Issued on {moment(data.ottp_info.issued_at).format("DD/MM/YYYY")} at {moment(data.ottp_info.issued_at).format("h:mm A")}
                </p>
                {
                  location.pathname.includes("live-orders")
                    ? <p style={{ fontSize: '12px', textAlign: 'left' }}>
                      Valid till {moment(data.ottp_info.expiry_at).format("DD/MM/YYYY")} at {moment(data.ottp_info.expiry_at).format("h:mm A")}
                    </p>
                    : <p style={{ fontSize: '12px', textAlign: 'left' }}>
                      Expired on {moment(data.ottp_info.expiry_at).format("DD/MM/YYYY")} at {moment(data.ottp_info.expiry_at).format("h:mm A")}
                    </p>
                }
              </div>
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', marginTop: '27px' }}>
              <OttpDetailDSO
                name={data.dso.name}
                address={data.retailer.address}
              />
              <OttpDetailCustomer
                age={data.consumer.age}
                address={data.consumer.address}
                phone={data.consumer.phone}
                name={data.consumer.name}
                verifiedDocs={data.consumer.verification_doc_type}
              />
              <OttpDetailDeliveryAgent
                age={data.delivery_agent.age}
                name={data.delivery_agent.name}
                phone={data.delivery_agent.phone_number}
                vehicleLicenseNo={data.delivery_agent.vehicle_number}
                driverLicenseNo={data.delivery_agent.license_number}
                verifiedDoc={data.delivery_agent.verification_doc}
              />
              <OttpDetailOrder
                order={data.order}
              />
            </div>
          </div>
        }
      </div>
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
)(OTTPDetail)
