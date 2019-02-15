import React from 'react'
import moment from 'moment'

const LiveOrdersListItem = ({ data, handleClick, handleOrderAssign, handleShowNotes }) => {
  return (
    <tr onClick={ (e) => {handleClick(data)} } className="clickable">
      <td>{ data.ottp_info.ottp_id }</td>
      <td>{ moment(data.ottp_info.issued_at).format("YYYY/MM/DD, h:mm A") }</td>
      {/* <td>{ data.issued_time }</td> */}
      <td>{ data.dso.name }</td>
      <td>{ data.retailer.name }</td>
      <td> Chennai </td>
      <td>{ data.order.total }</td>
      <td>{ data.ottp_info.ottp_status }</td>
      <td>{`valid till ${ moment(data.ottp_info.expiry_at).format("h:mm A") }`}</td>
    </tr>
  )
}


export default LiveOrdersListItem
