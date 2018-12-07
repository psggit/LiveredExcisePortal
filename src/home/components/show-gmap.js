import React from 'react'
import ModalHeader from '@components/ModalBox/ModalHeader'
import ModalFooter from '@components/ModalBox/ModalFooter'
import ModalBody from '@components/ModalBox/ModalBody'
import ModalBox from '@components/ModalBox'
import { unMountModal } from '@components/ModalBox/utils'
// import '@sass/OrdersPage/ShowNotified.scss'
// import Moment from 'moment'
import Gmap from './gmap'

export default function showGmap (data) {
  return class showGmap extends React.Component {
    constructor () {
      super()
    }
    render () {
      return (
        <ModalBox>
          <ModalHeader>{ data.heading }</ModalHeader>
          <ModalBody>
            <Gmap
              ottpId={data.id}
              customerGps={data.customerGps}
              retailerGps={data.retailerGps}
            />
          </ModalBody>
          {/* <ModalFooter>
            <button className="btn btn-primary" onClick={unMountModal}>Close</button>
          </ModalFooter> */}
        </ModalBox>
      )
    }
  }
}
