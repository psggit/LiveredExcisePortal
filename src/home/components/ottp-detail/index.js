import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import * as Actions from '../../actions'
import { bindActionCreators } from 'redux'
import OttpDetailDSO from './dso'
import Order from '../order'
import ConsumerDetail from '../consumer-detail'
import RetailerDetail from '../retailer-detail'
import DeliveryAgentDetail from '../deliverer-detail'
import getIcon from '@components/getIcon'
import Button from '@components/button/index.js'
import ErrorBoundary from '@components/error-boundary'
import { mountModal } from '@components/ModalBox/utils'
import ShowGmap from '../show-gmap'
import moment from 'moment'
import Loader from '@components/loader'
import '@sass/order-detail.scss'
import Icon from '@components/icon'
import OttpDetailCustomer from './customer';
import OttpDetailDeliveryAgent from './delivery-agent';
import OttpDetailOrder from './order';

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
    console.log("props", this.props.history)
    const data = this.props.history.location.state
    return (
     <div>
     {/* <p style={{ position: 'relative', top: '-30px', fontSize: '14px'  }}>Back to Live Orders</p> */}
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div>
          <p style={{ fontSize: '12px', marginBottom: '5px' }}>PERMIT ID</p>
          <h3 style={{ color: '#3d70b2', borderBottom: '2px solid #3d70b2' }}>{ data.ottp_info.ottp_id }</h3>
        </div>

        <div>
          {data.ottp_info.ottp_status === "closed" ? <Icon name="expired" /> : <Icon name="active-indicator" /> }
          <span style={{ display: 'inline-block', fontSize: '14px', marginLeft: '5px', marginBottom: '20px' }}>{ data.ottp_info.ottp_status }</span>
          <p style={{ fontSize: '12px' }}>
            Issued on { moment(data.ottp_info.issued_at).format("DD/MM/YYYY") } at { moment(data.ottp_info.issued_at).format("h:mm A") } 
          </p>
          <p style={{ fontSize: '12px', textAlign: 'right' }}>
            Expired on { moment(data.ottp_info.expiry_at).format("DD/MM/YYYY") } at { moment(data.ottp_info.expiry_at).format("h:mm A") } 
          </p>
        </div>
       </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', marginTop: '27px' }}>
        <OttpDetailDSO 
          name={data.dso.name}
          address={data.dso.address}
        />
        <OttpDetailCustomer 
          age={data.consumer.age}
          address={data.consumer.address}
          phone={data.consumer.phone}  
        />
        <OttpDetailDeliveryAgent 
          age={data.delivery_agent.age}
          name={data.delivery_agent.name}
          phone={data.delivery_agent.phone_number}  
          vehicleLicenseNo={data.delivery_agent.license_number}
          driverLicenseNo={data.delivery_agent.vehicle_number}
        />
        <OttpDetailOrder 
          order={data.order}
        />
      </div>

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
