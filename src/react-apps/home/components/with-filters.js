import React from 'react'
import Filter from '@components/filter'

class WithFilters extends React.Component {
  constructor() {
    // const today = new Date()
    // today.setUTCHours(0, 0, 0, 0)
    // const tommorrow = new Date(today.getTime())
    // tommorrow.setDate(tommorrow.getDate() + 1)
    // tommorrow.setUTCHours(0, 0, 0, 0)

    super()
    this.state = {}
    this.setFilters = this.setFilters.bind(this)
  }

  // shouldComponentUpdate(nextProps, nextState) {
  //   if (JSON.stringify(this.state) !== JSON.stringify(nextState)) return true
  //   return false
  // }

  setFilters(filters) {
    this.setState({
      status: filters.statusFilter,
      from: filters.dateFilter.from,
      to: filters.dateFilter.to
    })
  }
  render() {
    const { children } = this.props
    return (
      <div style={{ marginTop: '62px', padding: '20px' }}>
        {
          <Filter
            statusFilters={this.props.statusFilters}
            setFilters={this.setFilters}
            filters={this.props.filters}
          />
        }
        <div style={{ marginTop: '20px' }}>
          {
            React.Children.map(children, (child) => {
              return React.cloneElement(child, {
                filters: this.state
              })
            })
          }
        </div>
      </div>
    )
  }
}

export default WithFilters
