import React from 'react'
import { dsoCarriers } from './../constants/dso-carriers'
import Toggle from '@components/toggle'

class DSOCarriersList extends React.Component {
  render() {
    return (
      <table>
        <thead>
          <tr>
            <th>Carrier status</th>
            <th>Carrier name</th>
            <th>Vehicle number</th>
            <th>Mobile number</th>
            <th>Aadhar card</th>
          </tr>
        </thead>
        <tbody>
          {
            dsoCarriers.map((item, i) => (
              <tr key={i}>
                <td>
                  <Toggle isToggled={item.status} />
                  <span style={{ marginLeft: '20px' }}>
                    { item.status ? 'Allowed to carry' : 'Not allowed to carry'}
                  </span>
                </td>
                <td>{ item.name }</td>
                <td>{ item.vehicle_number }</td>
                <td>{ item.mobile_number }</td>
                <td>{ item.aadhar_number }</td>
              </tr>
            ))
          }
        </tbody>
      </table>
    )
  }
}

export default DSOCarriersList
