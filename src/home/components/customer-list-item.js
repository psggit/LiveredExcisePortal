import React from "react"

const ConsumerListItem = ({data}) => {
  console.log("data", data)
  return (
    <tr>
      <td>{ data.phone }</td>
      <td>{ data.age }</td>
      <td>{ data.address}</td>
      {/* <td>{ data.license_type}</td> */}
      <td></td>
      <td></td>
      <td></td>
      {/* <td>{ data.is_active ? 'Active' : 'Inactive'}</td> */}
    </tr>
  )
}

export default ConsumerListItem