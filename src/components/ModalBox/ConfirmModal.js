import React from 'react'
import ModalHeader from './ModalHeader'
import ModalFooter from './ModalFooter'
import ModalBody from './ModalBody'
import ModalBox from './'
import { unMountModal } from './utils'
import Button from '@components/button/index.js'

export default function confirmModal (data) {
  return class confirmModal extends React.Component {
    constructor (props) {
      super(props)
    }
    render () {
      return (
        <ModalBox>
          <ModalHeader>{ data.heading }</ModalHeader>
            <ModalBody><p>{ data.confirmMessage }</p></ModalBody>
          <ModalFooter>
            <Button primary onClick={data.handleConfirm}>{ data.cancelTitle || 'Confirm' }</Button>
            <Button secondary onClick={unMountModal}>Cancel</Button>
          </ModalFooter>
        </ModalBox>
      )
    }
  }
}
