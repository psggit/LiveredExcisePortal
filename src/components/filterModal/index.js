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

class Filter extends React.Component {

  constructor() {
    super()
    //this.handleChange = this.handleChange.bind(this)
    this.state = {
      fromDate: "",
      toDate: ""
      // dso: {
      //   filterby: "",
      //   value: ""
      // },
      // retailer: {
      //   filterby: "",
      //   value: ""
      // },
      // permitStatus: {
      //   filterby: "",
      //   value: ""
      // }
    }

    this.applyFilter = this.applyFilter.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value})
    //switch(targetName) {
    // case 'Delivery Operator':
    //   {
    //     const filterValue = this.props.dsoList.find(item => item.value === parseInt(value)).text
    //     if(filterValue !== "All") {
    //       this.setState({
    //         dso: {
    //           filterby: targetName,
    //           value: filterValue
    //         }
    //       })
    //     }
    //   }
    //   break;

    // case 'Order Amount':
    //   {
    //     const filterValue = this.props.orderAmount.find(item => item.value === parseInt(value)).text
    //     if(filterValue !== "All") {
    //       const range = this.props.orderAmount.find(item => item.value === parseInt(value)).text.split('-')
    //       this.setState({
    //         orderAmount: {
    //           filterby: targetName,
    //           lowerrange: parseInt(range[0]),
    //           upperrange: parseInt(range[1])
    //         }
    //       })
    //     }
    //   }
    //   break;

    // case 'Permit Status':
    //   {
    //     const filterValue = this.props.permitStatus.find(item => item.value === parseInt(value)).text
    //     if(filterValue !== "All") {
    //       this.setState({
    //         permitStatus: {
    //           filterby: targetName,
    //           value: this.props.permitStatus.find(item => item.value === parseInt(value)).text
    //         }
    //       })
    //     }
    //   }
    //   break;
    // }
  }

  applyFilter() {
    // let filterObj = []
    // for (const [key, value] of Object.entries(this.state)) {
    //   const item = value
    //   if(item.filterby && item.filterby.length) {
    //     //console.log("value", item.filterby)
    //     filterObj.push(item)
    //   }
    // }

    let filterObj = []

    const orderAmount = this.orderAmountState.getData().orderAmount
    const dso = this.dsoListState.getData().dso
    const city = this.cityState.getData().city
    const retailer = this.retailerState.getData().retailer
    filterObj.push(orderAmount, dso, city, retailer)
    filterObj = filterObj.filter((item) => item.value && item.value !== "All")
    console.log("object", filterObj, this.state.fromDate, this.state.toDate)
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
              <div style={{position: 'relative'}} className="input-field">
                <span className="calendar-icon">
                  <Icon name="calendar" />
                </span>
                <Label>
                  From
                </Label>
                <input 
                  type="date" 
                  max="9999-12-31" 
                  name="fromDate"
                  onChange={this.handleChange}
                />
              </div>
              <div style={{position: 'relative'}} className="input-field">
                <span className="calendar-icon">
                  <Icon name="calendar" />
                </span>
                <Label>
                  To
                </Label>
                <input 
                  type="date" 
                  max="9999-12-31" 
                  name="toDate"
                  onChange={this.handleChange}
                />
              </div>
            </div>
          }
          {/* <div className="city input-field">
            <Label>
              City/Town
            </Label>
            <Select 
              options={["Bangalore", "Chennai"]} 
              name="City"  
            />
          </div> */}
          {/* <div className="zone input-field">
            <Label>
              Zone
              </Label>
            <Select options={[]} />
          </div> */}
          {/* <div className="delivery-operator input-field">
            <Label>
              Delivery Operator
            </Label>
            <Select 
              name="Delivery Operator" 
              options={this.props.dsoList} 
              onChange={this.handleChange}
            />
          </div> */}
          <City 
            cityList={this.props.cityList}  
            ref={(node) => { this.cityState = node }}
          />
          <DeliveryOperator 
            dsoList={this.props.dsoList}  
            ref={(node) => { this.dsoListState = node }}
          />
          {/* <div className="retailer input-field">
            <Label>
              Retailer
            </Label>
            <Select 
              options={[]}
              name="Retailer"  
            />
          </div> */}
          <Retailer 
            retailerList={this.props.retailerList}  
            ref={(node) => { this.retailerState = node }}
          />
          <OrderAmount 
            orderAmount={this.props.orderAmount}  
            ref={(node) => { this.orderAmountState = node }}
          />
          {/* <PermitStatus
            permitStatus={this.props.permitStatus}  
            ref={(node) => { this.permitStatusState = node }}
          /> */}
          {/* <div className="permit-status input-field">
            <Label>
              Permit Status
            </Label>
            <Select 
              options={this.props.permitStatus}
              name="Permit Status" 
              onChange={this.handleChange}
            />
          </div> */}
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