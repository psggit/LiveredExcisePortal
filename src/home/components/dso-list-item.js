import React from 'react'

/**
 * Returns row for deliver service operator table
 * @param {object} data - delivery service operator details
 * @param {function} handleClick - Row click callback function
 */
const DSOListItem = ({ data, handleClick }) => {
  return (
    <tr onClick={() => {handleClick(data)} } className="clickable">
      <td>{ data.dso_name }</td>
      <td>{ data.head_office.city }</td>
      <td>{ data.locations }</td>
      <td>{ data.is_validated ? "Validated" : "Not Validated"}</td>
      <td>{ data.is_active ? 'Enabled' : 'Disabled' }</td>
    </tr>
  )
}

export default DSOListItem
