import React from "react"
import Button from "../button"
import Label from "../label"
import Select from "../select"
import Icon from "../icon"
import './index.scss'

class Filter extends React.Component {

  constructor() {
    super()
    this.handleChange = this.handleChange.bind(this)
    this.state = {
      dso: {
        filterby: "",
        value: ""
      },
      retailer: {
        filterby: "",
        value: ""
      },
      orderAmount: {
        filterby: "",
        lowerrange: 0,
        upperrange: 0
      },
      permitStatus: {
        filterby: "",
        value: ""
      },
      city: {
        filterby: "",
        value: ""
      }
    }

    this.applyFilter = this.applyFilter.bind(this)
  }

  handleChange({value, targetName}) {
    switch(targetName) {
    case 'Delivery Operator':
      {
        const filterValue = this.props.dsoList.find(item => item.value === parseInt(value)).text
        if(filterValue !== "All") {
          this.setState({
            dso: {
              filterby: targetName,
              value: filterValue
            }
          })
        }
      }
      break;

    case 'Order Amount':
      {
        const filterValue = this.props.orderAmount.find(item => item.value === parseInt(value)).text
        if(filterValue !== "All") {
          const range = this.props.orderAmount.find(item => item.value === parseInt(value)).text.split('-')
          this.setState({
            orderAmount: {
              filterby: targetName,
              lowerrange: parseInt(range[0]),
              upperrange: parseInt(range[1])
            }
          })
        }
      }
      break;

    case 'Permit Status':
      {
        const filterValue = this.props.permitStatus.find(item => item.value === parseInt(value)).text
        if(filterValue !== "All") {
          this.setState({
            permitStatus: {
              filterby: targetName,
              value: this.props.permitStatus.find(item => item.value === parseInt(value)).text
            }
          })
        }
      }
      break;
    }
  }

  applyFilter() {
    let filterObj = []
    for (const [key, value] of Object.entries(this.state)) {
      const item = value
      if(item.filterby && item.filterby.length) {
        //console.log("value", item.filterby)
        filterObj.push(item)
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
            <Select 
              options={["Bangalore", "Chennai"]} 
              name="City"  
            />
          </div>
          {/* <div className="zone input-field">
            <Label>
              Zone
              </Label>
            <Select options={[]} />
          </div> */}
          <div className="delivery-operator input-field">
            <Label>
              Delivery Operator
            </Label>
            <Select 
              name="Delivery Operator" 
              options={this.props.dsoList} 
              onChange={this.handleChange}
            />
          </div>
          <div className="retailer input-field">
            <Label>
              Retailer
            </Label>
            <Select 
              options={[]}
              name="Retailer"  
            />
          </div>
          <div className="order-amount input-field">
            <Label>
              Order Amount
            </Label>
            <Select 
              options={this.props.orderAmount}
              name="Order Amount" 
              onChange={this.handleChange}
            />
          </div>
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