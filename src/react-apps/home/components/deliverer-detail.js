import React from 'react'
import Card from '@components/card'

function DeliveryAgentDetail({ deliveryAgentName }) {
  return (
    <Card title="Delivery Agent Information">
      <div style={{ display: 'flex' }}>
        <div>
          <p>Agent Name</p>
          <b><p>{ deliveryAgentName }</p></b>
        </div>

        <div style={{ marginLeft: '30px' }}>
          <p>Vehicle Number</p>
          <b><p>KA03-AS3929</p></b>
        </div>
      </div>
    </Card>
  )
}

export default DeliveryAgentDetail
