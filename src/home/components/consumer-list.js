// import React from "react"
// import { connect } from 'react-redux'
// import { bindActionCreators } from 'redux'
// import * as Actions from './../actions'
// // import DSOListItem from './dso-list-item'
// import { getQueryObj, getQueryUri } from "@utils/url-utils";
// import Pagination from '@components/pagination'

// class ConsumerManagement extends React.Component {
//   constructor() {
//     super()
//   }

//   render() {
//     return (
//       <div>Consumer</div>
      
//     )
//   }
// }

// export default ConsumerManagement

import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as Actions from './../actions'
import ConsumerListItem from './customer-list-item'
import { getQueryObj, getQueryUri } from "@utils/url-utils";
import Pagination from '@components/pagination'
import '@sass/_pagination.scss'
import Loader from '@components/loader'
//import { dsoList } from './../constants/dso-list'
import Search from '@components/search'
import Icon from '@components/icon'
import Button from '@components/button'
import PageHeader from '@components/pageheader'

class ConsumerManagement extends React.Component {
  constructor() {
    super()

    this.state = {
      activePage: 1,
      limit: 10,
      activeTab: 'consumers'
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
      this.setQueryParamas();
    } else {
      this.defaultData();
    }
  }

  setQueryParamas() {
    const queryUri = location.search.slice(1);
    const queryObj = getQueryObj(queryUri);

    Object.entries(queryObj).forEach((item) => {
      this.setState({ [item[0]]: item[1] });
      // this.filter[item[0]] = item[1]
    });

    this.props.actions.fetchDSOList({
      limit: parseInt(queryObj.limit),
      offset: queryObj.limit * (queryObj.activePage - 1)
    });
  }

  defaultData() {
    this.props.actions.fetchConsumerList({
      limit: this.state.limit,
      offset: 0
    });
  }

  handleClick(dataObj) {
    this.props.history.push(`/home/delivery-operators/${dataObj.id}`, dataObj)
  }

  handlePageChange(pagerObj) {
    this.props.actions.setLoadingAll();
    const offset = pagerObj.pageSize * (pagerObj.activePage - 1);

    this.setState({
      activePage: pagerObj.activePage,
      limit: pagerObj.pageSize
    });

    this.props.actions.fetchDSOList({
      limit: pagerObj.pageSize,
      offset
    });

    const queryParamsObj = {
      activePage: pagerObj.activePage,
      limit: pagerObj.pageSize
    };

    history.pushState(
      queryParamsObj,
      "past orders listing",
      `/home/delivery-operators?${getQueryUri(queryParamsObj)}`
    );
  }

  resetPagination() {
    this.setState({ activePage: 1 })
  }

  // componentDidMount() {
  //   const queryUri = location.search.slice(1)
  //   let today = new Date()
  //   today.setUTCHours(0, 0, 0, 0)
  //   let tommorrow = new Date(today.getTime())
  //   tommorrow.setDate(tommorrow.getDate() + 1)
  //   tommorrow.setUTCHours(0, 0, 0, 0)

  //   const queryObj = {}

  //   queryUri.split('&')
  //   .map(item => item.split('='))
  //   .forEach(([key, value]) => {
  //     queryObj[key] = value
  //   })


  //   this.props.actions.fetchInProgressOTTP({
  //     limit: this.pagesLimit,
  //     offset: 0,
  //     from_date: queryObj.from_date || today,
  //     to_date: queryObj.to_date || tommorrow,
  //     status: queryObj.status === 'all' ? undefined : queryObj.status
  //   })
  // }

  // componentDidUpdate(prevProps) {
  //   const { filters } = this.props
  //   if (JSON.stringify(prevProps.filters) !== JSON.stringify(filters)) {
  //     this.props.actions.setLoadingAll()
  //     this.resetPagination()
  //     this.props.actions.fetchInProgressOTTP({
  //       limit: this.pagesLimit,
  //       offset: 0,
  //       from_date: filters.from,
  //       to_date: filters.to,
  //       status: filters.status === 'all' ? undefined : filters.status
  //     })
  //   }
  // }

  setActiveTab(activeTabName) {
    this.setState({ activeTab: activeTabName })
  }

  render() {
    const { activeTab } = this.state
    return (
      <Fragment>
        <PageHeader pageName="Consumer Complaints" />
        {/* <div style={{display: 'flex', marginBottom: '20px'}}>
          <a href="/home/consumers" 
            style={{
              marginRight: '30px', 
              textDecorationColor: '#3d70b2'
            }}
          >
            Consumer Log
          </a>
          <a href="/home/consumer-complaints">
            Consumer Complaints
          </a>
        </div> */}
        <div style={{display: 'flex', marginBottom: '40px', marginTop: '4px'}}>
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
        <div style={{
          display: 'flex',
          marginBottom: '20px',
          justifyContent: 'space-between',
          alignItems: 'center'
          }}
        >
          <Search
            placeholder="Search"
            search={this.handleSearch}
          />
          <div style={{ marginLeft: '46px', position: 'relative' }}>
            <Button primary onClick={this.mountFilterModal}>
              <Icon name="filter" />
              <span style={{ position: 'relative', top: '-2px', marginLeft: '5px' }}>Filter</span>
            </Button>
          </div>
        </div>
        {
          !this.props.loadingConsumerList && this.props.customerList.length > 0 && 
          (
            <div style={{ margin: "10px 0" }}>
              <Pagination
                activePage={this.state.activePage}
                pageSize={this.state.limit}
                totalItemsCount={this.props.customerListCount}
                //data={this.data}
                //pageRangeDisplayed={5}
                onChangePage={this.handlePageChange}
              />
            </div>
          )
        }
        <div style={{ width: '100%' }}>
          <table>
            <thead>
              <tr>
                <th>PhoneNumber</th>
                <th>Age</th>
                <th>Address</th>
                <th>City/Town</th>
                <th>Total Orders</th>
                <th>Weekly Orders(Avg)</th>
              </tr>
            </thead>
            <tbody>
              {/* {
                dsoList.map(item => (
                  <DSOListItem
                    handleClick={this.handleClick}
                    key={item.id}
                    data={item}
                  />
                ))
              } */}
              {
                !this.props.loadingCustomerList &&
                this.props.customerList &&
                this.props.customerList.map((item,i) => {
                  return  <ConsumerListItem
                            //handleClick={this.handleClick}
                            key={i}
                            data={item}
                          />
                })
              }
              {
                this.props.loadingCustomerList && 
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
                this.props.customerList.length === 0 && 
                (
                  <tr>
                    <td style={{ textAlign: "center" }} colSpan="9">
                      No orders found
                    </td>
                  </tr>
                )
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
        {/* <Pagination
          activePage={this.state.activePage}
          itemsCountPerPage={this.pagesLimit}
          totalItemsCount={dsoList.length}
          pageRangeDisplayed={5}
          onChange={this.handlePageChange}
        /> */}

      </Fragment>
    )
  }
}

const mapStateToProps = state => state.main

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(Actions, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(ConsumerManagement)
