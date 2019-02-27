import React from 'react'

const DSOListItem = ({ data, handleClick }) => {
  return (
    <tr onClick={(e) => {handleClick(data)} } className="clickable">
      <td>{ data.name }</td>
      <td>{ data.head_office.city }</td>
      <td>{ data.locations }</td>
      <td>{ data.license_type }</td>
      <td>{ data.license_status ? 'Active' : 'Inactive' }</td>
    </tr>
  )
}

export default DSOListItem
