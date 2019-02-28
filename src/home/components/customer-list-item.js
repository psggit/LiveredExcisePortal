import React from "react"

const ConsumerListItem = ({data}) => {
  return (
    <tr>
      <td>{ data.name }</td>
      <td>{ data.age }</td>
      <td>{ data.address}</td>
      <td>{ data.city }</td>
    </tr>
  )
}

export default ConsumerListItem