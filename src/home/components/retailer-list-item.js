import React from 'react'

/**
 * Returns row for retailers table
 * @param {object} data - retailer details
 * @param {function} handleClick - Row click callback function
 */
const RetailerListItem = ({ data, handleClick }) => {
  return (
    <tr onClick={ () => {handleClick(data)} } className="clickable">
      <td>{ data.name }</td>
      <td>{ data.city }</td>
      <td>{ data.primary_address }</td>
      <td>{ data.license_type }</td>
      <td>{ data.license_status ? 'Active' : 'Inactive' }</td>
      <td>{ data.is_active ? 'Enabled' : 'Disabled' }</td>
    </tr>
  )
}

export default RetailerListItem
