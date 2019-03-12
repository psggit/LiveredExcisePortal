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
    let orderAmount, retailer;
    if(this.props.filterName !== "overview") {
      orderAmount = this.orderAmountState.getData().orderAmount
      retailer = this.retailerState.getData().retailer
    }
   
    const dso = this.dsoListState.getData().dso
    const city = this.cityState.getData().city
    
    
    // if (this.props.filterName !== "pastOrders") {
    //   filterObj.push(orderAmount, dso, city, retailer)
    //   filterObj = filterObj.filter((item) => item.value && item.value !== "All")
    // } else if (this.props.filterName === "overview") {
    // } else {
    //   const fromDate = this.fromDateState.getData().fromDate
    //   const toDate = this.toDateState.getData().toDate
    //   filterObj.push(orderAmount, dso, city, retailer)
    //   filterObj = filterObj.filter((item) => item.value && item.value !== "All")
    //   if(fromDate.filterby) {
    //     filterObj.push(fromDate)
    //   }
    //   if(toDate.filterby) {
    //     filterObj.push(toDate)
    //   }
    // }

    switch(this.props.filterName) {
      case 'liveOrders':
        filterObj.push(orderAmount, dso, city, retailer)
        filterObj = filterObj.filter((item) => item.value && item.value !== "All")
      break;
      case 'pastOrders':
        const fromDate = this.fromDateState.getData().fromDate
        const toDate = this.toDateState.getData().toDate
        filterObj.push(orderAmount, dso, city, retailer)
        filterObj = filterObj.filter((item) => item.value && item.value !== "All")
        if(fromDate.filterby) {
          filterObj.push(fromDate)
        }
        if(toDate.filterby) {
          filterObj.push(toDate)
        }
      break;
      case 'overview':
        filterObj.push(dso, city)
        filterObj = filterObj.filter((item) => item.value && item.value !== "All")
      break;
    }
    this.props.applyFilter(filterObj)
  }

  render() {
    console.log("parent", this.props.selectedCityIdx)
    return (
      <div className={`filter-container ${this.props.showFilter ? 'show' : 'hide'}`} >
        <p className="title"> Filters </p>
        <div style={{ margin: '20px 0' }}>
          {
            this.props.filterName === "pastOrders" &&
            <div>
              <FromDate ref={(node) => {this.fromDateState = node}} fromDate={this.props.fromDate} />
              <ToDate ref={(node) => {this.toDateState = node}} toDate={this.props.toDate} />
            </div>
          }
          <City 
            cityList={this.props.cityList}  
            ref={(node) => { this.cityState = node }}
            selectedCityIdx={this.props.selectedCityIdx}
          />
          <DeliveryOperator 
            dsoList={this.props.dsoList}  
            ref={(node) => { this.dsoListState = node }}
            selectedDsoIdx={this.props.selectedDsoIdx}
          />
          {
            this.props.filterName !== "overview" &&
            <div>
              <Retailer 
                retailerList={this.props.retailerList}  
                ref={(node) => { this.retailerState = node }}
                selectedRetailerIdx={this.props.selectedRetailerIdx}
              />
              <OrderAmount 
                orderAmount={this.props.orderAmount}  
                ref={(node) => { this.orderAmountState = node }}
                selectedOrderAmntIdx={this.props.selectedOrderAmntIdx}
              />
            </div>
          }
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