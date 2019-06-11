import React from "react"
import "./dso-detail.scss"
import Locations from "./locations"

class LocationDetails extends React.Component {
  constructor() {
    super()
  }

  render() {
    return (
      <div className="location-details">
        <p className="title">Locations and regional offices details</p>
        <table>
          <thead>
            <tr>
              <th>State</th>
              <th>Cities</th>
              <th>Regional Office (City)</th>
              <th>Address</th>
              <th>Primary Contact</th>
            </tr>
          </thead>
          <tbody>
            {
              this.props.locations.map((item, i) => {
                return (
                  <Locations
                    key={i}
                    data={item}
                  />
                )
              })
            }
            {
              this.props.locations.length === 0 && (
                <tr>
                  <td style={{ textAlign: "center" }} colSpan="4">
                    No locations found
                  </td>
                </tr>
              )}
          </tbody>
        </table>
      </div>
    )
  }
}

export default LocationDetails