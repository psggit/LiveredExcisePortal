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
      dayInterval: "Last 7 days",
      mountFilter: false,
      dsoList: [],
      cityList: [],
      filter: [],
      permitLabels:  [
        Moment("2019-12-10T12:04:05Z").format("DD/MM/YYYY"),
        Moment("2019-12-10T12:04:05Z").format("DD/MM/YYYY"),
        Moment("2019-12-10T12:04:05Z").format("DD/MM/YYYY")
      ],
      permitValues: [280, 250, 340]
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

    this.setActiveTab = this.setActiveTab.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.mountFilterModal = this.mountFilterModal.bind(this)
    this.fetchFilterDropDownData = this.fetchFilterDropDownData.bind(this)
    this.applyFilter = this.applyFilter.bind(this)
    this.fetchDefaultData = this.fetchDefaultData.bind(this)
    this.resetFilter = this.resetFilter.bind(this)
  }

  componentDidMount() {
    if(location.search.length) {
      this.fetchFilterDropDownData()
      this.setQueryParamas()
    } else {
      this.fetchFilterDropDownData()
      this.fetchDefaultData()
    }
  }

   /**
    * Gets the url parameters and fetches data
    */
   setQueryParamas() {
    const queryUri = location.search.slice(1)
    const queryObj = getQueryObj(queryUri)

    Object.entries(queryObj).forEach((item) => {
      this.setState({ [item[0]]: item[1] })
    })

    if(queryObj.filter) {
      const filter = JSON.parse(decodeURIComponent(queryObj.filter))
      this.setState({isFilterApplied: true,  filter: JSON.parse(decodeURIComponent(queryObj.filter))})
      if(queryObj.activeTab === permits) {
        this.props.actions.fetchPermitDetails({
          filter: JSON.parse(decodeURIComponent(queryObj.filter))
        })
      } else {
        this.props.actions.fetchPermitDetails({
          filter: JSON.parse(decodeURIComponent(queryObj.filter))
        })
      }
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.DSOList !== prevProps.DSOList) {
      let dsoList = this.props.DSOList.map((item, i) => {
        return {text: item.dso_name, value: i}
      })
      dsoList = [...dsoList, {text: "All", value: dsoList.length}]
      this.setState({dsoList})
    } else if(this.props.cityList !== prevProps.cityList) {
      let max = 0
      let cityList = this.props.cityList.map((item) => {
        if (parseInt(item.id) > max) {
          max = item.id
        }
        return {text: item.city, value: item.id}
      })
      cityList = [...cityList, {text: "All", value: parseInt(max) + 1}]
      this.setState({cityList})
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
      //filter: JSON.parse(decodeURIComponent(queryObj.filter))
    })
  }

  /**
   * Used to highlight the active tab
   * @param {String} activeTabName - Indicates the active tab name
   */
  setActiveTab(activeTab) {
    if(activeTab === "permits") {
      console.log("permits tab")
      //this.props.actions.fetchPermitDetails()
    } else {
      console.log("revenue tab")
      //this.props.actions.fetchRevenueDetails()
    }
    this.setState({ activeTab})
  }

  /**
   * Clears the applied filter
   */
  resetFilter() {
    if(this.state.filter.length > 0) {
      this.fetchDefaultData()
      this.props.history.push(`/home/overview`)
      this.setState({isFilterApplied: false})
    }
  }

  /**
   * Toggles[mount and unmounts] the filter component
   */
  mountFilterModal() {
    this.setState({ mountFilter: !this.state.mountFilter })
  }

  handleChange(e) {
    this.setState({dayInterval: this.options.find((item) => item.value === parseInt(e.target.value)).text})
    console.log("handle change", this.options.find((item) => item.value === parseInt(e.target.value)).text)
  }

  /**
   * Fetches the filtered data
   * @param {array of object} filter - Passed form FilterModal component
   */
  applyFilter(filter) {
    this.setState({filter, isFilterApplied: true})
    const queryObj = {
      filter: JSON.stringify(filter),
      activeTab: this.state.activeTab
    }
    // this.props.actions.fetchInProgressOTTP({
    //   // limit: 10,
    //   // offset: 0,
    //   filter: filter
    // })
    history.pushState(queryObj, "overview", `/home/overview?${getQueryUri(queryObj)}`)
    this.mountFilterModal()
  }

  render() {
    const {activeTab} = this.state

    return (
      <div id="overview">
        <PageHeader pageName="Overview" />
        <div style={{
          display: "flex",
          marginBottom: "20px",
          justifyContent: "flex-end"
        }}
        > 
          <div>
            <span style={{ marginRight: '10px' }}>
              <Button secondary onClick={this.resetFilter}>
                <span>Reset Filter</span>
              </Button>
            </span>
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
              labels={this.state.permitLabels} 
              values={this.state.permitValues} 
              xLabel="TIME DURATION"
              yLabel="PERMITS (NO.)"
              tooltipText="PERMITS"
            />
          }
          {
            activeTab === "revenue" &&
            <LineChart 
              labels={this.state.permitLabels} 
              values={this.state.permitValues} 
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