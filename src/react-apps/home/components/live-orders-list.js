import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
// import Pagination from 'react-js-pagination'
import * as Actions from './../actions'
import LiveOrdersListItem from './live-orders-list-item'
// import { mountModal, unMountModal } from '@components/ModalBox/utils'
// import ConfirmModal from '@components/ModalBox/ConfirmModal'
// import { getHasuraId } from './../utils'
// import Notes from './Notes'

class LiveOrdersList extends React.Component {
  constructor() {
    super()
    this.pagesLimit = 40
    this.state = {
      activePage: 1,
      pageOffset: 0
    }
    this.handlePageChange = this.handlePageChange.bind(this)
    this.handleClick = this.handleClick.bind(this)
    this.pollData = this.pollData.bind(this)
    this.openAssignOrderModal = this.openAssignOrderModal.bind(this)
    this.handleConfirmAssign = this.handleConfirmAssign.bind(this)
  }

  handleClick(orderId, e) {
    if (e.target.nodeName !== 'BUTTON') {
      this.props.mountOrderDetail(orderId)
    }
  }

  handlePageChange(pageNumber) {
    let offset = this.pagesLimit * (pageNumber - 1)
    this.setState({ activePage: pageNumber, pageOffset: offset })
    this.props.actions.fetchHistoryOrders({
      limit: this.pagesLimit,
      offset
    })
  }

  openAssignOrderModal(orderId) {
    // this.props.unmountOrderDetail()
    mountModal(ConfirmModal({
      heading: 'Assign order',
      confirmMessage: 'Are your sure you want to assign this order?',
      handleConfirm: () => { this.handleConfirmAssign(orderId) }
    }))
  }

  handleConfirmAssign(orderId) {
    const postData = {
      support_id: parseInt(getHasuraId()),
      order_id: orderId
    }
    this.props.actions.assignOrder(postData)
    unMountModal()
  }

  componentDidMount() {
    this.props.actions.fetchLiveOrders({
      limit: 40,
      offset: 0
    })
    //
    // this.pollData()
  }

  pollData() {
    this.props.actions.fetchLiveOrders({
      limit: 40,
      offset: 0
    })

    this.timeoutId = setTimeout(this.pollData, 30000)
  }

  componentWillUnmount() {
    clearTimeout(this.timeoutId)
  }

  render() {
    return (
      <Fragment>
        <div>
          <table>
            <thead>
              <tr>
                <td>OTTP Id</td>
                <td>OTTP generated at</td>
                <td>OTTP status</td>
                <td>Agent name</td>
                <td>Vehicle number</td>
                <td>Retailer</td>
              </tr>
            </thead>
            <tbody>
              {
                !this.props.loadingLiveOrders
                ? this.props.liveOrdersData.map(item => (
                  <LiveOrdersListItem
                    handleClick={this.handleClick}
                    handleOrderAssign={this.openAssignOrderModal}
                    handleShowNotes={this.handleShowNotes}
                    key={item.order_id}
                    data={item}
                  />
                ))
                : <tr className='loader2' />
              }
            </tbody>
          </table>
        </div>
        {/* {
          !this.props.loadingLiveOrders && this.props.liveOrdersData.length
          ? <Pagination
            activePage={this.state.activePage}
            itemsCountPerPage={this.pagesLimit}
            totalItemsCount={this.props.liveOrdersCount}
            pageRangeDisplayed={5}
            onChange={this.handlePageChange}
          />
          : ''
        } */}

      </Fragment>
    )
  }
}

const mapStateToProps = state => state.main

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(Actions, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(LiveOrdersList)
