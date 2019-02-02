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

const OttpDetailOrder = ({ name, sourceRetailer }) => (
  <div className="ottp-detail-card">
    <div className="item">
      <h4>Order Details</h4>
      <table>
        <tbody>
          {
            data.map(item => (
              <tr>
                <td>
                  { item.volume }
                </td>
                <td>
                  { item.price }
                </td>
              </tr>
            ))
          }
          <tr>
            <td>Total Order Cost</td>
            <td>Rs. 7000</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
)

export default OttpDetailOrder