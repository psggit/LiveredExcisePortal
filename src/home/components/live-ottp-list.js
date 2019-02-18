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
    super();
    this.state = {
      activePage: 1,
      pageOffset: 0,
      limit: 10,
      mountFilter: false
    };
    this.handlePageChange = this.handlePageChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.defaultData = this.defaultData.bind(this);
    this.filteredData = this.filteredData.bind(this);
    this.resetPagination = this.resetPagination.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.fetchData = this.fetchData.bind(this);
    this.mountFilterModal = this.mountFilterModal.bind(this);
  }

  handleClick(dataObj) {
    this.props.history.push(
      `/home/live-orders/${dataObj.ottp_info.ottp_id}`,
      dataObj
    );
  }

  fetchData() {
    // this.props.actions.fetchInProgressOTTP({
    //   limit: this.pagesLimit,
    //   offset,
    //   status: filters.status === 'all' ? undefined : filters.status
    // })
  }

  handlePageChange(pagerObj) {
    this.props.actions.setLoadingAll();
    clearTimeout(this.timeoutId);
    const offset = this.state.limit * (pagerObj.activePage - 1);
    this.setState({
      activePage: pagerObj.activePage,
      pageOffset: offset,
      limit: pagerObj.pageSize
    });
    this.props.actions.fetchInProgressOTTP({
      limit: pagerObj.pageSize,
      offset
      //status: filters.status === 'all' ? undefined : filters.status
    });

    const queryParamsObj = {
      activePage: pagerObj.activePage,
      limit: pagerObj.pageSize
    };

    history.pushState(
      queryParamsObj,
      "organisation listing",
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
    }
  }

  setQueryParamas() {
    const queryUri = location.search.slice(1);
    const queryObj = getQueryObj(queryUri);

    Object.entries(queryObj).forEach(item => {
      this.setState({ [item[0]]: item[1] });
      // this.filter[item[0]] = item[1]
    });

    this.props.actions.fetchInProgressOTTP({
      limit: parseInt(queryObj.limit),
      offset: queryObj.limit * (queryObj.activePage - 1)
      //status: status === 'all' ? undefined : status
    });
  }

  defaultData() {
    // const queryUri = location.search.slice(1).split('=')
    // const status = queryUri[1]
    //console.log("default data");
    this.props.actions.fetchInProgressOTTP({
      limit: this.state.limit,
      offset: 0
      //status: status === 'all' ? undefined : status
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
    clearTimeout(this.timeoutId);
  }

  handleSearch(searchQuery) {
    console.log("searched text", searchQuery);
  }

  mountFilterModal() {
    this.setState({ mountFilter: !this.state.mountFilter });
  }

  applyFilter() {
    console.log("apply filter");
  }

  render() {
    const tableHeaderStyle = {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-evenly"
    };
    return (
      <Fragment>
        <PageHeader pageName="Live Orders" />
        {/* <div style={{
          display: 'flex',
          marginBottom: '20px',
          justifyContent: 'space-between',
          alignItems: 'center'
          }}> */}
        {/* <Search
            placeholder="Search"
            search={this.handleSearch}
          /> */}
        {/* <div style={{ marginLeft: '46px', position: 'relative' }}>
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
          </div> */}
        {/* <div style={{ display: 'flex', alignItems: 'center' }}>
          <div>
            <Toggle />
            <span style={{
              color: '#5a6872',
              fontSize: '14px',
              marginLeft: '10px'
              }}>
              Delivery enabled
            </span>
          </div>
          
        </div> */}
        {/* </div> */}
        {!this.props.loadingInProgressOTTP && this.props.inProgressOTTP && (
          <div style={{ margin: "10px 0" }}>
            <Pagination
              activePage={this.state.activePage}
              pageSize={this.state.limit}
              totalItemsCount={this.props.inProgressCount}
              //data={this.data}
              //pageRangeDisplayed={5}
              onChangePage={this.handlePageChange}
            />
          </div>
        )}
        {
          //!this.props.loadingInProgressOTTP &&
          //this.props.inProgressOTTP &&
          <div>
            <table>
              <thead>
                <tr>
                  <th>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center"
                        //justifyContent: 'space-around'
                      }}
                    >
                      <span style={{ marginRight: "5px" }}>Permit ID</span>
                      <span className="info" style={{ position: "relative" }}>
                        <Icon name="info" />
                        <span className="tooltip-text">
                          Permit ID is the ID of the One Time Transport Permit
                          that has been generated
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
                        //justifyContent: 'space-around'
                      }}
                    >
                      <span style={{ marginRight: "5px" }}>
                        Delivery Operator
                      </span>
                      <span>
                        <Icon name="info" />
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
                      <span>
                        <Icon name="info" />
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
                      <span>
                        <Icon name="info" />
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
                      <span
                      // className="tooltip"
                      >
                        <Icon name="info" />
                        {/* <span className="toolTipText">
                        Permit ID is the ID of the One Time Transport Permit that has been generated
                      </span> */}
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
                  !this.props.inProgressOTTP && (
                    <tr>
                      <td style={{ textAlign: "center" }} colSpan="8">
                        No records found
                      </td>
                    </tr>
                  )}
              </tbody>
            </table>
          </div>
        }
        {/* {
          !this.props.loadingInProgressOTTP && this.props.inProgressOTTP.length
          ? <Pagination
            activePage={this.state.activePage}
            itemsCountPerPage={this.pagesLimit}
            totalItemsCount={this.props.inProgressCount}
            pageRangeDisplayed={5}
            onChange={this.handlePageChange}
          />
          : ''
        } */}
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
