import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
// import Pagination from 'react-js-pagination'
import * as Actions from './../actions'
import LiveOrdersListItem from './live-orders-list-item'
import Loader from '@components/loader'

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
    this.openAssignOrderModal = this.openAssignOrderModal.bind(this)
    this.handleConfirmAssign = this.handleConfirmAssign.bind(this)
    this.defaultData = this.defaultData.bind(this)
    this.filteredData = this.filteredData.bind(this)
  }

  handleClick(orderId, e) {
    this.props.history.push(`/home/live-ottp/${orderId}`)
  }

  handlePageChange(pageNumber) {
    const offset = this.pagesLimit * (pageNumber - 1)
    const { filters } = this.props
    this.setState({ activePage: pageNumber, pageOffset: offset })
    this.props.actions.fetchHistoryOrders({
      limit: this.pagesLimit,
      offset,
      status: filters.status === 'all' ? undefined : filters.status
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
    this.defaultData()
  }

  defaultData() {
    this.props.actions.fetchInProgressOTTP({
      limit: 40,
      offset: 0
    })

    this.timeoutId = setTimeout(this.defaultData, 30000)
  }

  filteredData() {
    this.props.actions.fetchInProgressOTTP({
      limit: 40,
      offset: 0,
      status: this.filters.status === 'all' ? undefined : this.filters.status
    })

    this.timeoutId = setTimeout(this.filteredData, 30000)
  }

  componentDidUpdate(prevProps) {
    const { filters } = this.props
    this.filters = Object.assign({}, filters)
    if (filters && JSON.stringify(prevProps.filters) !== JSON.stringify(filters)) {
      this.props.actions.setLoadingAll()
      clearTimeout(this.timeoutId)
      this.filteredData()
    }
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
                <th>OTTP Id</th>
                <th>OTTP generated at</th>
                <th>OTTP status</th>
                <th>Agent name</th>
                <th>Vehicle number</th>
                <th>Retailer</th>
              </tr>
            </thead>
            <tbody>
              {
                !this.props.loadingInProgressOTTP
                ? this.props.inProgressOTTP.map(item => (
                  <LiveOrdersListItem
                    handleClick={this.handleClick}
                    handleOrderAssign={this.openAssignOrderModal}
                    handleShowNotes={this.handleShowNotes}
                    key={item.ottp_id}
                    data={item}
                  />
                ))
                : <Loader />
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
