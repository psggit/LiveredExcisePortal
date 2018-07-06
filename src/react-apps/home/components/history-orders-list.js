import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as Actions from './../actions'
import HistoryOrdersListItem from './history-orders-list-item'
// import Pagination from 'react-js-pagination'

class HistoryOrdersList extends React.Component {
  constructor() {
    super()
    this.pagesLimit = 40
    this.state = {
      activePage: 1,
      pageOffset: 0
    }
    this.handlePageChange = this.handlePageChange.bind(this)
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick(orderId) {
    this.props.history.push(`/home/history-ottp/${orderId}`)
  }

  handlePageChange(pageNumber) {
    const offset = this.pagesLimit * (pageNumber - 1)
    const { filters } = this.props
    this.setState({ activePage: pageNumber, pageOffset: offset })
    this.props.actions.fetchHistoryOTTP({
      limit: this.pagesLimit,
      offset,
      from_date: filters.from,
      to_date: filters.to,
      status: filters.status === 'all' ? undefined : filters.status
    })
  }

  componentDidMount() {
    const today = new Date()
    today.setUTCHours(0, 0, 0, 0)
    const tommorrow = new Date(today.getTime())
    tommorrow.setDate(tommorrow.getDate() + 1)
    tommorrow.setUTCHours(0, 0, 0, 0)

    this.props.actions.fetchHistoryOTTP({
      limit: 40,
      offset: 0,
      from_date: today,
      to_date: tommorrow
    })
  }

  componentDidUpdate(prevProps) {
    const { filters } = this.props
    if (JSON.stringify(prevProps.filters) !== JSON.stringify(filters)) {
      this.props.actions.fetchHistoryOTTP({
        limit: 40,
        offset: 0,
        from_date: filters.from,
        to_date: filters.to,
        status: filters.status === 'all' ? undefined : filters.status
      })
    }
  }

  render() {
    return (
      <Fragment>
        <div>
          <table>
            <thead>
              <tr>
                <th></th>
                <th>OTTP Id</th>
                <th>OTTP Generated at</th>
                <th>OTTP Status</th>
                <th>Agent name</th>
                <th>Vehicle number</th>
                <th>Retailer</th>
              </tr>
            </thead>
            <tbody>
              {
                !this.props.loadingHistoryOTTP
                ? this.props.historyOTTPData.map(item => (
                  <HistoryOrdersListItem
                    handleClick={this.handleClick}
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
          !this.props.loadingHistoryOrders && this.props.historyOrdersData.length
          ? <Pagination
            activePage={this.state.activePage}
            itemsCountPerPage={this.pagesLimit}
            totalItemsCount={this.props.historyOrdersCount}
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

export default connect(mapStateToProps, mapDispatchToProps)(HistoryOrdersList)
