import React from 'react'
import moment from 'moment'
import Icon from '@components/icon'

// function getTimeDiff(d2) {
//   const d1 = new Date()
//   return Math.round(
//     (d1 - new Date(d2)) / 60000
//   )
// }

// function Moment(time) {
//   return {
//     format: function(format) {
//       return moment(time).format('MMM Do YY, h:mm a')
//     }
//   }
// }

const HistoryOrdersListItem = ({ data, handleClick }) => {
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

  // const orderStatusArr = data.status ? data.status.split('::') : ''
  // const status = orderStatusArr[0] || ''
  // const time = eval(orderStatusArr[1]) || ''
  // const article = orderStatusArr[2] || ''
  // const orderStatus = `${status}${time}${article}`
  return (
    <tr onClick={(e) => {handleClick(data)} } className="clickable">
      <td>{ data.ottp_info.ottp_id }</td>
      <td style={{width: '100px'}}>{ moment(data.ottp_info.issued_at).format("DD/MM/YYYY, h:mm A") }</td>
      <td>{ data.dso.name }</td>
      <td>{ data.retailer.name }</td>
      <td>Chennai</td>
      <td>{ data.order.total }</td>
      <td>{ data.order.total_volume }</td>
      <td>
        <div style={{display: 'flex', alignItems: 'center'}}>
          <span style={{marginRight: '5px'}}><Icon name="expired" /></span>
          {data.ottp_info.status}
        </div>
      </td>
      <td>
        <div style={{display: 'flex', alignItems: 'flex-start'}}>
          <span style={{marginRight: '5px'}}><Icon name="green-flag" /></span>
          Verified
          {/* {data.consumer.is_verified ? "Verified" : ""} */}
        </div>
      </td>
    </tr>
  )
}


export default HistoryOrdersListItem
