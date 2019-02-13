import React from 'react'
import { Gmaps } from 'react-gmaps'
import Card from '@components/card'
import fences from './../constants/jurisdictions'

const params = { v: '3.exp', key: 'AIzaSyDpG-NeL-XGYAduQul2JenVr86HIPITEso' }
//const infoWindow = new google.maps.InfoWindow

export function getCoordinatesInObjects(coordinatesInString) {
  const points = coordinatesInString.split('~')
  const coordinatesInObjects = points.map((point) => {
    const lat = parseFloat(point.split(',')[0])
    const lng = parseFloat(point.split(',')[1])
    return { lat, lng }
  })

  return coordinatesInObjects
}

export function getPolygonCenter(poly, format = 'latLngObj') {
  let lowx
  let highx
  let lowy
  let highy
  const lats = []
  const lngs = []
  const vertices = poly.getPath()

  for (let i = 0; i < vertices.length; i += 1) {
    lngs.push(vertices.getAt(i).lng());
    lats.push(vertices.getAt(i).lat());
  }

  lats.sort()
  lngs.sort()
  lowx = lats[0]
  highx = lats[vertices.length - 1]
  lowy = lngs[0]
  highy = lngs[vertices.length - 1]
  const center_x = lowx + ((highx - lowx) / 2)
  const center_y = lowy + ((highy - lowy) / 2)
  if (format === 'json') {
    return {
      lat: center_x,
      lng: center_y
    }
  }
  return (new google.maps.LatLng(center_x, center_y))
}

export function labelPolygon(map, polygon) {
  infoWindow.setContent(polygon.content)
  infoWindow.setPosition(getPolygonCenter(polygon))
  infoWindow.open(map)
}

export function displayPolygonOnMap(map, polygon) {
  // polygon.setOptions(options)
  polygon.setMap(map)
}

export function attachClickEventOnPolygon(polygon, listener) {
  google.maps.event.addListener(polygon, 'click', listener)
}

export function attachBlurEventOnPolygon(polygon, listener) {
  google.maps.event.addListener(polygon, 'mouseout', listener)
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

    const geoboundary = `
    13.005694447586281,77.81582437424993~12.973738135682455,77.8177448676854~12.93507819149214,77.81689437657315~12.93507819149214,77.81620773106533~12.936416630739014,77.81758102208096~12.937085847669294,77.81758102208096~12.911650447057566,77.8169030268109~12.88822480524178,77.81793612917727~12.870155281164433,77.81895431309658~12.861452993211739,77.8196409586044~12.858775305424906,77.82238754063565~12.862457980521686,77.82032757559068~12.849068447770593,77.79732497960049~12.840365428879881,77.7811888101669~12.822623726616222,77.75715621739346~12.813250246896644,77.7262571695419~12.810572045760956,77.70153793126065~12.81592841956003,77.66445907383877~12.813250246896606,77.61502059727627~12.814618867182414,77.55309233943319~12.814589336787682,77.42661807389243~12.933739745064207,77.42387149186118~12.98459565518075,77.42387149186118~13.102327218848743,77.42936465592368~13.106339805547101,77.4911627516268~13.111689819368783,77.53785464615805~13.09676800628622,77.59244296402915~13.10947459338304,77.6501211866854~13.106130818271444,77.67278048844321~13.108137088791137,77.7215323194979~13.124855373405474,77.7819571241854~13.116830738648947,77.81148288102133~13.070684010945861,77.81628939957602~13.070018374808786,77.81526817251438~13.035901062343724,77.81422946305258
    `
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
      attachClickEventOnPolygon(polygon, () => {
        labelPolygon(map, polygon)
      })
      // attachBlurEventOnPolygon(polygon, labelPolygon)
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
