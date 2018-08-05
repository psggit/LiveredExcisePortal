import React from 'react'
import 'rc-time-picker/assets/index.css'
import TimePicker from 'rc-time-picker'
import moment from 'moment'

class OrderTimeRestriction extends React.Component {
  constructor() {
    super()
    this.setStartTime = this.setStartTime.bind(this)
    this.setEndTime = this.setEndTime.bind(this)
    this.state = {
      startTime: moment().hour(10).minute(0),
      endTime: moment().hour(23).minute(0)
    }
  }
  setStartTime(time) {
    this.setState({ startTime: time })
  }
  setEndTime(time) {
    this.setState({ endTime: time })
  }
  getData() {
    return this.state
  }
  render() {
    return (
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px', maxWidth: '240px' }}>
        <div className="form-group">
          <label>Start Time</label>
          <TimePicker
            style={{ maxWidth: '115px', marginRight: '20px' }}
            showSecond={false}
            value={this.state.startTime}
            className="xxx"
            onChange={this.setStartTime}
            format="h:mm A"
            use12Hours
            inputReadOnly
          />
        </div>
        <div className="form-group">
          <label>End Time</label>
          <TimePicker
            style={{ maxWidth: '115px', marginRight: '20px' }}
            showSecond={false}
            value={this.state.endTime}
            className="xxx"
            onChange={this.setEndTime}
            format="h:mm A"
            use12Hours
            inputReadOnly
          />
        </div>
      </div>
    )
  }
}

export default OrderTimeRestriction
