import React from 'react'

/**
 * Returns row for user permissions table
 * @param {object} data - user permission details
 * @param {function} handleClick - Row click callback function
 */
const UserPermissionItem = ({ data }) => {
  return (
    <tr>
      <td>{ data.user }</td>
      <td>{ data.type }</td>
      <td>{ data.status ? "Active" : "Inactive" }</td>
      <td>{ data.authentication }</td>
    </tr>
  )
}

export default UserPermissionItem
