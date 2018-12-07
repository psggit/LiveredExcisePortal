import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import * as Actions from './../actions'
import { bindActionCreators } from 'redux'
import DSOBasicInfo from './dso-basic-info'
import DSOOtherInfo from './dso-other-info'
import getIcon from '@components/getIcon'
import Button from '@components/button/index.js'
import ErrorBoundary from '@components/error-boundary'
import { mountModal } from '@components/ModalBox/utils'
import ShowGmap from './show-gmap'
import moment from 'moment'
import Loader from '@components/loader'
import '@sass/order-detail.scss'
import { getQueryObj } from '@utils/url-utils'
import Toggle from '@components/toggle'
import DSOCarriersList from './dso-carriers'

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
    const { dsoId } = this.props.match.params
    // this.props.actions.fetchOTTPDetail({
    //   ottp_id: dsoId
    // })
  }

  unmountOrderDetail() {
    this.props.history.goBack()
    this.props.actions.setLoadingAll()
  }

  render() {
    const { actions, OTTPDetailData } = this.props
    console.log(this.props.location.state);
    return (
      <div className="order-detail__wrapper">
        {
          this.props.loadingOTTPDetail
          ? <Fragment>
            <div className="order-detail__header">
              <div>
                <span onClick={this.unmountOrderDetail} style={{ marginRight: '20px', cursor: 'pointer' }}>{ getIcon('back') }</span>
                <span style={{ fontSize: '18px', color: '#687189' }}>DSO Name: <b>{`${this.props.location.state.name}`}</b></span>
              </div>
              <div style={{ marginLeft: '38px', marginTop: '10px', position: 'relative' }}>
                <div style={{ display: 'flex' }}>
                  {
                    this.props.location.state.status === 'Application Recieved'
                    ? (
                      <React.Fragment>
                        <Button style={{ marginRight: '20px' }} onClick={this.openGmap} primary>Accept Application</Button>
                        <Button onClick={this.openGmap} danger>Reject Application</Button>
                      </React.Fragment>
                    )
                    : (
                      <div style={{ marginTop: '10px' }}>
                        <Toggle isToggled={this.props.location.state.status === 'Authorized'} />
                        {
                          this.props.location.state.status === 'Authorized'
                          ? <span style={{ color: '#6D788F', marginLeft: '20px' }}>DSO Activated for Delivery Service</span>
                          : <span style={{ color: '#6D788F', marginLeft: '20px' }}>DSO Deactivated for Delivery Service</span>
                        }
                      </div>
                    )
                  }
                </div>
              </div>
            </div>

            <div style={this.props.location.state.status === 'Application Recieved' ? { display: 'block' } : {}} className="order-detail__body">
              {
                this.props.location.state.status !== 'Application Recieved'
                ? (
                  <React.Fragment>
                    <div style={{ width: 'calc(50% - 10px)', marginRight: '10px' }}>
                      <ErrorBoundary>
                        <DSOBasicInfo name={this.props.location.state.name} />
                      </ErrorBoundary>
                    </div>

                    <div style={{ width: 'calc(50% - 10px)', marginLeft: '10px' }}>
                      <div>
                        <ErrorBoundary>
                          <DSOOtherInfo />
                        </ErrorBoundary>
                      </div>
                    </div>
                  </React.Fragment>
                )
                : (
                  <React.Fragment>
                    <DSOCarriersList />
                  </React.Fragment>
                )
              }
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
