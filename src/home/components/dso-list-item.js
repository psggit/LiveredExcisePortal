import React from 'react'

/**
 * Returns row for deliver service operator table
 * @param {object} props Component props
 * @param {object} props.data - each live order details
 * @param {function} props.handleClick - Row click callback function
 */
const DSOListItem = ({ data, handleClick }) => {
  return (
    <tr onClick={() => {handleClick(data)} } className="clickable">
      <td>{ data.name }</td>
      <td>{ data.head_office.city }</td>
      <td>{ data.locations }</td>
      <td>{ data.license_type }</td>
      <td>{ data.license_status ? 'Active' : 'Inactive' }</td>
      <td>{ data.is_active ? 'Enabled' : 'Disabled' }</td>
    </tr>
  )
}

export default DSOListItem
