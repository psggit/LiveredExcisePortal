import React from 'react'

/**
 * Returns row for user permissions table
 * @param {object} data - user permission details
 * @param {function} handleClick - Row click callback function
 */
const UserPermissionItem = ({ data }) => {
  return (
    <tr>
      <td>{data.name}</td>
      <td>{data.designation}</td>
      <td>{data.roles[0].name}</td>
      <td>{data.is_active ? "Active" : "Inactive"}</td>
    </tr>
  )
}

export default UserPermissionItem
