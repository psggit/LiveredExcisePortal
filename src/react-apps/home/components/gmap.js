import React, { Component } from 'react'
import { Gmaps, Marker, InfoWindow } from 'react-gmaps';
import { Api } from '@utils/config'
// const customerImg = './../../assets/icons/customer.svg';
import delivererImg from  './../../../../images/deliverer.svg';
// const outletImg = './../../assets/icons/retailer.svg';

// import customer from '/icons/customer.svg'
// console.log(customer)
// import { getIcon } from './../utils'
// import { Map } from 'immutable';

const params = {v: '3.exp', key: 'AIzaSyDpG-NeL-XGYAduQul2JenVr86HIPITEso'};

class Gmap extends Component {
  constructor(props) {
    super(props)
    this.state = {
      dx: null,
      dy: null,
      zoom: 18
    }
    this.handleMapCreated = this.handleMapCreated.bind(this)
    this.handleZoomChanged = this.handleZoomChanged.bind(this)
  }

  componentWillReceiveProps(nextProps) {
    console.log(nextProps)
    this.setState({ plotData: nextProps.plotData })
  }

  componentDidMount() {
    document.querySelector('.modal-container').style.width = '70%'
    document.querySelector('.modal-container').style.height = '80%'


    const { ottpId } = this.props

    const _self = this
    // if (ordersType !== 'history') {
      var socket = io(Api.socketUrl, {
        path: '/pool'
      })
      socket.on('status', function (data) {
        console.log(data);
        socket.emit('subscribe', {"order_id": ottpId });
      });

      socket.on('subscribed', function(data) {
        console.log(data)
      })

      socket.on('live_data', function(res) {
        console.log(res)
        let dx = res.gps_coordinates[0]
        let dy = res.gps_coordinates[1]
        _self.setState({
          dx: dx,
          dy: dy
        })

        _self.state.plotData.push({lat: dx, lng: dy})
      })
    // }
  }

  handleMapCreated(map) {
    this.setState({ map })
    var trafficLayer = new google.maps.TrafficLayer()

    trafficLayer.setMap(map)
    // deliveryPath.setMap(map)
  }
  handleZoomChanged() {
    const { map, zoom } = this.state
    const newZoome = map.getZoom()
    // console.log(newZoome, zoom)
    if (zoom !== newZoome) {
      // console.log('changed')
      this.setState({ zoom: newZoome })
    }
  }
  componentWillUnmount() {
    document.querySelector('.modal-container').style.width = '46%'
    document.querySelector('.modal-container').style.height = 'auto'
  }

  render() {

    // const { customer } = this.props
    // const cx = customer.gps ? parseFloat(customer.gps.split(',')[0]) : null
    // const cy = customer.gps ? parseFloat(customer.gps.split(',')[1]) : null
    // const rx = retailer.gps ? parseFloat(retailer.gps.split(',')[0]) : null
    // const ry = retailer.gps ? parseFloat(retailer.gps.split(',')[1]) : null
    const { dx, dy } = this.state

    return (
      <div className='MapWrapper'>
        <Gmaps
          style={{width: '100%', height: '100%'}}
          lat={dx}
          lng={dy}
          zoom={this.state.zoom}
          loadingMessage={'Loading...'}
          params={params}
          onMapCreated={this.handleMapCreated}
          onZoomChanged={this.handleZoomChanged}
          >
          {/* <Marker
            icon={customerImg}
            lat={cx}
            lng={cy} /> */}
          <Marker
            icon={delivererImg}
            lat={dx}
            lng={dy}
          />
          {/* <Marker
            icon={outletImg}
            lat={rx}
            lng={ry} /> */}
        </Gmaps>
      </div>
    )
  }
}

export default Gmap
