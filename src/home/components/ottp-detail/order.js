import React from 'react'
import './ottp-detail.scss'

const data = [
  {
    volume: '3.1 L FMFL',
    price: 'Rs/- 5800'
  },
  {
    volume: '3.1 L IMFL',
    price: 'Rs/- 800'
  },
  {
    volume: '3.1 L Beer',
    price: 'Rs/- 400'
  }
]

const OttpDetailOrder = ({ order }) => (
  <div className="ottp-detail-card">
    <div className="item">
      <h4>Order Details</h4>
      <table>
        <thead>
          <tr>
            <td>No.</td>
            <td>Name</td>
            <td>Volume(Litres)</td>
            <td>Amount</td>
          </tr>
        </thead>
        <tbody>
          {
            order.items.map((item, i) => {
              return <tr>
                      <td>{i+1}</td>
                      <td>{ item.name}</td>
                      <td>{ item.volume }</td>
                      <td>{ item.price }</td>
                    </tr>
            })
          }
          <tr>
            <td></td>
            <td>Total</td>
            <td>{order.total_volume}</td>
            <td>{order.total}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
)

export default OttpDetailOrder