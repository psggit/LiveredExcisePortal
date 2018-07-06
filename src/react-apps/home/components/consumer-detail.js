import React from 'react'
import Card from '@components/card'

function ConsumerDetail({ customerAge, customerAddress }) {
  return (
    <Card title="Consumer Information">
      <div style={{ display: 'flex' }}>
        <div>
          <p>Customer Age</p>
          <b><p>{ customerAge }</p></b>
        </div>

        <div style={{ marginLeft: '30px' }}>
          <p>Address</p>
          <b><p>{ customerAddress }</p></b>
        </div>
      </div>
    </Card>
  )
}

export default ConsumerDetail
