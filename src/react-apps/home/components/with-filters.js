import React from 'react'
import Filter from '@components/filter'

class WithFilters extends React.Component {
  render() {
    return (
      <div style={{ marginTop: '62px' }}>
        {
          <Filter currentRoute={this.props.currentRoute} />
        }
        <div style={{ marginTop: '20px' }}>
          { this.props.children }
        </div>
      </div>
    )
  }
}

export default WithFilters
