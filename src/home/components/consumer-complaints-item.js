import React from "react"
import Moment from "moment"

const ConsumerComplaintsItem = ({data}) => {
  return (
    <tr>
      <td>{ Moment(data.date_time).format('DD/MM/YYYY') }</td>
      <td style={{width: '70px'}}>{ Moment(data.date_time).format('h:mm A') }</td>
      <td style={{width: '180px'}}>{ data.name }</td>
      <td>{ data.age }</td>
      <td>{ data.city }</td>
      <td style={{width: '100px'}}>{data.reason}</td>
      <td>{data.complaint_message}</td>
    </tr>
  )
}

export default ConsumerComplaintsItem