import React, { Fragment } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
//import Pagination from 'react-js-pagination'
import * as Actions from "./../actions";
import LiveOrdersListItem from "./live-ottp-list-item";
import Loader from "@components/loader";
import "@sass/_pagination.scss";
import Button from "@components/button";
import { pastOrderData } from "./../constants/past-orders-mock";
import Search from "@components/search";
import Toggle from "@components/toggle";
import Icon from "@components/icon";
import Pagination from "@components/pagination";
import PageHeader from "@components/pageheader";
import Filter from "@components/filterModal";
import Label from "@components/label";
import { getQueryObj, getQueryUri } from "@utils/url-utils";
import "@sass/style.scss";

class LiveOrdersList extends React.Component {
  constructor() {
    super()
    this.state = {
      activePage: 1,
      dsoList: [],
      limit: 10,
      mountFilter: false
    }

    this.permitStatus = [
      {
        text: 'ONGOING',
        value: 0
      },
      {
        text: "All",
        value: 1
      }
    ]
    this.orderAmount = [
      {
        text: "0 - 2000",
        value: 0
      },
      {
        text: "2000 - 4000",
        value: 1
      },
      {
        text: "4000 - 6000",
        value: 2
      },
      {
        text: "6000 - 8000",
        value: 3
      },
      {
        text: "8000 - 10000",
        value: 4
      },
      {
        text: "All",
        value: 5
      }
    ]
    this.handlePageChange = this.handlePageChange.bind(this)
    this.handleClick = this.handleClick.bind(this)
    this.defaultData = this.defaultData.bind(this)
    this.filteredData = this.filteredData.bind(this)
    this.resetPagination = this.resetPagination.bind(this)
    this.handleSearch = this.handleSearch.bind(this)
    this.fetchData = this.fetchData.bind(this)
    this.mountFilterModal = this.mountFilterModal.bind(this)
    this.fetchData = this.fetchData.bind(this)
    this.applyFilter = this.applyFilter.bind(this)
  }

  handleClick(dataObj) {
    this.props.history.push(
      `/home/live-orders/${dataObj.ottp_info.ottp_id}`,
      dataObj
    )
  }

  fetchData() {
    this.props.actions.fetchDSOList({
      limit: 10000,
      offset: 0
    })
  }

  handlePageChange(pagerObj) {
    this.props.actions.setLoadingAll();
    clearTimeout(this.timeoutId);
    // const offset = this.state.limit * (pagerObj.activePage - 1);
    const offset = pagerObj.pageSize * (pagerObj.activePage - 1);
    this.setState({
      activePage: pagerObj.activePage,
      //pageOffset: offset,
      limit: pagerObj.pageSize
    });
    this.props.actions.fetchInProgressOTTP({
      limit: pagerObj.pageSize,
      offset
    });

    const queryParamsObj = {
      activePage: pagerObj.activePage,
      limit: pagerObj.pageSize
    };

    history.pushState(
      queryParamsObj,
      "live orders listing",
      `/home/live-orders?${getQueryUri(queryParamsObj)}`
    );
  }

  resetPagination() {
    this.setState({ activePage: 1 });
  }

  componentDidMount() {
    if (location.search.length) {
      this.setQueryParamas();
    } else {
      this.defaultData();
      this.fetchData();
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.DSOList !== prevProps.DSOList) {
      let dsoList = this.props.DSOList.map((item, i) => {
        return {text: item.name, value: i}
      })
      dsoList = [...dsoList, {text: "All", value: dsoList.length}]
      this.setState({dsoList})
    }
  }

  setQueryParamas() {
    const queryUri = location.search.slice(1);
    const queryObj = getQueryObj(queryUri);

    Object.entries(queryObj).forEach((item) => {
      this.setState({ [item[0]]: item[1] });
      // this.filter[item[0]] = item[1]
    });

    this.props.actions.fetchInProgressOTTP({
      limit: parseInt(queryObj.limit),
      offset: queryObj.limit * (queryObj.activePage - 1)
    });
  }

  defaultData() {
    // const queryUri = location.search.slice(1).split('=')
    // const status = queryUri[1]
    //console.log("default data");
    this.props.actions.fetchInProgressOTTP({
      limit: this.state.limit,
      offset: 0
    });
    this.timeoutId = setTimeout(this.defaultData, 30000);
  }

  filteredData() {
    // this.props.actions.fetchInProgressOTTP({
    //   limit: this.pagesLimit,
    //   offset: 0,
    //   status: this.filters.status === 'all' ? undefined : this.filters.status
    // })
    // this.timeoutId = setTimeout(this.filteredData, 30000)
  }

  // componentDidUpdate(prevProps) {
  //   const { filters } = this.props
  //   this.filters = Object.assign({}, filters)
  //   if (filters && JSON.stringify(prevProps.filters) !== JSON.stringify(filters)) {
  //     this.props.actions.setLoadingAll()
  //     this.resetPagination()
  //     clearTimeout(this.timeoutId)
  //     this.filteredData()
  //   }
  // }

  componentWillUnmount() {
    clearTimeout(this.timeoutId)
  }

  handleSearch(searchQuery) {
    console.log("searched text", searchQuery)
  }

  mountFilterModal() {
    this.setState({ mountFilter: !this.state.mountFilter })
  }

  applyFilter(filterObj) {
    console.log("apply filter", filterObj)
    this.setState({limit: 10})
    this.props.actions.fetchInProgressOTTP({
      limit: 10,
      offset: 0,
      filter: filterObj.filter
    })
  }

  render() {
    // const tableHeaderStyle = {
    //   display: "flex",
    //   alignItems: "center",
    //   justifyContent: "space-evenly"
    // };
    return (
      <Fragment>
        <PageHeader pageName="Live Orders" />
        <div style={{
          display: "flex",
          marginBottom: "20px",
          justifyContent: "space-between",
          alignItems: "center"
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
            <Filter
              showFilter={this.state.mountFilter}
              filterName="liveOrders"
              applyFilter={this.applyFilter}
              dsoList={this.state.dsoList}
              orderAmount={this.orderAmount}
              permitStatus={this.permitStatus}
            >
            </Filter>
          </div>
        </div> 
        {!this.props.loadingInProgressOTTP && this.props.inProgressOTTP.length > 0 && (
          <div style={{ margin: "10px 0" }}>
            <Pagination
              activePage={this.state.activePage}
              pageSize={this.state.limit}
              totalItemsCount={this.props.inProgressCount}
              onChangePage={this.handlePageChange}
            />
          </div>
        )}
        {
          <div>
            <table>
              <thead>
                <tr>
                  <th>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center"
                      }}
                    >
                      <span style={{ marginRight: "5px" }}>Permit ID</span>
                      <span className="info" style={{ position: "relative" }}>
                        <Icon name="info" />
                        <span className="tooltip-text">
                          Unique One Time Transport Permit Number
                        </span>
                      </span>
                    </div>
                  </th>
                  <th>Date Issued</th>
                  {/* <th>Time issued</th> */}
                  <th>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center"
                      }}
                    >
                      <span style={{ marginRight: "5px" }}>
                        Delivery Operator
                      </span>
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
                        display: "flex",
                        alignItems: "center"
                        //justifyContent: 'space-around'
                      }}
                    >
                      <span style={{ marginRight: "5px" }}>Retailer</span>
                      <span className="info" style={{ position: "relative" }}>
                        <Icon name="info" />
                        <span className="tooltip-text">
                          The retailer/retail outlet which received the order
                        </span>
                      </span>
                    </div>
                  </th>
                  <th>City/Town</th>
                  <th>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center"
                        //justifyContent: 'space-around'
                      }}
                    >
                      <span style={{ marginRight: "5px" }}>Order Amount</span>
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
                        display: "flex",
                        alignItems: "center"
                        //justifyContent: 'space-around'
                      }}
                    >
                      <span style={{ marginRight: "5px" }}>Permit Status</span>
                      <span className="info" style={{ position: "relative" }}>
                        <Icon name="info" />
                        <span className="tooltip-text">
                          Validity status of a single Permit ID 
                        </span>
                      </span>
                    </div>
                  </th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {!this.props.loadingInProgressOTTP &&
                  this.props.inProgressOTTP &&
                  this.props.inProgressOTTP.map(item => (
                    <LiveOrdersListItem
                      handleClick={this.handleClick}
                      handleOrderAssign={this.openAssignOrderModal}
                      handleShowNotes={this.handleShowNotes}
                      key={item.ottp_id}
                      data={item}
                    />
                  ))}
                {this.props.loadingInProgressOTTP && (
                  <tr>
                    <td colSpan="8">
                      <Loader />
                    </td>
                  </tr>
                )}
                {!this.props.loadingInProgressOTTP &&
                  this.props.inProgressOTTP.length === 0 && (
                    <tr>
                      <td style={{ textAlign: "center" }} colSpan="8">
                        No orders found
                      </td>
                    </tr>
                  )}
              </tbody>
            </table>
          </div>
        }
      </Fragment>
    );
  }
}

const mapStateToProps = state => state.main;

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(Actions, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LiveOrdersList);
