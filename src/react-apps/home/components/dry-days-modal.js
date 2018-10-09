import React from 'react'
import ModalBox from '@components/ModalBox'
import ModalHeader from '@components/ModalBox/ModalHeader'
import ModalBody from '@components/ModalBox/ModalBody'
import ModalFooter from '@components/ModalBox/ModalFooter'
import Button from '@components/button/index.js'
import MonthItem from './month-item'
import DayPicker from 'react-day-picker'
import '@components/date-picker/date-picker.scss'

function setDryDayModal(data) {
  return class SetDryDayModal extends React.Component {
    constructor() {
      super()
      this.setDate = this.setDate.bind(this)
      this.state = {
        days: data.dryDays,
        integerDays: data.dryDays.map(Number)
      }
    }

    setDate(date) {
      const days = this.state.days.slice()
      const integerDays = this.state.days.map(Number)
      // console.log(days);
      if (this.state.integerDays.indexOf(Number(date)) === -1) {
        days.push(date)
        integerDays.push(Number(date))
      }
      this.setState({ days, integerDays })
    }

    render() {
      return (
        <div>
          <ModalBox width="560px">
            <ModalHeader>Set dry days</ModalHeader>
            <ModalBody>
              <div style={{ textAlign: 'center', marginTop: '20px' }}>
                <DayPicker
                  className="dry-day-calendar"
                  onDayClick={this.setDate}
                  selectedDays={this.state.days}
                />
              </div>
            </ModalBody>
            <ModalFooter>
              <Button onClick={() => { data.setNumberOfDryDays(this.state.days) }} primary>Save</Button>
              <Button secondary>Cancel</Button>
            </ModalFooter>
          </ModalBox>
        </div>
      )
    }
  }
}

export default setDryDayModal
