import React from 'react'
import Moment from 'moment'

/**
 * Returns row for live orders table
 * @param {object} props Component props
 * @param {object} props.data - each live order details
 * @param {function} props.handleClick - Row click callback function
 */
const LiveOrdersListItem = ({ data, handleClick }) => {
  return (
    <tr onClick={ () => {handleClick(data)} } className="clickable">
      <td>{ data.ottp_info.ottp_id }</td>
      <td>{ moment(data.ottp_info.issued_at).format("YYYY/MM/DD, h:mm A") }</td>
      <td>{ data.dso.name }</td>
      <td>{ data.retailer.name }</td>
      <td>{ data.consumer.city }</td>
      <td>{ data.order.total }</td>
      <td>{ data.ottp_info.status }</td>
      <td>{`valid till ${ Moment(data.ottp_info.expiry_at).format("h:mm A") }`}</td>
    </tr>
  )
}

export default LiveOrdersListItem
