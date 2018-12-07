import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import * as Actions from './../actions'
import { bindActionCreators } from 'redux'
import Order from './order'
import ConsumerDetail from './consumer-detail'
import RetailerDetail from './retailer-detail'
import DeliveryAgentDetail from './deliverer-detail'
import getIcon from '@components/getIcon'
import Button from '@components/button/index.js'
import ErrorBoundary from '@components/error-boundary'
import { mountModal } from '@components/ModalBox/utils'
import ShowGmap from './show-gmap'
import moment from 'moment'
import Loader from '@components/loader'
import '@sass/order-detail.scss'

function getTimeDiff(d2) {
  const d1 = new Date()
  return Math.round(
    (d1 - new Date(d2)) / 60000
  )
}
function Moment(time) {
  return {
    format: function(format) {
      return moment(time).format('MMM Do YY, h:mm a')
    }
  }
}


class OTTPDetail extends Component {
  constructor() {
    super()
    this.handleClick = this.handleClick.bind(this)
    this.openGmap = this.openGmap.bind(this)
    this.unmountOrderDetail = this.unmountOrderDetail.bind(this)
  }

  handleClick() {
    this.props.unmountOrderDetail()
  }

  openGmap() {
    const { ottpId } = this.props.match.params
    const { OTTPDetailData } = this.props
    mountModal(ShowGmap({
      id: ottpId,
      customerGps: OTTPDetailData.customer_gps,
      retailerGps: OTTPDetailData.store_gps
    }))
  }

  componentDidMount() {
    const { ottpId } = this.props.match.params
    this.props.actions.fetchOTTPDetail({
      ottp_id: ottpId
    })
  }

  unmountOrderDetail() {
    this.props.history.goBack()
    this.props.actions.setLoadingAll()
  }

  render() {
    const { actions, OTTPDetailData } = this.props

    return (
      <div className="order-detail__wrapper">
        {
          !this.props.loadingOTTPDetail
          ? <Fragment>
            <div className="order-detail__header">
              <div>
                <span onClick={this.unmountOrderDetail} style={{ marginRight: '20px', cursor: 'pointer' }}>{ getIcon('back') }</span>
                <span style={{ fontSize: '18px', color: '#687189' }}>OTTP ID: <b>{`#${this.props.match.params.ottpId}`}</b></span>
              </div>
              <div style={{ marginLeft: '38px', marginTop: '10px', position: 'relative' }}>
                <div style={{ display: 'inline-block', verticalAlign: 'bottom' }}>
                  <span
                    style={{
                      width: '30px',
                      height: '30px',
                      display: 'inline-block',
                      verticalAlign: 'middle',
                      marginRight: '10px'
                    }}>
                    { getIcon(OTTPDetailData.ottp_status) }
                  </span>
                  <span style={{
                      color: '#687189',
                      fontSize: '18px',
                      verticalAlign: 'middle',
                      marginRight: '20px',
                      textTransform: 'Capitalize'
                    }}>
                    {OTTPDetailData.ottp_status}
                  </span>
                  {
                    this.props.currentRoute !== 'history-ottp'
                    ? <Button onClick={this.openGmap} primary>Track OTTP</Button>
                    : ''
                  }
                </div>
                <div style={{
                  display: 'inline-block',
                  verticalAlign: 'bottom',
                  position: 'absolute',
                  left: '50%',
                  top: '-20px',
                  transform: 'translateX(-50%)'
                }}
                >
                  <div style={{ display: 'inline-block', verticalAlign: 'middle', marginRight: '40px' }}>
                    <label>OTTP expiry time</label>
                    <p style={{ color: '#333', fontSize: '13px' }}>{ Moment(OTTPDetailData.ottp_expiry_time).format("DD/MM/YYYY, h:mm") }</p>
                  </div>

                  <div style={{ display: 'inline-block', verticalAlign: 'middle', marginRight: '40px' }}>
                    <label>Company name</label>
                    <p style={{ color: '#333', fontSize: '13px' }}>{ OTTPDetailData.agency }</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="order-detail__body">
              <div style={{ width: 'calc(50% - 10px)', marginRight: '10px' }}>
                <ErrorBoundary>
                  <Order cartItems={OTTPDetailData.items} />
                </ErrorBoundary>
              </div>

              <div style={{ width: 'calc(50% - 10px)', marginLeft: '10px' }}>
                <div>
                  <ErrorBoundary>
                    <RetailerDetail
                      retailerAddress={OTTPDetailData.store_address}
                      retailerName={OTTPDetailData.retailer_name}
                    />
                  </ErrorBoundary>
                </div>
                <div style={{ margin: '20px 0' }}>
                  <ErrorBoundary>
                    <DeliveryAgentDetail
                      vehicleNumber={OTTPDetailData.vehicle_number}
                      deliveryAgentName={OTTPDetailData.agent_name}
                    />
                  </ErrorBoundary>
                </div>
                <div>
                  <ErrorBoundary>
                    <ConsumerDetail
                      customerAge={OTTPDetailData.customer_age}
                      customerAddress={OTTPDetailData.customer_address}
                    />
                  </ErrorBoundary>
                </div>
              </div>
            </div>
          </Fragment>
          : <Loader absolute />
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
