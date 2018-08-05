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
    let fromUrl = ''
    let toUrl = ''

    if (this.props.currentRoute === 'history-ottp') {
      fromUrl = `&from_date=${filters.from}`
      toUrl = `&to_date=${filters.to}`
    }

    this.props.history.push(`/home/${this.props.currentRoute}?status=${filters.status}${fromUrl}${toUrl}`)
    this.setState({
      status: filters.status,
      from: filters.from,
      to: filters.to
    })
  }

  componentDidUpdate(prevProps) {
    if (prevProps.currentRoute !== this.props.currentRoute) {
      this.filterData.resetFilters()
    }
  }

  render() {
    const { children } = this.props
    return (
      <div style={{ marginTop: '62px', padding: '20px', width: '100%' }}>
        {
          <Filter
            ref={(node) => this.filterData = node }
            statusFilters={this.props.statusFilters}
            dsoFilters={this.props.dsoFilters}
            setFilters={this.setFilters}
            filters={this.props.filters}
            currentRoute={this.props.currentRoute}
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
