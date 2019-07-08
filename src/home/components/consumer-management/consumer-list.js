import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as Actions from "./../../actions"
import ConsumerListItem from './customer-list-item'
import { getQueryObj, getQueryUri } from "@utils/url-utils"
import Pagination from '@components/pagination'
import Loader from '@components/loader'
import PageHeader from '@components/pageheader'
import Search from "@components/search"
import Filter from "@components/filterModal"
import Button from "@components/button"
import FilteredParams from "@components/filteredParams"
import Icon from "@components/icon"

class ConsumerManagement extends React.Component {
  constructor() {
    super()

    this.state = {
      activePage: 1,
      limit: 10,
      activeTab: 'consumers',
      cityName: "",
      selectedCityIdx: "",
      filter: [],
      cityList: [],
      isFilterApplied: false,
      mountFilter: false,
    }
    this.state_id = parseInt(localStorage.getItem("state-id"))
    this.handlePageChange = this.handlePageChange.bind(this)
    this.setQueryParamas = this.setQueryParamas.bind(this)
    this.fetchConsumerList = this.fetchConsumerList.bind(this)
    // this.setActiveTab = this.setActiveTab.bind(this)
    this.handleSearch = this.handleSearch.bind(this)
    this.applyFilter = this.applyFilter.bind(this)
    this.resetFilter = this.resetFilter.bind(this)
    this.mountFilterModal = this.mountFilterModal.bind(this)
    this.setSelectedDropDownValue = this.setSelectedDropDownValue.bind(this)
    this.setFilteredFieldState = this.setFilteredFieldState.bind(this)
    this.fetchFilterDropDownData = this.fetchFilterDropDownData.bind(this)
    this.clearSearchResults = this.clearSearchResults.bind(this)
  }

  componentDidMount() {
    if (location.search.length) {
      this.setQueryParamas()
      this.fetchFilterDropDownData()
    } else {
      this.fetchConsumerList()
      this.fetchFilterDropDownData()
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.cityList !== prevProps.cityList) {
      let max = 0
      let cityList = this.props.cityList[this.state_id].cities.map((item) => {
        if (parseInt(item.city_id) > max) {
          max = item.city_id
        }
        return { text: item.city_name, value: item.city_id }
      })
      cityList = [...cityList, { text: "All", value: parseInt(max) + 1 }]
      this.setState({ cityList })
    }
  }

  /**
  * Toggles[mount and unmounts] the filter component
  */
  mountFilterModal() {
    this.setState({ mountFilter: !this.state.mountFilter })
  }

  /**
    * Gets the url parameters and fetches consumer list
    */
  setQueryParamas() {
    const queryUri = location.search.slice(1)
    const queryObj = getQueryObj(queryUri)
    Object.entries(queryObj).forEach((item) => {
      if (this.props && !this.props.activePage && !this.props.limit) {
        this.setState({ [item[0]]: item[1] })
      }
    })

    if (queryObj.filter) {
      const filter = JSON.parse(decodeURIComponent(queryObj.filter))
      // if (filter.find(item => item.filterby === "CityName")) {
      //   this.setState({ cityName: filter.find(item => item.filterby === "CityName").value })
      // }
      //sets the filtered fields as default value to filter fields
      filter.map((item) => {
        this.setSelectedDropDownValue(item)
      })

      this.setState({ isFilterApplied: true, filter: JSON.parse(decodeURIComponent(queryObj.filter)) })

      this.props.actions.fetchConsumerList({
        limit: parseInt(queryObj.limit),
        offset: queryObj.limit * (queryObj.activePage - 1),
        filter: JSON.parse(decodeURIComponent(queryObj.filter))
      })
    }
    else {
      this.props.actions.fetchConsumerList({
        limit: parseInt(queryObj.limit),
        offset: queryObj.limit * (queryObj.activePage - 1)
      })
    }
  }

  /**
   * Fetches the consumer list of given limit and offset
   */
  fetchConsumerList() {
    this.props.actions.fetchConsumerList({
      limit: this.state.limit,
      offset: 0
    })
  }

  /**
   * Sets the dropdown field with selected value
   * @param {String} name - selected dropdown field name
   * @param {String} value - selected dropdown field index
   */
  setFilteredFieldState(fieldName, value) {
    const selectedFieldIdx = `selected${fieldName}Idx`
    this.setState({ [selectedFieldIdx]: value })
  }

  /**
 * Sets the filtered dropdown value on page reload
 */
  setSelectedDropDownValue(item) {
    switch (item.filterby) {
      case 'City':
        this.setFilteredFieldState('City', item.idx)
        break;
    }
  }

  /**
   * Navigates to next page
   * @param {object} pagerObj - Passed from pagination component
   * @param {Integer} pagerObj.activePage - Used to calculate the offset to fetch next set of consumers
   * @param {Integer} pagerObj.pageSize - Used as limit to fetch next set of consumers
   */
  handlePageChange(pagerObj) {
    this.props.actions.setLoadingAll()
    const offset = pagerObj.pageSize * (pagerObj.activePage - 1)

    this.setState({
      activePage: pagerObj.activePage,
      limit: pagerObj.pageSize
    })

    this.props.actions.fetchConsumerList({
      limit: parseInt(pagerObj.pageSize),
      offset: parseInt(offset)
    })

    const queryParamsObj = {
      activePage: pagerObj.activePage,
      limit: pagerObj.pageSize
    }

    history.pushState(
      queryParamsObj,
      "consumer listing",
      `/home/consumers?${getQueryUri(queryParamsObj)}`
    )
  }

  fetchFilterDropDownData() {
    this.props.actions.fetchCitiesList({})
  }

  /**
   * Fetches the consumer details of given city name
   * @param {string} searchQuery - cityName passed from searchComponent, used for filtering the consumer list
   */
  handleSearch(searchQuery) {
    //console.log("searched text", searchQuery)
    const filterObj = {
      filterby: "CityName",
      value: searchQuery
    }
    const urlParams = {
      limit: 10,
      activePage: 1,
      filter: JSON.stringify([filterObj])
    }
    this.props.actions.fetchConsumerList({
      limit: 10,
      offset: 0,
      filter: [filterObj]
    })
    this.setState({ filter: [filterObj] })
    history.pushState(urlParams, "consumer listing", `/home/consumers?${(getQueryUri(urlParams))}`)
  }

  /**
   * Clears the applied filter/search and renders all the consumers
   */
  clearSearchResults() {
    this.fetchConsumerList()
    this.setState({ isFilterApplied: false })
    this.props.history.push(`/home/consumers`)
  }

  resetFilter() {
    this.clearSearchResults()
  }

  applyFilter(newFilter) {
    let appliedFilter = []
    //If filter already applied, then adds the new filter options to it
    if (this.state.filter) {
      appliedFilter = this.state.filter
      newFilter.map((item) => {
        appliedFilter.push(item)
      })
    }

    const uniqueFilter = appliedFilter.reduce((acc, current) => {
      const isFoundFilter = acc.find(item => item.filterby === current.filterby);
      if (!isFoundFilter) {
        return acc.concat([current]);
      } else {
        const foundFilterIdx = acc.findIndex(item => item.filterby === current.filterby)
        acc[foundFilterIdx] = { ...acc[foundFilterIdx], ...current }
        return acc
      }
    }, [])

    const validFilter = uniqueFilter.filter((item) => {
      if (item.value !== "All") {
        if (item.filterby === "City") {
          item.value = item.idx
        }
        return item
      }
    })

    this.setState({
      limit: 10,
      filter: validFilter,
      isFilterApplied: true
    })

    const queryObj = {
      limit: 10,
      offset: 0,
      activePage: 1,
      filter: JSON.stringify(validFilter)
    }
    this.props.actions.fetchConsumerList({
      limit: 10,
      offset: 0,
      filter: validFilter
    })
    history.pushState(queryObj, "consumer listing", `/home/consumers?${getQueryUri(queryObj)}`)
    this.mountFilterModal()
  }

  render() {
    const { activeTab } = this.state
    console.log("list", this.state)
    return (
      <Fragment>
        <div style={{
          marginBottom: "20px",
          marginTop: "26px",
          display: 'flex',
          justifyContent: 'flex-end'
        }}
        >
          {/* <Search
            placeholder="Search by City/Town"
            searchText={this.state.cityName}
            search={this.handleSearch}
            clearSearch={this.clearSearchResults}
          /> */}
          <div style={{ position: 'relative' }}>
            {
              this.state.isFilterApplied &&
              <span style={{ marginRight: '10px' }}>
                <Button secondary onClick={this.resetFilter}>
                  <span>Reset Filter</span>
                </Button>
              </span>
            }
            <Button primary onClick={this.mountFilterModal}>
              <Icon name="filter" />
              <span style={{ position: 'relative', top: '-2px', marginLeft: '5px' }}>Filter</span>
            </Button>
            <Filter
              showFilter={this.state.mountFilter}
              filterName="consumer"
              applyFilter={this.applyFilter}
              cityList={this.state.cityList}
              selectedCityIdx={this.state.selectedCityIdx}
            >
            </Filter>
          </div>
        </div>
        {
          this.state.isFilterApplied &&
          <FilteredParams data={this.state.filter} />
        }
        {
          (
            <div style={{ margin: "10px 0" }}>
              <Pagination
                activePage={this.state.activePage}
                pageSize={this.state.limit}
                totalItemsCount={this.props.customerListCount}
                onChangePage={this.handlePageChange}
              />
            </div>
          )
        }
        <div style={{ width: '100%' }}>
          <table className="logs">
            <thead>
              <tr>
                <th>Name</th>
                <th>Age</th>
                <th>City/Town</th>
                <th>Address</th>
                {/* <th>Total Orders</th>
                <th>Weekly Orders(Avg)</th> */}
              </tr>
            </thead>
            <tbody>
              {
                !this.props.loadingCustomerList &&
                this.props.customerList &&
                this.props.customerList.map((item, i) => {
                  return <ConsumerListItem
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
                      No consumers found
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

export default connect(mapStateToProps, mapDispatchToProps)(ConsumerManagement)
