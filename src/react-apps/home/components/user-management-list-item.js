import React from 'react'
import Toggle from '@components/toggle'

const UserManagementListItem = ({ data, openAccessDeniedModal }) => {
  return (
    <tr>
      <td><Toggle isToggled={data.status} onToggle={openAccessDeniedModal} /></td>
      <td>{ data.name }</td>
      <td>{ data.mobile_number }</td>
      <td>{ data.email }</td>
      <td>{ data.role }</td>
      <td style={{ width: '180px' }} className="clickable">Edit Member Information</td>
    </tr>
  )
}

export default UserManagementListItem
