import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as Actions from './../actions'
import DSOListItem from './dso-list-item'
import { getQueryObj, getQueryUri } from "@utils/url-utils";
import Pagination from '@components/pagination'
import Loader from '@components/loader'
//import { dsoList } from './../constants/dso-list'
import PageHeader from '@components/pageheader'

class DSOList extends React.Component {
  constructor() {
    super()

    this.state = {
      activePage: 1,
      limit: 10
    }
    this.handlePageChange = this.handlePageChange.bind(this)
    this.handleClick = this.handleClick.bind(this)
    this.resetPagination = this.resetPagination.bind(this)
    this.setQueryParamas = this.setQueryParamas.bind(this)
    this.defaultData = this.defaultData.bind(this)
  }

  componentDidMount() {
    if (location.search.length) {
      this.setQueryParamas()
    } else {
      this.defaultData()
    }
  }

  setQueryParamas() {
    const queryUri = location.search.slice(1)
    const queryObj = getQueryObj(queryUri)

    Object.entries(queryObj).forEach((item) => {
      this.setState({ [item[0]]: item[1] })
    })

    this.props.actions.fetchDSOList({
      limit: parseInt(queryObj.limit),
      offset: queryObj.limit * (queryObj.activePage - 1)
    })
  }

  defaultData() {
    this.props.actions.fetchDSOList({
      limit: this.state.limit,
      offset: 0
    })
  }

  handleClick(dataObj) {
    this.props.history.push(`/home/delivery-operators/${dataObj.id}`, dataObj)
  }

  handlePageChange(pagerObj) {
    this.props.actions.setLoadingAll()
    const offset = pagerObj.pageSize * (pagerObj.activePage - 1)

    this.setState({
      activePage: pagerObj.activePage,
      limit: pagerObj.pageSize
    })

    this.props.actions.fetchDSOList({
      limit: pagerObj.pageSize,
      offset
    })

    const queryParamsObj = {
      activePage: pagerObj.activePage,
      limit: pagerObj.pageSize
    }

    history.pushState(
      queryParamsObj,
      "past orders listing",
      `/home/delivery-operators?${getQueryUri(queryParamsObj)}`
    )
  }

  resetPagination() {
    this.setState({ activePage: 1 })
  }

  render() {
    return (
      <Fragment>
        <PageHeader pageName="Delivery Service Operators" />
        {
          !this.props.loadingDSOList && this.props.DSOList.length > 1 && 
          (
            <div style={{ margin: "10px 0" }}>
              <Pagination
                activePage={this.state.activePage}
                pageSize={this.state.limit}
                totalItemsCount={this.props.DSOListCount}
                onChangePage={this.handlePageChange}
              />
            </div>
          )
        }
        <div style={{ width: '100%' }}>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Head Quaters</th>
                <th>Location Servicable</th>
                <th>License Type</th>
                <th>License Status</th>
              </tr>
            </thead>
            <tbody>
              {
                !this.props.loadingDSOList &&
                this.props.DSOList &&
                this.props.DSOList.map(item => (
                  <DSOListItem
                    handleClick={this.handleClick}
                    key={item.id}
                    data={item}
                  />
                ))
              }
              {
                this.props.loadingDSOList && 
                (
                  <tr>
                    <td colSpan="9">
                      <Loader />
                    </td>
                  </tr>
                )
              }
              {
                !this.props.loadingDSOList &&
                this.props.DSOList.length === 0 && 
                (
                  <tr>
                    <td style={{ textAlign: "center" }} colSpan="9">
                      No orders found
                    </td>
                  </tr>
                )
              }
            </tbody>
          </table>
        </div>
      </Fragment>
    )
  }
}

const mapStateToProps = state => state.main

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(Actions, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(DSOList)
