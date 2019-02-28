import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as Actions from './../actions'
import RetailersListItem from './retailer-list-item'
import Pagination from '@components/pagination'
import Search from '@components/search'
import PageHeader from '@components/pageheader'
import Loader from "@components/loader"
import Icon from "@components/icon"
//import { retailersList } from './../constants/retailers-list'

class RetailersList extends React.Component {
  constructor() {
    super()
    this.state = {
      activePage: 1,
      limit: 10
    }
    this.state_short_name = "TN"
    this.handlePageChange = this.handlePageChange.bind(this)
    this.handleClick = this.handleClick.bind(this)
    this.resetPagination = this.resetPagination.bind(this)
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
      // this.filter[item[0]] = item[1]
    })

    this.props.actions.fetchRetailerList({
      limit: parseInt(queryObj.limit),
      offset: queryObj.limit * (queryObj.activePage - 1),
      state_short_name: this.state_short_name
    })
  }

  defaultData() {
    this.props.actions.fetchRetailerList({
      limit: this.state.limit,
      offset: 0,
      state_short_name: this.state_short_name
    })
  }

  handleClick(dataObj) {
    console.log("props in retaier", dataObj)
    this.props.history.push(`/home/retailers/${dataObj.retailer_id}`, dataObj)
  }

  handlePageChange(pagerObj) {
    this.props.actions.setLoadingAll()
    const offset = pagerObj.pageSize * (pagerObj.activePage - 1)

    this.setState({
      activePage: pagerObj.activePage,
      limit: pagerObj.pageSize
    })

    this.props.actions.fetchRetailerList({
      limit: pagerObj.pageSize,
      offset,
      state_short_name: this.state_short_name
    })

    const queryParamsObj = {
      activePage: pagerObj.activePage,
      limit: pagerObj.pageSize
    }

    history.pushState(
      queryParamsObj,
      "retailers listing",
      `/home/retailers?${getQueryUri(queryParamsObj)}`
    )
  }

  resetPagination() {
    this.setState({ activePage: 1 })
  }

  render() {
    return (
      <Fragment>
        <PageHeader pageName="Retailers" />
        {
          !this.props.loadingRetailerList && this.props.retailerList.length > 1 &&
          (
            <div style={{ margin: "10px 0" }}>
              <Pagination
                activePage={this.state.activePage}
                pageSize={this.state.limit}
                totalItemsCount={this.props.retailerListCount}
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
                <th>City/Town</th>
                <th>Address</th>
                {/* <th>License Type</th>
                <th>License Status</th>
                <th>Service Status</th> */}
                <th>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center"
                    }}
                  >
                    <span style={{ marginRight: "5px" }}>License Type</span>
                    <span className="info" style={{ position: "relative" }}>
                      <Icon name="info" />
                      <span className="tooltip-text">
                        Type of license acquired by Authorized Retailer
                      </span>
                    </span>
                  </div>
                </th>
                <th>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center"
                    }}
                  >
                    <span style={{ marginRight: "5px" }}>License Status</span>
                    <span className="info" style={{ position: "relative" }}>
                      <Icon name="info" />
                      <span className="tooltip-text">
                        Current status of Retailer’s license 
                      </span>
                    </span>
                  </div>
                </th>
                <th>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center"
                    }}
                  >
                    <span style={{ marginRight: "5px" }}>Service Status</span>
                    <span className="info" style={{ position: "relative" }}>
                      <Icon name="info" />
                      <span className="tooltip-text">
                        Current status of Retailer if their service is enabled or disabled
                      </span>
                    </span>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              {
                !this.props.loadingRetailerList &&
                this.props.retailerList &&
                this.props.retailerList.map(item => (
                  <RetailersListItem
                    handleClick={this.handleClick}
                    key={item.retailer_id}
                    data={item}
                  />
                ))
              }
              {this.props.loadingRetailerList && (
                <tr>
                  <td colSpan="8">
                    <Loader />
                  </td>
                </tr>
              )}
              {!this.props.loadingRetailerList &&
                this.props.retailerList.length === 0 && (
                <tr>
                  <td style={{ textAlign: "center" }} colSpan="8">
                    No retailers found
                  </td>
                </tr>
              )}
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

export default connect(mapStateToProps, mapDispatchToProps)(RetailersList)
