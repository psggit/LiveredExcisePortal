import React from 'react'
import './ottp-detail.scss'

const OttpDetailOrder = ({ order }) => (
  <div className="ottp-detail-card">
    <div className="item">
      <h4>Order Details</h4>
      <table>
        <thead>
          <tr>
            <td>No.</td>
            <td>Name</td>
            <td>Qty</td>
            <td>Volume(ml)</td>
            <td>Amount</td>
          </tr>
        </thead>
        <tbody>
          {
            order.items.map((item, i) => {
              return (
                <tr key={i}>
                  <td>{i+1}</td>
                  <td>{ item.name}</td>
                  <td>{ item.count}</td>
                  <td>{ item.volume }</td>
                  <td>{ item.price }</td>
                </tr>
              ) 
            })
          }
          <tr>
            <td></td>
            <td>Total</td>
            <td></td>
            <td>{order.total_volume}</td>
            <td>{order.total}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
)

export default OttpDetailOrder