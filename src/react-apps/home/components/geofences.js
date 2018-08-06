import React from 'react'
import { Gmaps } from 'react-gmaps'
import Card from '@components/card'
import fences from './../constants/geofences'

const params = { v: '3.exp', key: 'AIzaSyDpG-NeL-XGYAduQul2JenVr86HIPITEso' }

export function getCoordinatesInObjects(coordinatesInString) {
  const points = coordinatesInString.split('~')
  const coordinatesInObjects = points.map((point) => {
    const lat = parseFloat(point.split(',')[0])
    const lng = parseFloat(point.split(',')[1])
    return { lat, lng }
  })

  return coordinatesInObjects
}

export function displayPolygonOnMap(map, polygon) {
  // polygon.setOptions(options)
  polygon.setMap(map)
}

export function createPolygonFromCoordinates(polygonCoordiantes) {
  console.log(polygonCoordiantes.color);
  return new google.maps.Polygon({
    path: polygonCoordiantes.coordinates,
    geodesic: true,
    strokeColor: polygonCoordiantes.stroke,
    strokeOpacity: 1.0,
    fillColor: polygonCoordiantes.color,
    fillOpacity: 0.3,
    strokeWeight: 2,
    content: polygonCoordiantes.name || '',
    editable: false
  })
}

class GeoFences extends React.Component {
  constructor() {
    super()
    this.colorMap = ['#e04e73', '#6ecc80', '#4d9fbc', '#c3ce63']
    this.handleMapCreation = this.handleMapCreation.bind(this)
  }
  setGeoBoundary(map, geoboundary) {
    const polygonCoordiantes = {
      coordinates: getCoordinatesInObjects(geoboundary),
      color: 'transparent',
      stroke: 'blue'
    }
    const polygon = createPolygonFromCoordinates(polygonCoordiantes)
    displayPolygonOnMap(map, polygon)
  }

  handleMapCreation(map) {
    // var trafficLayer = new google.maps.TrafficLayer()
    // trafficLayer.setMap(map)

    const geoboundary = "13.085396307001897,77.46991264150392~12.975002746643598,77.4161826887688~12.856723087565754,77.43094550893557~12.856059097182069,77.43077610995874~12.81203459632345,77.48261558339846~12.804169309779807,77.64897084581776~12.803665082890618,77.7263747386719~12.86088789899618,77.78767432730046~12.987060813407837,77.82250510976564~13.074339562484907,77.78476317832235~13.120129366392826,77.67214491692403~13.119950255398354,77.67197276237653~13.134145435611224,77.57119285390627"
    this.setGeoBoundary(map, geoboundary)

    const polygonsCoordiantes = fences.map((geoLocalityData, i) => ({
      coordinates: getCoordinatesInObjects(geoLocalityData.coordinates),
      color: geoLocalityData.is_available ? this.colorMap[i % this.colorMap.length] : '#9b9b9b',
      stroke: geoLocalityData.is_available ? this.colorMap[i % this.colorMap.length] : '#9b9b9b',
      name: geoLocalityData.name
    }))

    const polygons = polygonsCoordiantes.map(polygonCoordiantes => (
      createPolygonFromCoordinates(polygonCoordiantes)
    ))

    polygons.forEach(polygon => {
      displayPolygonOnMap(map, polygon)
    })
  }

  render() {
    const coords = {
      lat: 12.9542946,
      lng: 77.4908533
    }

    return (
      <div style={{ width: '100%', marginTop: '62px', padding: '20px' }}>
        <Card style={{ padding: '0' }} title="Jurisdictions in bengaluru">
          <Gmaps
            lat={coords.lat}
            lng={coords.lng}
            style={{ width: '100%', height: 'calc(100vh - 144px)' }}
            zoom={11}
            params={params}
            onMapCreated={this.handleMapCreation}
          />
        </Card>
      </div>
    )
  }
}

export default GeoFences
