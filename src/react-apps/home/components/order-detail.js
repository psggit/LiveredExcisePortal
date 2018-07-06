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
// import Notes from './Notes'
// import ShowGmap from './ShowGmap'
import moment from 'moment'
// import { getHasuraId, getIcon } from './../utils'
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


class OrderDetail extends Component {
  constructor() {
    super()
    this.handleClick = this.handleClick.bind(this)
    this.openGmap = this.openGmap.bind(this)
    this.handleRefersh = this.handleRefersh.bind(this)
    this.unmountOrderDetail = this.unmountOrderDetail.bind(this)
  }

  handleClick() {
    this.props.unmountOrderDetail()
  }

  openGmap() {
    const { order, retailer, deliverer, customer, plotData, actions, ordersType } = this.props
    mountModal(ShowGmap({
      id: order.id,
      ordersType,
      actions,
      retailer,
      deliverer,
      customer,
      plotData
    }))
  }

  componentDidMount() {
    const { orderId } = this.props.match.params
    this.props.actions.fetchOTTPDetail({
      ottp_id: orderId
    })
  }

  componentWillUnmount() {
    // this.props.actions.setLoading('loadingOrderDetail')
  }

  unmountOrderDetail() {
    this.props.history.push('/home/history-orders')
  }

  handleRefersh() {
    const { actions, currentOrderId } = this.props
    actions.setLoading('loadingOrderDetail')
    actions.fetchOrderDetail(currentOrderId)
  }

  render() {
    const delivererStatus = 'confirmed'

    // const isOrderConfirmed = false
    // const supportId = parseInt(getHasuraId())
    // console.log(supportId, order.assignedToId);
    // const isOrderAssigned = supportId == order.assignedToId

    const { actions, OTTPDetailData } = this.props

    // if (order) {
      // const orderChar = order.status.split('::')[0]
      // const formula = order.status.split('::')[1]
      // const article = order.status.split('::')[2]
      //
      // const dp_delivered_time = order.deliveredTime
      // const dp_reached_to_consumer_time = deliverer.reachedToConsumerTime
      // const cancellation_time = order.cancellationTime
      // const cancelled_time = order.cancelledTime
      // const orderPlacedTime = order.orderPlacedTime
      // const cancellation_return_time = order.cancellationReturnTime
      // const dp_picked_up_time = order.pickedUpTime
      // const dp_notified_time = deliverer.notifiedTime
      // const dp_arrived_at_store_time = deliverer.arrivedAtStoreTime
      // const dp_accepted_time = deliverer.acceptedTime
      // const dp_confirmation_time = deliverer.confirmationTime
    // }

    // if (retailer) {
      // const retailer_accepted_time = retailer.confirmationTime
      // const retailer_notified_time = retailer.notifiedTime
    // }

    return (
      <div className="order-detail__wrapper">
        {
          !this.props.loadingOTTPDetail &&
          <Fragment>
            <div className="order-detail__header">
              <div>
                <span onClick={this.unmountOrderDetail} style={{ marginRight: '20px', cursor: 'pointer' }}>{ getIcon('back') }</span>
                <span style={{ fontSize: '18px', color: '#687189' }}>OTTP ID: <b>{`#${this.props.match.params.orderId}`}</b></span>
              </div>
              <div style={{ marginLeft: '38px', marginTop: '10px' }}>
                <span
                  style={{
                    width: '30px',
                    height: '30px',
                    display: 'inline-block',
                    verticalAlign: 'middle',
                    marginRight: '10px'
                  }}>
                  { getIcon('en-route') }
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
                <Button primary>Track OTTP</Button>
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
                    <RetailerDetail retailerName={OTTPDetailData.retailer_name} />
                  </ErrorBoundary>
                </div>
                <div style={{ margin: '20px 0' }}>
                  <ErrorBoundary>
                    <DeliveryAgentDetail deliveryAgentName={OTTPDetailData.agent_name} />
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
)(OrderDetail)
