import React from 'react'
import moment from 'moment'
import { getHasuraRole } from '@utils/session'

function getTimeDiff(d2) {
  const d1 = new Date()
  return Math.round(
    (d1 - new Date(d2)) / 60000
  )
}

function Moment(time) {
  return {
    format: function(format) {
      return moment(time).format('MMM Do YY, h:mm a')
    }
  }
}

const LiveOrdersListItem = ({ data, handleClick, handleOrderAssign, handleShowNotes }) => {
  const {retailer_notified_time} = data
  const {dp_delivered_time } = data
  const {retailer_accepted_time} = data
  const {cancellation_time} = data
  const {cancelled_time} = data
  const {cancellation_return_time} = data
  const {dp_reached_to_consumer_time} = data
  const {dp_arrived_at_store_time} = data
  const {dp_accepted_time} = data
  const {dp_notified_time} = data
  const {dp_picked_up_time} = data
  const { dp_confirmation_time } = data

  const orderStatusArr = data.status ? data.status.split('::') : ''
  const status = orderStatusArr[0] || ''
  const time = eval(orderStatusArr[1]) || ''
  const article = orderStatusArr[2] || ''
  const orderStatus = `${status}${time}${article}`

  let orderPlacedWaitingTime = null
  if (data.order_placed_time) {
    orderPlacedWaitingTime = getTimeDiff(data.order_placed_time)
  }

  return (
    <tr onClick={ (e) => {handleClick(data.ottp_id, e)} }>
      <td className="clickable">{ data.ottp_id }</td>
      <td>{ Moment(data.ottp_issued_time).format("DD/MM/YYYY, h:mm") }</td>
      <td>{ data.ottp_status }</td>
      <td>{ data.agent_name }</td>
      <td>{ data.vehicle_number }</td>
      <td>{ data.retailer_name }</td>
    </tr>
  )
}


export default LiveOrdersListItem