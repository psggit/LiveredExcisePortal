import React from 'react'
import Card from '@components/card'

function RetailerDetail({ retailerName }) {
  return (
    <Card title="Retailer Information">
      <div style={{ display: 'flex' }}>
        <div>
          <p>Retailer Name</p>
          <b><p>{ retailerName }</p></b>
        </div>
      </div>
    </Card>
  )
}

export default RetailerDetail
