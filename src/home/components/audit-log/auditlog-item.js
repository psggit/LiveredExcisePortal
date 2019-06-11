import React from 'react'
import Moment from 'moment'

/**
 * Returns row for audit log table
 * @param {object} data - audit log details
 */
const AuditLogItem = ({ data }) => {
  console.log("data", data)
  return (
    <tr>
      <td>{Moment(data.created_at).format("DD-MM-YYYY")}</td>
      <td>{Moment(data.created_at).format("h:mm A")}</td>
      <td>{data.name}</td>
      <td>{data.message}</td>
      <td>{data.module}</td>
    </tr>
  )
}

export default AuditLogItem
