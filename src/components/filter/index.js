import React from 'react'
import './filter.scss'
import getIcon from './../getIcon'
import Button from './../button/index'
import DatePicker from '@components/date-picker'
import { mountModal } from '@components/ModalBox/utils'
import Moment from 'moment'

class Filter extends React.Component {
  constructor() {
    super()
    const today = new Date()
    today.setUTCHours(0, 0, 0, 0)
    const tommorrow = new Date(today.getTime())
    tommorrow.setDate(tommorrow.getDate() + 1)
    tommorrow.setUTCHours(0, 0, 0, 0)

    this.defaultFilters = {
      status: 'all',
      from: today.toISOString(),
      to: tommorrow.toISOString()
    }

    this.state = {
      isCollapsed: false,
      shouldMountDatePicker: false,
      ...this.defaultFilters
      // filters: Object.assign({}, this.defaultFilters)
    }

    this.handleCollapseFilter = this.handleCollapseFilter.bind(this)
    this.handleSetOTTPStatus = this.handleSetOTTPStatus.bind(this)
    this.setDateFilter = this.setDateFilter.bind(this)
    this.handleApplyFilter = this.handleApplyFilter.bind(this)
    this.mountDate = this.mountDate.bind(this)
    this.resetFilters = this.resetFilters.bind(this)
    this.setStatus = this.setStatus.bind(this)
  }

  componentDidMount() {
    const queryUri = location.search.slice(1)
    const queryObj = {}

    if (queryUri.length) {
      queryUri.split('&')
      .map(item => item.split('='))
      .forEach(([key, value]) => {
        queryObj[key] = value
      })

      // console.log(queryObj);
      this.setDateFilter(queryObj.from_date, queryObj.to_date)
      this.setStatus(queryObj.status)
      this.props.setFilters({
        from: queryObj.from_date,
        to: queryObj.to_date,
        status: queryObj.status
      })
    } else {
      this.props.setFilters(this.defaultFilters)
    }
  }

  setStatus(val) {
    this.setState({ status: val })
  }

  handleSetOTTPStatus(e) {
    this.setStatus(e.target.value)
  }

  mountDate() {
    mountModal(DatePicker({
      setDate: this.setDateFilter
    }))
  }

  setDateFilter(from, to) {
    this.setState({ from, to })
  }

  resetFilters() {
    this.setState(Object.assign({}, this.state, this.defaultFilters))
    this.props.setFilters(this.defaultFilters)
  }

  handleCollapseFilter() {
    const { isCollapsed } = this.state
    this.setState({ isCollapsed: !isCollapsed })
  }

  handleApplyFilter() {
    const { status, from, to } = this.state
    this.props.setFilters({
      status,
      from,
      to
    })
    // this.setState({ isCollapsed: true })
  }

  render() {
    const { isCollapsed, filters } = this.state
    const { currentRoute } = this.props
    // const filterItemsJSX = {
    //   date: [
    //     <div className="filter-item">
    //       <label>OTTP Date Range</label>
    //       <div className="date-filter">
    //         <input
    //           value={
    //             `${Moment(filters.dateFilter.from).format('DD/MM/YYYY')} - ${Moment(filters.dateFilter.to).format('DD/MM/YYYY')}`
    //           }
    //           readOnly
    //           onFocus={this.mountDate}
    //           type="text"
    //         />
    //         <span onClick={this.mountDate}>{ getIcon('calendar') }</span>
    //       </div>
    //     </div>,
    //   ],
    //   status: [
    //     <div className="filter-item">
    //       <label>OTTP Status</label>
    //       <select value={filters.statusFilter} onChange={this.handleSetOTTPStatus}>
    //         <option value='all'>-All-</option>
    //         <option value='delivered'>Delivered</option>
    //         <option value='cancelled'>Cancelled</option>
    //       </select>
    //     </div>
    //   ]
    // }

    // const filtersToBeRendered = []
    // this.props.filterTypes.forEach(type => {
    //   if (filterItemsJSX[type]) filtersToBeRendered.unshift(filterItemsJSX[type])
    // })
    return (
      <div className="filter-box">
        <div onClick={this.handleCollapseFilter} className="filter-box__header">
          <span
            className={ isCollapsed ? 'rotated' : '' }
          >
            { getIcon('down-arrow') }
          </span>
          <span>Filters</span>
        </div>
        <div className={`filter-box__body ${isCollapsed ? 'collapsed' : ''}`}>
          <div className="filter-items">

            {
              this.props.filters.indexOf('date') > -1 &&
              <div className="filter-item">
                <label>OTTP Date Range</label>
                <div className="date-filter">
                  <input
                    value={
                      `${Moment(this.state.from).format('DD/MM/YYYY')} - ${Moment(this.state.to).format('DD/MM/YYYY')}`
                    }
                    readOnly
                    onFocus={this.mountDate}
                    type="text"
                  />
                  <span onClick={this.mountDate}>{ getIcon('calendar') }</span>
                </div>
              </div>
            }

            {
              this.props.filters.indexOf('status') > -1 &&
              <div className="filter-item">
                <label>OTTP Status</label>
                <select value={this.state.status} onChange={this.handleSetOTTPStatus}>
                  {
                    this.props.statusFilters.map((item, i) => (
                      <option key={i} value={item.value}>{ item.label }</option>
                    ))
                  }
                </select>
              </div>
            }

          </div>

          <div style={{ marginRight: '20px' }}>
            <Button primary onClick={this.handleApplyFilter}>Apply Filter</Button>
          </div>
          <div>
            <Button onClick={this.resetFilters} secondary>Reset to default</Button>
          </div>

          {/* {
            currentRoute === 'history-ottp' &&
            <div style={{ borderLeft: '1px solid #D0D6E2', padding: '0 20px', marginLeft: '20px' }}>
              <label>OTTP Status</label>
              <Button secondary>Download OTTP Report</Button>
            </div>
          } */}
        </div>
      </div>
    )
  }
}

export default Filter
