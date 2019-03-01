import React from "react"

/**
 * Returns row for consumer table
 * @param {object} data - consumer details
 */
const ConsumerListItem = ({data}) => {
  return (
    <tr>
      <td>{ data.name }</td>
      <td>{ data.age }</td>
      <td>{ data.city }</td>
      <td>{ data.address}</td>
    </tr>
  )
}

export default ConsumerListItem