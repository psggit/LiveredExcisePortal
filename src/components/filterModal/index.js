import React from "react"
import Button from "../button"
import Label from "../label"
import Select from "../select"
import Icon from "../icon"
import './index.scss'

class Filter extends React.Component {

  constructor() {
    super()
  }

  render() {
    return (
      <div className={`filter-container ${this.props.showFilter ? 'show' : 'hide'}`} >
        <p className="title"> Filters </p>
        {/* {
          this.props.filterName === "liveOrders" && */}
        <div style={{ margin: '20px 0' }}>
          {
            this.props.filterName === "pastOrders" &&
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                position: 'relative'
              }}
            >
              <div className="input-field">
                <Label>
                  From
                  </Label>
                <input className="small" type="text" />
              </div>
              <div className="input-field">
                <Label>
                  To
                  </Label>
                <input className="small" type="text" />
              </div>
              <span className="calendar-icon">
                <Icon name="calendar" />
              </span>
            </div>
          }
          <div className="city input-field">
            <Label>
              City/Town
              </Label>
            <Select options={["Bangalore", "Chennai"]} />
          </div>
          <div className="zone input-field">
            <Label>
              Zone
              </Label>
            <Select options={[]} />
          </div>
          <div className="delivery-operator input-field">
            <Label>
              Delivery Operator
              </Label>
            <Select options={[]} />
          </div>
          <div className="retailer input-field">
            <Label>
              Retailer
              </Label>
            <Select options={[]} />
          </div>
          <div className="order-amount input-field">
            <Label>
              Order Amount
              </Label>
            <Select options={[]} />
          </div>
          <div className="permit-status input-field">
            <Label>
              Permit Status
              </Label>
            <Select options={[]} />
          </div>
        </div>
        {/* } */}
        <Button primary>
          <span
            style={{
              position: 'relative',
              top: '-2px',
              marginLeft: '5px',
            }}
          >
            APPLY FILTER
          </span>
        </Button>
      </div>
    )
  }
}

export default Filter