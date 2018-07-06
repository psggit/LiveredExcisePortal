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
      statusFilter: 'all',
      dateFilter: {
        from: today.toISOString(),
        to: tommorrow.toISOString()
      }
    }

    this.state = {
      isCollapsed: false,
      shouldMountDatePicker: false,
      filters: Object.assign({}, this.defaultFilters)
    }

    this.handleCollapseFilter = this.handleCollapseFilter.bind(this)
    this.handleSetOTTPStatus = this.handleSetOTTPStatus.bind(this)
    this.setDateFilter = this.setDateFilter.bind(this)
    this.handleApplyFilter = this.handleApplyFilter.bind(this)
    this.mountDate = this.mountDate.bind(this)
    this.resetFilters = this.resetFilters.bind(this)
  }

  handleSetOTTPStatus(e) {
    this.setState({
      filters: Object.assign(
        {},
        this.state.filters,
        { statusFilter: e.target.value }
      )
    })
  }

  componentDidMount() {
    this.props.setFilters(this.state.filters)
  }

  componentDidUpdate(prevProps) {
    if (this.props.currentRoute !== prevProps.currentRoute) {
      this.resetFilters()
    }
  }

  mountDate() {
    mountModal(DatePicker({
      setDate: this.setDateFilter
    }))
  }

  setDateFilter(from, to) {
    this.setState({
      filters: Object.assign(
        {},
        this.state.filters,
        { dateFilter: { from, to } }
      )
    })
  }

  resetFilters() {
    this.setState({
      filters: Object.assign({}, this.defaultFilters)
    })
  }

  handleCollapseFilter() {
    const { isCollapsed } = this.state
    this.setState({ isCollapsed: !isCollapsed })
  }

  handleApplyFilter() {
    this.props.setFilters(this.state.filters)
    this.setState({ isCollapsed: true })
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
                      `${Moment(filters.dateFilter.from).format('DD/MM/YYYY')} - ${Moment(filters.dateFilter.to).format('DD/MM/YYYY')}`
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
                <select value={filters.statusFilter} onChange={this.handleSetOTTPStatus}>
                  <option value="all">-All-</option>
                  <option value="delivered">Delivered</option>
                  <option value="cancelled">Cancelled</option>
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

          {
            currentRoute === 'history-orders' &&
            <div style={{ borderLeft: '1px solid #D0D6E2', padding: '0 20px', marginLeft: '20px' }}>
              <label>OTTP Status</label>
              <Button secondary>Download OTTP Report</Button>
            </div>
          }
        </div>
      </div>
    )
  }
}

export default Filter
