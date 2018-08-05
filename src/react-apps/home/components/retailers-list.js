import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as Actions from './../actions'
import RetailersListItem from './retailer-list-item'
import Pagination from 'react-js-pagination'
import '@sass/_pagination.scss'
import Loader from '@components/loader'
import { retailersList } from './../constants/retailers-list'

class RetailersList extends React.Component {
  constructor() {
    super()
    this.pagesLimit = 10
    this.state = {
      activePage: 1,
      pageOffset: 0
    }
    this.handlePageChange = this.handlePageChange.bind(this)
    this.handleClick = this.handleClick.bind(this)
    this.resetPagination = this.resetPagination.bind(this)
  }

  handleClick(id, name, status) {
    this.props.history.push(`/home/retailers/${id}`, { name, status })
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

  resetPagination() {
    this.setState({ activePage: 1 })
  }

  componentDidMount() {
    const queryUri = location.search.slice(1)
    let today = new Date()
    today.setUTCHours(0, 0, 0, 0)
    let tommorrow = new Date(today.getTime())
    tommorrow.setDate(tommorrow.getDate() + 1)
    tommorrow.setUTCHours(0, 0, 0, 0)

    const queryObj = {}

    queryUri.split('&')
    .map(item => item.split('='))
    .forEach(([key, value]) => {
      queryObj[key] = value
    })


    this.props.actions.fetchInProgressOTTP({
      limit: this.pagesLimit,
      offset: 0,
      from_date: queryObj.from_date || today,
      to_date: queryObj.to_date || tommorrow,
      status: queryObj.status === 'all' ? undefined : queryObj.status
    })
  }

  componentDidUpdate(prevProps) {
    const { filters } = this.props
    if (JSON.stringify(prevProps.filters) !== JSON.stringify(filters)) {
      this.props.actions.setLoadingAll()
      this.resetPagination()
      this.props.actions.fetchInProgressOTTP({
        limit: this.pagesLimit,
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
        <div style={{ width: '100%' }}>
          <table>
            <thead>
              <tr>
                <th>Retailer Name</th>
                {/* <th>Application status</th> */}
                <th>KSBCL Code</th>
                <th>Licence holder</th>
                <th>Licence no.</th>
                <th>Licence validity</th>
                <th>Locality</th>
                <th>Jurisdiction</th>
              </tr>
            </thead>
            <tbody>
              {
                retailersList.map(item => (
                  <RetailersListItem
                    handleClick={this.handleClick}
                    key={item.id}
                    data={item}
                  />
                ))
              }
              {/* {
                !this.props.loadingInProgressOTTP && !this.props.inProgressOTTP.length &&
                <tr>
                  <td style={{ textAlign: 'center' }} colSpan='7'>
                    No records found
                  </td>
                </tr>
              } */}
            </tbody>
          </table>
        </div>
        <Pagination
          activePage={this.state.activePage}
          itemsCountPerPage={this.pagesLimit}
          totalItemsCount={retailersList.length}
          pageRangeDisplayed={5}
          onChange={this.handlePageChange}
        />

      </Fragment>
    )
  }
}

const mapStateToProps = state => state.main

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(Actions, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(RetailersList)
