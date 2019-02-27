import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as Actions from './../actions'
import RetailersListItem from './retailer-list-item'
import Pagination from '@components/pagination'
import Search from '@components/search'
import PageHeader from '@components/pageheader'
import { retailersList } from './../constants/retailers-list'

class RetailersList extends React.Component {
  constructor() {
    super()
    this.state = {
      activePage: 1,
      limit: 10
    }
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
      this.setState({ [item[0]]: item[1] });
      // this.filter[item[0]] = item[1]
    })

    this.props.actions.fetchRetailerList({
      limit: parseInt(queryObj.limit),
      offset: queryObj.limit * (queryObj.activePage - 1)
    })
  }

  defaultData() {
    this.props.actions.fetchRetailerList({
      limit: this.state.limit,
      offset: 0
    })
  }

  handleClick(dataObj) {
    //console.log("props", this.props)
    this.props.history.push(`/home/retailers/${dataObj.id}`, dataObj)
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
      offset
    })

    const queryParamsObj = {
      activePage: pagerObj.activePage,
      limit: pagerObj.pageSize
    }

    history.pushState(
      queryParamsObj,
      "past orders listing",
      `/home/past-orders?${getQueryUri(queryParamsObj)}`
    )
  }

  resetPagination() {
    this.setState({ activePage: 1 })
  }

  render() {
    return (
      <Fragment>
        <PageHeader pageName="Retailers" />
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
        </div>
        {
          !this.props.loadingRetailerList && this.props.retailerList.length > 0 && 
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
                {/* <th>Application status</th> */}
                <th>Address</th>
                <th>License Type</th>
                <th>License Status</th>
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
