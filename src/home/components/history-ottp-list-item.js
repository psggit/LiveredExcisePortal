import React from 'react'
import moment from 'moment'
import Icon from '@components/icon'

/**
 * Returns row for past orders table
 * @param {object} data - past order details
 * @param {function} handleClick - Row click callback function
 */
const HistoryOrdersListItem = ({ data, handleClick }) => {
  return (
    <tr onClick={() => { handleClick(data) }} className="clickable">
      <td>{data.ottp_info.ottp_id}</td>
      <td style={{ width: '100px' }}>{moment(data.ottp_info.issued_at).format("DD/MM/YYYY")}</td>
      <td style={{ width: '100px' }}>{moment(data.ottp_info.issued_at).format("h:mm A")}</td>
      <td>{data.dso.name}</td>
      <td>{data.retailer.name}</td>
      <td>{data.consumer.city}</td>
      <td>₹ {data.order.total}</td>
      <td>{data.order.total_volume / 1000}</td>
      <td>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <span style={{ marginRight: '5px' }}><Icon name="expired" /></span>
          {data.ottp_info.status}
        </div>
      </td>
      <td>
        <div style={{ display: 'flex', alignItems: 'flex-start' }}>
          <span style={{ marginRight: '5px' }}><Icon name="green-flag" /></span>
          Verified
        </div>
      </td>
    </tr>
  )
}

export default HistoryOrdersListItem
