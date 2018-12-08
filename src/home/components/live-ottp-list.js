import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Pagination from 'react-js-pagination'
import * as Actions from './../actions'
import LiveOrdersListItem from './live-ottp-list-item'
import Loader from '@components/loader'
import '@sass/_pagination.scss'
import Button from '@components/button'


class LiveOrdersList extends React.Component {
  constructor() {
    super()
    this.pagesLimit = 10
    this.state = {
      activePage: 1,
      pageOffset: 0
    }
    this.handlePageChange = this.handlePageChange.bind(this)
    this.handleClick = this.handleClick.bind(this)
    this.defaultData = this.defaultData.bind(this)
    this.filteredData = this.filteredData.bind(this)
    this.resetPagination = this.resetPagination.bind(this)
  }

  handleClick(orderId, e) {
    this.props.history.push(`/home/live-ottp/${orderId}`)
  }

  fetchData() {
    this.props.actions.fetchInProgressOTTP({
      limit: this.pagesLimit,
      offset,
      status: filters.status === 'all' ? undefined : filters.status
    })
  }

  handlePageChange(pageNumber) {
    clearTimeout(this.timeoutId)
    const offset = this.pagesLimit * (pageNumber - 1)
    const { filters } = this.props
    this.setState({ activePage: pageNumber, pageOffset: offset })
    this.props.actions.fetchInProgressOTTP({
      limit: this.pagesLimit,
      offset,
      status: filters.status === 'all' ? undefined : filters.status
    })
  }

  resetPagination() {
    this.setState({ activePage: 1 })
  }

  componentDidMount() {
    console.log("props", this.props)
    // this.defaultData()
  }

  defaultData() {
    const queryUri = location.search.slice(1).split('=')
    const status = queryUri[1]
    this.props.actions.fetchInProgressOTTP({
      limit: this.pagesLimit,
      offset: 0,
      status: status === 'all' ? undefined : status
    })

    this.timeoutId = setTimeout(this.defaultData, 30000)
  }

  filteredData() {
    this.props.actions.fetchInProgressOTTP({
      limit: this.pagesLimit,
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
      this.resetPagination()
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
                : (
                  <tr>
                    <td colSpan="6">
                      <Loader />
                    </td>
                  </tr>
                )
              }
              {
                !this.props.loadingInProgressOTTP && !this.props.inProgressOTTP.length &&
                <tr>
                  <td style={{ textAlign: 'center' }} colSpan="6">
                    No records found
                  </td>
                </tr>
              }
            </tbody>
          </table>
        </div>
        {
          !this.props.loadingInProgressOTTP && this.props.inProgressOTTP.length
          ? <Pagination
            activePage={this.state.activePage}
            itemsCountPerPage={this.pagesLimit}
            totalItemsCount={this.props.inProgressCount}
            pageRangeDisplayed={5}
            onChange={this.handlePageChange}
          />
          : ''
        }
      </Fragment>
    )
  }
}

const mapStateToProps = state => state.main

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(Actions, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(LiveOrdersList)
