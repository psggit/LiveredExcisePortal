import React from "react"

const Locations = ({ data }) => {
  return (
    <tr>
      <td>{data.state_name}</td>
      <td>{data.city_list}</td>
      <td>{data.reg_office_city}</td>
      <td>{data.reg_office_address}</td>
      <td>
        <div>
          <p>{data.reg_office_contact_name}</p>
          <p>{data.reg_office_contact_email}</p>
          <p>{data.reg_office_contact_phone}</p>
        </div>
      </td>
    </tr>
  )
}

export default Locations