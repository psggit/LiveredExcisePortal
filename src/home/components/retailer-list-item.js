import React from 'react'
import moment from 'moment'
import Indicator from '@components/indicator'

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

const DSOListItem = ({ data, handleClick }) => {
  // const {retailer_notified_time} = data
  // const {dp_delivered_time } = data
  // const {retailer_accepted_time} = data
  // const {cancellation_time} = data
  // const {cancelled_time} = data
  // const {cancellation_return_time} = data
  // const {dp_reached_to_consumer_time} = data
  // const {dp_arrived_at_store_time} = data
  // const {dp_accepted_time} = data
  // const {dp_notified_time} = data
  // const {dp_picked_up_time} = data
  // const { dp_confirmation_time } = data
  //
  // const orderStatusArr = data.status ? data.status.split('::') : ''
  // const status = orderStatusArr[0] || ''
  // const time = eval(orderStatusArr[1]) || ''
  // const article = orderStatusArr[2] || ''
  // const orderStatus = `${status}${time}${article}`
  return (
    <tr onClick={ () => {handleClick(data)} } className="clickable">
      <td>{ data.name }</td>
      {/* <td>{ data.application_status }</td> */}
      <td>{ data.city }</td>
      <td>{ data.address }</td>
      <td>{ data.license_type }</td>
      <td>{ data.license_status ? 'Active' : 'Inactive' }</td>
    </tr>
  )
}


export default DSOListItem
