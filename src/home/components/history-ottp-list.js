import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as Actions from './../actions'
import HistoryOrdersListItem from './history-ottp-list-item'
import Pagination from '@components/pagination'
//import '@sass/_pagination.scss'
import Loader from '@components/loader'
import { getQueryObj, getQueryUri } from "@utils/url-utils";
import Icon from "@components/icon"
import {pastOrderData} from "./../constants/past-orders-mock"
import "@sass/style.scss"
import PageHeader from "@components/pageheader"
import Filter from "@components/filterModal"
import Search from "@components/search"
import Button from "@components/button"

class HistoryOrdersList extends React.Component {
  constructor() {
    super()
    //this.pagesLimit = 10
    this.state = {
      activePage: 1,
      limit: 10,
      // pageOffset: 0,
      // data: pastOrderData.data,
      // loading: false,
      mountFilter: false
    }
    this.handlePageChange = this.handlePageChange.bind(this)
    this.handleClick = this.handleClick.bind(this)
    this.resetPagination = this.resetPagination.bind(this)
    this.handleSearch = this.handleSearch.bind(this)
    this.applyFilter = this.applyFilter.bind(this)
    this.mountFilterModal = this.mountFilterModal.bind(this)
  }

  handleClick(dataObj) {
    console.log("data", dataObj)
    this.props.history.push(`/home/past-orders/${dataObj.ottp_info.ottp_id}`, dataObj)
  }

  handlePageChange(pagerObj) {
    this.props.actions.setLoadingAll();
    const offset = pagerObj.pageSize * (pagerObj.activePage - 1);

    this.setState({
      activePage: pagerObj.activePage,
      limit: pagerObj.pageSize
    });

    this.props.actions.fetchHistoryOTTP({
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
      `/home/past-orders?${getQueryUri(queryParamsObj)}`
    );
  }

  resetPagination() {
    this.setState({ activePage: 1 })
  }

  componentDidMount() {
    if (location.search.length) {
      this.setQueryParamas();
    } else {
      this.defaultData();
    }
    // const queryUri = location.search.slice(1)
    // let today = new Date()
    // today.setUTCHours(0, 0, 0, 0)
    // let tommorrow = new Date(today.getTime())
    // tommorrow.setDate(tommorrow.getDate() + 1)
    // tommorrow.setUTCHours(0, 0, 0, 0)

    // const queryObj = {}

    // queryUri.split('&')
    // .map(item => item.split('='))
    // .forEach(([key, value]) => {
    //   queryObj[key] = value
    // })


    // this.props.actions.fetchHistoryOTTP({
    //   limit: this.pagesLimit,
    //   offset: 0,
    //   from_date: queryObj.from_date || today,
    //   to_date: queryObj.to_date || tommorrow,
    //   status: queryObj.status === 'all' ? undefined : queryObj.status
    // })
  }

  componentDidUpdate(prevProps) {
    // const { filters } = this.props
    // if (JSON.stringify(prevProps.filters) !== JSON.stringify(filters)) {
    //   this.props.actions.setLoadingAll()
    //   this.resetPagination()
    //   this.props.actions.fetchHistoryOTTP({
    //     limit: this.pagesLimit,
    //     offset: 0,
    //     from_date: filters.from,
    //     to_date: filters.to,
    //     status: filters.status === 'all' ? undefined : filters.status
    //   })
    // }
  }

  setQueryParamas() {
    const queryUri = location.search.slice(1);
    const queryObj = getQueryObj(queryUri);

    Object.entries(queryObj).forEach((item) => {
      this.setState({ [item[0]]: item[1] });
      // this.filter[item[0]] = item[1]
    });

    this.props.actions.fetchHistoryOTTP({
      limit: parseInt(queryObj.limit),
      offset: queryObj.limit * (queryObj.activePage - 1)
    });
  }

  defaultData() {
    this.props.actions.fetchHistoryOTTP({
      limit: this.state.limit,
      offset: 0
    });
  }

  handleSearch(searchQuery) {
    console.log("searched text", searchQuery)
  }

  mountFilterModal() {
    this.setState({ mountFilter: !this.state.mountFilter })
  }

  applyFilter() {
    console.log("apply filter")
  }

  render() {
    return (
      <Fragment>
        <PageHeader pageName="Past Orders" />
        {/* <div style={{
          display: 'flex',
          marginBottom: '20px',
          justifyContent: 'space-between',
          alignItems: 'center'
          }}>
          <Search
            placeholder="Search"
            search={this.handleSearch}
          />
          <div style={{ marginLeft: '46px', position: 'relative' }}>
            <Button primary onClick={this.mountFilterModal}>
              <Icon name="filter" />
              <span style={{ position: 'relative', top: '-2px', marginLeft: '5px' }}>Filter</span>
            </Button>
            <Filter
              showFilter={this.state.mountFilter}
              filterName="pastOrders"
              applyFilter={this.applyFilter}
            >
            </Filter>
          </div>
        </div> */}
        {!this.props.loadingHistoryOTTP && this.props.historyOTTPData.length > 0 && (
          <div style={{ margin: "10px 0" }}>
            <Pagination
              activePage={this.state.activePage}
              pageSize={this.state.limit}
              totalItemsCount={this.props.historyOTTPCount}
              //data={this.data}
              //pageRangeDisplayed={5}
              onChangePage={this.handlePageChange}
            />
          </div>
        )}
        <div>
          <table>
            <thead>
              <tr>
                <th>
                  <div 
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      //justifyContent: 'space-around'
                    }}
                  >
                    <span style={{marginRight: '5px'}}>Permit ID</span>
                    <span className="info" style={{ position: "relative" }}>
                      <Icon name="info" />
                      <span className="tooltip-text">
                        Unique One Time Transport Permit Number
                      </span>
                    </span>
                  </div>
                </th>
                <th>
                  <div 
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      //justifyContent: 'space-around'
                    }}
                  >
                    <span style={{marginRight: '5px'}}>Time</span>
                  </div>
                </th>
                <th>
                  <div 
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      //justifyContent: 'space-around'
                    }}
                  >
                    <span style={{marginRight: '5px'}}>Delivery Operator</span>
                    <span className="info" style={{ position: "relative" }}>
                      <Icon name="info" />
                      <span className="tooltip-text">
                        On-demand application through which a customer places an order
                      </span>
                    </span>
                  </div>
                </th>
                <th>
                  <div 
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      //justifyContent: 'space-around'
                    }}
                  >
                    <span style={{marginRight: '5px'}}>Retailer</span>
                    <span className="info" style={{ position: "relative" }}>
                      <Icon name="info" />
                      <span className="tooltip-text">
                        The retailer/retail outlet which received the order
                      </span>
                    </span>
                  </div>
                </th>
                <th>
                  <div 
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      //justifyContent: 'space-around'
                    }}
                  >
                    <span style={{marginRight: '5px'}}>City/Town</span>
                  </div>
                </th>
                <th>
                  <div 
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      //justifyContent: 'space-around'
                    }}
                  >
                    <span style={{marginRight: '5px'}}>Order Amount</span>
                    <span className="info" style={{ position: "relative" }}>
                      <Icon name="info" />
                      <span className="tooltip-text">
                        Price of the chosen alcohol beverage against its quantity
                      </span>
                    </span>
                  </div>
                </th>
                <th>
                  <div 
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      //justifyContent: 'space-around'
                    }}
                  >
                    <span style={{marginRight: '5px'}}>Volume (ml)</span>
                    <span className="info" style={{ position: "relative" }}>
                      <Icon name="info" />
                      <span className="tooltip-text">
                        Unique One Time Transport Permit Number
                      </span>
                    </span>
                  </div>
                </th>
                <th>
                  <div 
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      //justifyContent: 'space-around'
                    }}
                  >
                    <span style={{marginRight: '5px'}}>Permit Status</span>
                    <span className="info" style={{ position: "relative" }}>
                      <Icon name="info" />
                      <span className="tooltip-text">
                        Validity status of a single Permit ID
                      </span>
                    </span>
                  </div>
                </th>
                <th>
                  <div 
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      //justifyContent: 'space-around'
                    }}
                  >
                    <span style={{marginRight: '5px'}}>Customer Age Verification</span>
                    <span className="info" style={{ position: "relative" }}>
                      <Icon name="info" />
                      <span className="tooltip-text">
                        Unique One Time Transport Permit Number
                      </span>
                    </span>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              {!this.props.loadingHistoryOTTP &&
              this.props.historyOTTPData &&
              this.props.historyOTTPData.map(item => (
                <HistoryOrdersListItem
                  handleClick={this.handleClick}
                  key={item.ottp_id}
                  data={item}
                />
              ))}
              {this.props.loadingHistoryOTTP && (
                <tr>
                  <td colSpan="9">
                    <Loader />
                  </td>
                </tr>
              )}
              {!this.props.loadingHistoryOTTP &&
              this.props.historyOTTPData.length === 0 && (
                <tr>
                  <td style={{ textAlign: "center" }} colSpan="9">
                    No orders found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        {/* {
          !this.props.loadingHistoryOTTP && this.props.historyOTTPData.length
          ? <Pagination
            activePage={this.state.activePage}
            itemsCountPerPage={this.pagesLimit}
            totalItemsCount={this.props.historyOTTPCount}
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
