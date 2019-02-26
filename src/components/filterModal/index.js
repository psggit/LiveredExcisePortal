import React from "react"
import Button from "../button"
import Label from "../label"
import Select from "../select"
import Icon from "../icon"
import './index.scss'
import OrderAmount from "./orderAmount"
import DeliveryOperator from "./deliveryOperator"
import PermitStatus from "./permitStatus"
import City from "./cityComponent"
import Retailer from "./retailerComponent"
import FromDate from "./fromDateComponent"
import ToDate from "./toDateComponent"

class Filter extends React.Component {

  constructor() {
    super()
    this.applyFilter = this.applyFilter.bind(this)
  }

  applyFilter() {
    let filterObj = []

    const orderAmount = this.orderAmountState.getData().orderAmount
    const dso = this.dsoListState.getData().dso
    const city = this.cityState.getData().city
    const retailer = this.retailerState.getData().retailer
    const fromDate = this.fromDateState.getData().fromDate
    const toDate = this.toDateState.getData().toDate
    
    if (this.props.filterName !== "pastOrders") {
      filterObj.push(orderAmount, dso, city, retailer)
      filterObj = filterObj.filter((item) => item.value && item.value !== "All")
    } else {
      filterObj.push(orderAmount, dso, city, retailer)
      filterObj = filterObj.filter((item) => item.value && item.value !== "All")
      if(fromDate.filterby) {
        filterObj.push(fromDate)
      }
      if(toDate.filterby) {
        filterObj.push(toDate)
      }
    }
    this.props.applyFilter(filterObj)
  }

  render() {
    return (
      <div className={`filter-container ${this.props.showFilter ? 'show' : 'hide'}`} >
        <p className="title"> Filters </p>
        <div style={{ margin: '20px 0' }}>
          {
            this.props.filterName === "pastOrders" &&
            <div>
              <FromDate ref={(node) => {this.fromDateState = node}} />
              <ToDate ref={(node) => {this.toDateState = node}} />
            </div>
          }
          <City 
            cityList={this.props.cityList}  
            ref={(node) => { this.cityState = node }}
          />
          <DeliveryOperator 
            dsoList={this.props.dsoList}  
            ref={(node) => { this.dsoListState = node }}
          />
          <Retailer 
            retailerList={this.props.retailerList}  
            ref={(node) => { this.retailerState = node }}
          />
          <OrderAmount 
            orderAmount={this.props.orderAmount}  
            ref={(node) => { this.orderAmountState = node }}
          />
        </div>
        <Button primary onClick={this.applyFilter}>
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