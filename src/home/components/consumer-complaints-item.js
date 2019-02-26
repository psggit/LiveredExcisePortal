import React from "react"
import Moment from "moment"

const ConsumerComplaintsItem = ({data}) => {
  //console.log("data", data)
  return (
    <tr>
      <td>{ Moment(data.date_time).format('DD/MM/YYYY') }</td>
      <td>{ Moment(data.date_time).format('h:mm A') }</td>
      <td>{ data.phone_number }</td>
      <td>{ data.age }</td>
      <td>{ data.address}</td>
      {/* <td>{ data.license_type}</td> */}
      {/* <td></td> */}
      {/* <td></td> */}
      <td>{data.reason}</td>
      <td>{data.complaint_message}</td>
      {/* <td>{ data.is_active ? 'Active' : 'Inactive'}</td> */}
    </tr>
  )
}

export default ConsumerComplaintsItem