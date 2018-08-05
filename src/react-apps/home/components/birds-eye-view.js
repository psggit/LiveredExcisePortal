import React from 'react'
import { Gmaps, Marker } from 'react-gmaps'
import Card from '@components/card'
import customerImg from './../../../../images/customer.svg'
import delivererImg from './../../../../images/deliverer.svg'
import retailerImg from './../../../../images/retailer.svg'

const params = { v: '3.exp', key: 'AIzaSyDpG-NeL-XGYAduQul2JenVr86HIPITEso' }

function calculateAndDisplayRoute(directionsService, directionsDisplay, origin, destination, waypoints) {
  directionsService.route({
    origin,
    destination,
    waypoints,
    optimizeWaypoints: true,
    travelMode: 'DRIVING'
  }, function(response, status) {
    if (status === 'OK') {
      directionsDisplay.setDirections(response)
    } else {
      window.alert('Directions request failed due to ' + status)
    }
  })
}

const customerGpsArr = [
  {
    lat: 12.9135432,
    lng: 77.6038353
  },
  {
    lat: 12.9665815,
    lng: 77.5401663
  },
  {
    lat: 12.9323202,
    lng: 77.6573239
  }
]

const retailerGpsArr = [
  {
    lat: 12.9377407,
    lng: 77.6085591
  },
  {
    lat: 12.9566721,
    lng: 77.4908512
  }
]

const delivererGpsArr = [
  {
    lat: 13.0057799,
    lng: 77.4848331
  },
  {
    lat: 12.9729803,
    lng: 77.6295003
  },
  {
    lat: 12.9102997,
    lng: 77.6281508
  }
]

var styles = {
  default: null,
  hide: [
    {
      featureType: 'poi.business',
      stylers: [{visibility: 'off'}]
    },
    {
      featureType: 'transit',
      elementType: 'labels.icon',
      stylers: [{visibility: 'off'}]
    },
    {
      featureType: 'landscape.natural',
      elementType: 'geometry',
      stylers: [{visibility: 'off'}]
    }
  ]
}

class BirdsEyeView extends React.Component {
  constructor() {
    super()
    this.state = {
      lat: 12.967343069791152,
      lng: 77.60037325849612
    }
    this.handleMapCreation = this.handleMapCreation.bind(this)
    this.handleCenterChange = this.handleCenterChange.bind(this)
  }
  handleMapCreation(map) {
    const directionsService = new google.maps.DirectionsService
    const directionsDisplay1 = new google.maps.DirectionsRenderer
    const directionsDisplay2 = new google.maps.DirectionsRenderer
    const directionsDisplay3 = new google.maps.DirectionsRenderer

    map.setOptions({ styles: styles.hide })

    directionsDisplay1.setMap(map)
    directionsDisplay2.setMap(map)
    directionsDisplay3.setMap(map)

    directionsDisplay1.setOptions( { suppressMarkers: true, preserveViewport: true, polylineOptions: { strokeColor: '#ff3b34', strokeWeight: 6, strokeOpacity: 0.7 } } )
    directionsDisplay2.setOptions( { suppressMarkers: true, preserveViewport: true, polylineOptions: { strokeColor: '#ff3b34', strokeWeight: 6, strokeOpacity: 0.7 } } )
    directionsDisplay3.setOptions( { suppressMarkers: true, preserveViewport: true, polylineOptions: { strokeColor: '#ff3b34', strokeWeight: 6, strokeOpacity: 0.7 } } )
    this.map = map
    const path1Coords = []
    const path2Coords = []
    const path3Coords = []

    // path1Coords.push(retailerGpsArr[1])
    // path1Coords.push(customerGpsArr[1])
    //
    // path2Coords.push(retailerGpsArr[0])
    // path2Coords.push(customerGpsArr[0])
    //
    // path3Coords.push(retailerGpsArr[0])
    // path3Coords.push(customerGpsArr[2])

    // const path1 = new google.maps.Polyline({
    //   path: path1Coords,
    //   geodesic: true,
    //   strokeColor: 'red',
    //   strokeOpacity: 1.0,
    //   strokeWeight: 4
    // })

    const originPath1 = `${retailerGpsArr[1].lat},${retailerGpsArr[1].lng}`
    const destinationpath1 = `${customerGpsArr[1].lat},${customerGpsArr[1].lng}`
    const wps1 = [{ location: `${delivererGpsArr[0].lat},${delivererGpsArr[0].lng}`, stopover: true }]

    const originPath2 = `${retailerGpsArr[0].lat},${retailerGpsArr[0].lng}`
    const destinationpath2 = `${customerGpsArr[0].lat},${customerGpsArr[0].lng}`
    const wps2 = [{ location: `${delivererGpsArr[1].lat},${delivererGpsArr[1].lng}`, stopover: true }]

    const originPath3 = `${retailerGpsArr[0].lat},${retailerGpsArr[0].lng}`
    const destinationpath3 = `${customerGpsArr[2].lat},${customerGpsArr[2].lng}`
    const wps3 = [{ location: `${delivererGpsArr[2].lat},${delivererGpsArr[2].lng}`, stopover: true }]

    calculateAndDisplayRoute(directionsService, directionsDisplay1, originPath1, destinationpath1, wps1)
    calculateAndDisplayRoute(directionsService, directionsDisplay2, originPath2, destinationpath2, wps2)
    calculateAndDisplayRoute(directionsService, directionsDisplay3, originPath3, destinationpath3, wps3)

    // const path2 = new google.maps.Polyline({
    //   path: path2Coords,
    //   geodesic: true,
    //   strokeColor: 'blue',
    //   strokeOpacity: 1.0,
    //   strokeWeight: 4
    // })
    //
    // const path3 = new google.maps.Polyline({
    //   path: path3Coords,
    //   geodesic: true,
    //   strokeColor: 'green',
    //   strokeOpacity: 1.0,
    //   strokeWeight: 4
    // })

      // path1.setMap(map)
      // path2.setMap(map)
      // path3.setMap(map)
  }

  handleCenterChange() {
    console.log(this.map.getCenter().lat(), this.map.getCenter().lng())
    // this.setState({
    //   lat: this.map.getCenter().lat(),
    //   lng: this.map.getCenter().lng()
    // })
  }
  render() {
    return (
      <div style={{ width: '100%', marginTop: '62px', padding: '20px' }}>
        <Card style={{ padding: '0' }} title="Live view">
          <Gmaps
            lat={this.state.lat}
            lng={this.state.lng}
            style={{ width: '100%', height: 'calc(100vh - 144px)' }}
            zoom={12}
            params={params}
            onMapCreated={this.handleMapCreation}
          >
            {
              customerGpsArr.map(item => (
                <Marker
                  icon={customerImg}
                  lat={item.lat}
                  lng={item.lng}
                />
              ))
            }
            {
              delivererGpsArr.map(item => (
                <Marker
                  icon={delivererImg}
                  lat={item.lat}
                  lng={item.lng}
                />
              ))
            }
            {
              retailerGpsArr.map(item => (
                <Marker
                  icon={retailerImg}
                  lat={item.lat}
                  lng={item.lng}
                />
              ))
            }
          </Gmaps>
        </Card>
      </div>
    )
  }
}

export default BirdsEyeView
