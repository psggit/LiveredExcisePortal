import React from 'react'
import Card from '@components/card'
import '@sass/_chip.scss'

function Order({ cartItems }) {
  return (
    <Card title="OTTP Information">
      <div style={{ display: 'flex' }}>
        <div className="chip">
          <span>Grand Total: </span>
          <span>
            <b>
              INR&nbsp;
              {
                cartItems.reduce((sum, item) => {
                  return sum + (item.price * item.count)
                }, 0)
              }
            </b>
          </span>
        </div>

        <div style={{ marginLeft: '20px' }} className="chip">
          <span>Total Volume: </span>
          <span>
            <b>
              {
                cartItems.reduce((sum, item) => {
                  return sum + ((parseInt(item.volume) * item.count) / 1000)
                }, 0).toFixed(2)
              }
              &nbsp;Litres
            </b>
          </span>
        </div>
      </div>

      <div style={{ marginTop: '20px' }}>
        <table>
          <thead>
            <tr>
              <th>Brand</th>
              <th>Volume</th>
              <th>Unit price</th>
              <th>Quantity</th>
              {/* <td>Total</td> */}
            </tr>
          </thead>
          <tbody>
            {
              cartItems.map((item, i) => (
                <tr key={i}>
                  <td style={{ maxWidth: '400px' }}>{ item.brand_name }</td>
                  <td>{ item.volume }</td>
                  <td>{ item.price }</td>
                  <td>{ item.count }</td>
                  {/* <td>{ }</td> */}
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    </Card>
  )
}

export default Order
