import React from "react"

const ConsumerListItem = ({data}) => {
  console.log("data", data)
  return (
    <tr>
      <td>{ data.phone }</td>
      <td>{ data.age }</td>
      <td>{ data.address}</td>
      <td>{ data.city }</td>
      <td></td>
      <td></td>
    </tr>
  )
}

export default ConsumerListItem