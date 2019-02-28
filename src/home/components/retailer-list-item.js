import React from 'react'

const RetailerListItem = ({ data, handleClick }) => {
  return (
    <tr onClick={ () => {handleClick(data)} } className="clickable">
      <td>{ data.name }</td>
      <td>{ data.city_name }</td>
      <td>{ data.primary_address }</td>
      <td>{ data.license_type }</td>
      <td>{ data.license_status ? 'Active' : 'Inactive' }</td>
      <td>{ data.is_active ? 'Enabled' : 'Disabled' }</td>
    </tr>
  )
}

export default RetailerListItem
