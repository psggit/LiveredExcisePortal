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
    this.defaultFilters = {
      statusFilter: 'all',
      dateFilter: {
        from: 'frg',
        to: 'om'
      }
    }

    this.filters = Object.assign({}, this.defaultFilters)
    this.state = {
      isCollapsed: false,
      shouldMountDatePicker: false,
      dateFilter: {
        from: new Date(),
        to: new Date()
      }
    }

    this.handleCollapseFilter = this.handleCollapseFilter.bind(this)
    this.handleSetOTTPStatus = this.handleSetOTTPStatus.bind(this)
    this.setDateFilter = this.setDateFilter.bind(this)
    this.handleApplyFilter = this.handleApplyFilter.bind(this)
    this.mountDate = this.mountDate.bind(this)
    this.resetFilters = this.resetFilters.bind(this)
  }

  handleSetOTTPStatus(e) {
    this.filters.statusFilter = e.target.value
  }

  mountDate() {
    mountModal(DatePicker({
      setDate: this.setDateFilter
    }))
  }

  setDateFilter(from, to) {
    this.filters.dateFilter = {
      from,
      to
    }
  }

  resetFilters() {
    this.filters = Object.assign({}, this.defaultFilters)
    console.log(this.filters);
  }

  handleCollapseFilter() {
    const { isCollapsed } = this.state
    this.setState({ isCollapsed: !isCollapsed })
  }

  handleApplyFilter() {
    console.log(this.filters);
  }

  render() {
    const { isCollapsed, dateFilter } = this.state
    const filterItemsJSX = {
      date: [
        <div className="filter-item">
          <label>OTTP Date Range</label>
          <div className="date-filter">
            <input
              value={
                `${Moment(dateFilter.from).format('DD/MM/YYYY')} - ${Moment(dateFilter.to).format('DD/MM/YYYY')}`
              }
              readOnly
              onFocus={this.mountDate}
              type="text"
            />
            <span onClick={this.mountDate}>{ getIcon('calendar') }</span>
          </div>
        </div>,
      ],
      status: [
        <div className="filter-item">
          <label>OTTP Status</label>
          <select onChange={this.handleSetOTTPStatus}>
            <option value='all'>-All-</option>
            <option value='delivered'>Delivered</option>
            <option value='cancelled'>Cancelled</option>
          </select>
        </div>
      ]
    }

    const filtersToBeRendered = []
    this.props.filterTypes.forEach(type => {
      if (filterItemsJSX[type]) filtersToBeRendered.unshift(filterItemsJSX[type])
    })

    return (
      <div className="filter-box">
        <div className="filter-box__header">
          <span
            className={ isCollapsed ? 'rotated' : '' }
            onClick={this.handleCollapseFilter}
          >
            { getIcon('down-arrow') }
          </span>
          <span>Filters</span>
        </div>
        <div className={`filter-box__body ${isCollapsed ? 'collapsed' : ''}`}>
          <div className="filter-items">
            { filtersToBeRendered }
          </div>

          <div style={{ marginRight: '20px' }}>
            <Button primary onClick={this.handleApplyFilter}>Apply Filter</Button>
          </div>
          <div>
            <Button onClick={this.resetFilters} secondary>Reset to default</Button>
          </div>

          {
            this.props.currentRoute === 'history-orders' &&
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
