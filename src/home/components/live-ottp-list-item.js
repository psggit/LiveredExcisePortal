import React from 'react'
// import Moment from 'moment'

const LiveOrdersListItem = ({ data, handleClick, handleOrderAssign, handleShowNotes }) => {
  return (
    <tr onClick={ (e) => {handleClick(data.permit_id, e)} }>
      <td className="clickable">{ data.permit_id }</td>
      <td>{ data.issued_date }</td>
      <td>{ data.issued_time }</td>
      <td>{ data.dso_name }</td>
      <td>{ data.retailer_name }</td>
      <td>{ data.city }</td>
      <td>{ data.order_amount }</td>
      <td>{ data.permit_status }</td>
      <td>{`valid till ${ data.validity }`}</td>
    </tr>
  )
}


export default LiveOrdersListItem
