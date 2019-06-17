import React from "react"
import PageHeader from '@components/pageheader'
import Filter from "@components/filterModal"
import Button from "@components/button"
import Icon from "@components/icon"
import Select from '@components/select'
import "./overview.scss"
import Moment from "moment"
import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import * as Actions from "../../actions"
import FilteredParams from "@components/filteredParams"
import { getQueryObj, getQueryUri } from "@utils/url-utils"
import LineChart from "@components/lineChart"

class Overview extends React.Component {
  constructor() {
    super()
    this.state = {
      activeTab: "permits",
      selectedCityIdx: "",
      selectedDsoIdx: "",
      //dayInterval: "Last 7 days",
      mountFilter: false,
      dsoList: [],
      cityList: [],
      filter: [],
      filteredPermitLabels: [
        // Moment("2019-12-10T12:04:05Z").format("DD/MM/YYYY"),
        // Moment("2019-12-10T12:04:05Z").format("DD/MM/YYYY"),
        // Moment("2019-12-10T12:04:05Z").format("DD/MM/YYYY")
      ],
      //permitValues: [280, 250, 340]
      filteredPermitValues: [],
      filteredRevenueLabels: [],
      filteredRevenueValues: []
    }

    // used to filter the graph data
    this.options = [
      {
        text: "Last 7 days",
        value: 0
      },
      {
        text: "Last 14 days",
        value: 1
      },
      {
        text: "Last 21 days",
        value: 2
      }
    ]
    this.defaultDays = 7
    this.setActiveTab = this.setActiveTab.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.mountFilterModal = this.mountFilterModal.bind(this)
    this.fetchFilterDropDownData = this.fetchFilterDropDownData.bind(this)
    this.applyFilter = this.applyFilter.bind(this)
    this.fetchDefaultData = this.fetchDefaultData.bind(this)
    this.resetFilter = this.resetFilter.bind(this)
    this.setLabelsAndValues = this.setLabelsAndValues.bind(this)
    this.setSelectedDropDownValue = this.setSelectedDropDownValue.bind(this)
    this.setFilteredFieldState = this.setFilteredFieldState.bind(this)
  }

  componentDidMount() {
    if (location.search.length) {
      this.fetchFilterDropDownData()
      this.setQueryParamas()
    } else {
      this.fetchFilterDropDownData()
      this.fetchDefaultData()
    }
  }

  /**
   * Gets the url parameters and fetches the data to be plotted
   */
  setQueryParamas() {
    const queryUri = location.search.slice(1)
    const queryObj = getQueryObj(queryUri)

    Object.entries(queryObj).forEach((item) => {
      this.setState({ [item[0]]: item[1] })
    })

    if (queryObj.filter) {
      const filter = JSON.parse(decodeURIComponent(queryObj.filter))
      this.setState({ isFilterApplied: true, filter: JSON.parse(decodeURIComponent(queryObj.filter)) })
      filter.map((item) => {
        this.setSelectedDropDownValue(item)
      })
      if (queryObj.activeTab === "permits") {
        this.props.actions.fetchPermitDetails({
          filter: JSON.parse(decodeURIComponent(queryObj.filter))
        })
      } else {
        this.props.actions.fetchPermitDetails({
          filter: [
            {
              "filterby": "None",
              "value": ""
            }
          ]
          //filter: JSON.parse(decodeURIComponent(queryObj.filter))
        })
      }
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.DSOList !== prevProps.DSOList) {
      let dsoList = this.props.DSOList.map((item, i) => {
        return { text: item.dso_name, value: i, dso_id: item.dso_id }
      })
      dsoList = [...dsoList, { text: "All", value: dsoList.length }]
      this.setState({ dsoList })
    } else if (this.props.cityList !== prevProps.cityList) {
      let max = 0
      let cityList = this.props.cityList.map((item) => {
        if (parseInt(item.id) > max) {
          max = item.id
        }
        return { text: item.city, value: item.id }
      })
      cityList = [...cityList, { text: "All", value: parseInt(max) + 1 }]
      this.setState({ cityList })
    } else if (this.props.permitList !== prevProps.permitList) {
      let permitLabels = [], permitValues = []
      this.props.permitList.map((item, i) => {
        permitLabels[i] = Moment(item.date).format("DD/MM/YYYY")
        permitValues[i] = parseInt(item.permits)
      })
      this.permitLabels = permitLabels
      this.permitValues = permitValues
      console.log(permitLabels.slice(Math.max(permitLabels.length - this.defaultDays, 0)))
      this.setState({
        filteredPermitLabels: permitLabels.slice(Math.max(permitLabels.length - this.defaultDays, 0)),
        filteredPermitValues: permitValues.slice(Math.max(permitValues.length - this.defaultDays, 0))
      })
    } else if (this.props.revenueList !== prevProps.revenueList) {
      let revenueLabels = [], revenueValues = []
      this.props.revenueList.map((item, i) => {
        revenueLabels[i] = Moment(item.date).format("DD/MM/YYYY")
        revenueValues[i] = parseInt(item.revenue)
      })
      this.revenueLabels = revenueLabels
      this.revenueValues = revenueValues
      console.log(revenueLabels.slice(Math.max(revenueLabels.length - this.defaultDays, 0)))
      this.setState({
        filteredRevenueLabels: revenueLabels.slice(Math.max(revenueLabels.length - this.defaultDays, 0)),
        filteredRevenueValues: revenueValues.slice(Math.max(revenueValues.length - this.defaultDays, 0))
      })
    }
  }

  /**
   * Fetches the dso and city list to render in filter dropdown
   */
  fetchFilterDropDownData() {
    this.props.actions.fetchDSOList({
      limit: 10000,
      offset: 0
    })
    this.props.actions.fetchCitiesList({})
  }

  /**
   * Fetches the permits details 
   */
  fetchDefaultData() {
    this.props.actions.fetchPermitDetails({
      filter: [
        {
          "filterby": "None",
          "value": ""
        }
      ]
      //filter: JSON.parse(decodeURIComponent(queryObj.filter))
    })
  }

  /**
   * Used to highlight the active tab
   * @param {String} activeTabName - Indicates the active tab name
   */
  setActiveTab(activeTab) {
    if (activeTab === "permits") {
      console.log("permits tab")
      this.props.actions.fetchPermitDetails({
        filter: [
          {
            "filterby": "None",
            "value": ""
          }
        ]
      })
    } else {
      console.log("revenue tab")
      history.pushState(null, "Revenue", "/home/overview")
      this.props.actions.fetchRevenueDetails({
        filter: [
          {
            "filterby": "None",
            "value": ""
          }
        ]
      })
    }
    this.setState({ activeTab })
  }

  /**
   * Clears the applied filter
   */
  resetFilter() {
    if (this.state.filter.length > 0) {
      this.fetchDefaultData()
      this.props.history.push(`/home/overview`)
      this.setState({ isFilterApplied: false })
    }
  }

  /**
   * Toggles[mount and unmounts] the filter component
   */
  mountFilterModal() {
    this.setState({ mountFilter: !this.state.mountFilter })
  }

  /**
   * Sets the labels and values based on activeTab and noOfDays 
   * @param {Integer} noOfDays - Used to filter the labels and values
   */
  setLabelsAndValues(noOfDays) {
    if (this.state.activeTab === "permits") {
      this.setState({
        filteredPermitLabels: this.permitLabels.slice(Math.max(this.permitLabels.length - noOfDays, 0)),
        filteredPermitValues: this.permitValues.slice(Math.max(this.permitValues.length - noOfDays, 0))
      })
    } else {
      this.setState({
        filteredRevenueLabels: this.revenueLabels.slice(Math.max(this.revenueLabels.length - noOfDays, 0)),
        filteredRevenueValues: this.revenueValues.slice(Math.max(this.revenueValues.length - noOfDays, 0))
      })
    }
  }

  /**
   * Sets the dropdown field with selected value
   * @param {String} name - selected dropdown field name
   * @param {String} value - selected dropdown field index
   */
  setFilteredFieldState(name, value) {
    const selectedFieldIdx = `selected${name}Idx`
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
      case 'Delivery Operator':
        this.setFilteredFieldState('Dso', item.idx)
        break;
    }
  }

  /**
   * On change of days, sets the filter data
   */
  handleChange(e) {
    switch (this.options.find((item) => item.value === parseInt(e.target.value)).text) {
      case 'Last 7 days':
        this.setLabelsAndValues(7)
        break;

      case 'Last 14 days':
        this.setLabelsAndValues(14)
        break;

      case 'Last 21 days':
        this.setLabelsAndValues(21)
        break;
    }
  }

  /**
   * Fetches the filtered data
   * @param {array of object} filter - Passed form FilterModal component
   */
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
        if (item.filterby === "Delivery Operator") {
          item.value = item.dso_id
        }
        return item
      }
    })

    this.setState({
      filter: validFilter,
      isFilterApplied: true
    })

    const queryObj = {
      filter: JSON.stringify(validFilter),
      activeTab: this.state.activeTab
    }
    if (this.state.activeTab === "permits") {
      this.props.actions.fetchPermitDetails({
        filter: validFilter
      })
    } else {
      this.props.actions.fetchRevenueDetails({
        filter: validFilter
      })
    }

    history.pushState(queryObj, "overview", `/home/overview?${getQueryUri(queryObj)}`)
    this.mountFilterModal()
  }

  render() {
    const { activeTab } = this.state

    return (
      <div id="overview">
        <PageHeader pageName="Overview" />
        <div style={{
          display: "flex",
          marginBottom: "20px",
          justifyContent: "flex-end"
        }}
        >
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
              filterName="overview"
              applyFilter={this.applyFilter}
              cityList={this.state.cityList}
              dsoList={this.state.dsoList}
              selectedCityIdx={this.state.selectedCityIdx}
              selectedDsoIdx={this.state.selectedDsoIdx}
            >
            </Filter>
          </div>
        </div>
        {
          this.state.isFilterApplied &&
          <FilteredParams data={this.state.filter} />
        }
        <div className="header">
          <ul className="nav">
            <li
              onClick={() => this.setActiveTab("permits")}
              className={`${activeTab === "permits" ? 'active' : ''}`}
            >
              <a>Permits</a>
            </li>
            <li
              onClick={() => this.setActiveTab("revenue")}
              className={`${activeTab === "revenue" ? 'active' : ''}`}
            >
              <a>Revenue</a>
            </li>
          </ul>
        </div>
        <div className="chart">
          {
            activeTab === "permits" &&
            <LineChart
              labels={this.state.filteredPermitLabels}
              values={this.state.filteredPermitValues}
              xLabel="TIME DURATION"
              yLabel="PERMITS (NO.)"
              tooltipText="PERMITS"
            />
          }
          {
            activeTab === "revenue" &&
            <LineChart
              labels={this.state.filteredRevenueLabels}
              values={this.state.filteredRevenueValues}
              xLabel="TIME DURATION"
              yLabel="REVENUE (IN LAKHS)"
              tooltipText="REVENUE"
            />
          }
        </div>
        <div className="footer">
          <Select
            options={this.options}
            //name="interval"  
            onChange={e => this.handleChange(e)}
          />
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => state.main

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(Actions, dispatch)
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Overview)