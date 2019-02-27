import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as Actions from './../actions'
import ConsumerListItem from './customer-list-item'
import { getQueryObj, getQueryUri } from "@utils/url-utils";
import Pagination from '@components/pagination'
import Loader from '@components/loader'
//import { dsoList } from './../constants/dso-list'
import PageHeader from '@components/pageheader'
import ConsumerComplaintsItem from "./consumer-complaints-item"

class ConsumerComplaints extends React.Component {
  constructor() {
    super()

    this.state = {
      activePage: 1,
      limit: 10,
      activeTab: 'consumer-complaints'
    }
    this.handlePageChange = this.handlePageChange.bind(this)
    this.handleClick = this.handleClick.bind(this)
    this.resetPagination = this.resetPagination.bind(this)
    this.setQueryParamas = this.setQueryParamas.bind(this)
    this.defaultData = this.defaultData.bind(this)
    this.setActiveTab = this.setActiveTab.bind(this)
  }

  componentDidMount() {
    if (location.search.length) {
      this.setQueryParamas()
    } else {
      this.defaultData()
    }
  }

  setActiveTab(activeTabName) {
    this.setState({ activeTab: activeTabName })
  }

  setQueryParamas() {
    const queryUri = location.search.slice(1)
    const queryObj = getQueryObj(queryUri)

    Object.entries(queryObj).forEach((item) => {
      this.setState({ [item[0]]: item[1] })
      // this.filter[item[0]] = item[1]
    })

    this.props.actions.fetchConsumerComplaints({
      limit: parseInt(queryObj.limit),
      offset: queryObj.limit * (queryObj.activePage - 1)
    })
  }

  defaultData() {
    this.props.actions.fetchConsumerComplaints({
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

    this.props.actions.fetchConsumerComplaints({
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
    const { activeTab } = this.state
    return (
      <Fragment>
        <PageHeader pageName="Consumer Complaints" />
        <div style={{display: 'flex', marginBottom: '20px'}}>
          <ul className="nav">
            <li 
              onClick={() => this.setActiveTab("consumer")} 
              className={`${activeTab === "consumers" ? 'active' : ''}`}
            >
              <a href="/home/consumers">Consumer Log</a>
            </li>
            <li 
              onClick={() => this.setActiveTab("consumer-complaints")} 
              className={`${activeTab === "consumer-complaints" ? 'active' : ''}`}
            >
              <a href="/home/consumer-complaints">Consumer Complaints</a>
            </li>
          </ul>
        </div>
        {
          !this.props.loadingCustomerComplaints && this.props.customerComplaints.length > 0 && 
          (
            <div style={{ margin: "10px 0" }}>
              <Pagination
                activePage={this.state.activePage}
                pageSize={this.state.limit}
                totalItemsCount={this.props.customerComplaintsCount}
                onChangePage={this.handlePageChange}
              />
            </div>
          )
        }
        <div style={{ width: '100%' }}>
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Time</th>
                <th>PhoneNumber</th>
                <th>Age</th>
                <th>City/Town</th>
                <th>Type</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              {
                !this.props.loadingCustomerComplaints &&
                this.props.customerComplaints &&
                this.props.customerComplaints.map((item,i) => {
                  return  <ConsumerComplaintsItem
                    //handleClick={this.handleClick}
                    key={i}
                    data={item}
                  />
                })
              }
              {
                this.props.loadingCustomerComplaints && 
                (
                  <tr>
                    <td colSpan="9">
                      <Loader />
                    </td>
                  </tr>
                )
              }
              {
                !this.props.loadingCustomerList &&
                this.props.customerComplaints.length === 0 && 
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

export default connect(mapStateToProps, mapDispatchToProps)(ConsumerComplaints)
