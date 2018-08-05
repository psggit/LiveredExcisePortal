import React from 'react'
import Card from '@components/card'
import Button from '@components/button/index'
import OrderTimeRestriction from './order-time-restriction'
import { connect } from 'react-redux'
import * as Actions from './../actions'
import { bindActionCreators } from 'redux'

class RuleManagement extends React.Component {
  constructor() {
    super()
    this.days = [
      { value: 'monday', label: 'Monday' },
      { value: 'tuesday', label: 'Tuesday' },
      { value: 'wednesday', label: 'Wednesday' },
      { value: 'thursday', label: 'Thursday' },
      { value: 'friday', label: 'Friday' },
      { value: 'saturday', label: 'Saturday' },
      { value: 'sunday', label: 'Sunday' }
    ]
    this.state = {
      dryDay: '2018-08-10',
      legalPurchaseAge: '18',
      maxDeliveriesPerMonth: '10',
      maxDeliveriesPerWeek: '2',
      possesionOverall: '12',
      possesionIMFL: '2.5',
      possesionFMFL: '4',
      possesionBeer: '10',
      possesionLiquor: '3',
      canSubmit: false,
      isSubmitting: false
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(e) {
    console.log(e.target.value);
    const {
      startTime,
      endTime,
      legalPurchaseAge,
      maxDeliveriesPerMonth,
      possesionOverall,
      possesionIMFL,
      possesionFMFL,
      possesionBeer,
      possesionLiquor
    } = this.state


    this.setState({ [e.target.name]: e.target.value })
    // () => {
    //   if (
    //     startTime.length &&
    //     endTime.length &&
    //     legalPurchaseAge.length &&
    //     maxDeliveriesPerMonth.length &&
    //     possesionOverall.length &&
    //     possesionIMFL.length &&
    //     possesionBeer.length &&
    //     possesionLiquor.length
    //   ) {
    //     this.setState({ canSubmit: true })
    //   }
    // }

      // if (!e.target.value.length) {
      //   this.setState({ canSubmit: false })
      // }
  }

  handleSubmit() {
    const {
      dryDay,
      legalPurchaseAge,
      maxDeliveriesPerMonth,
      maxDeliveriesPerWeek,
      possesionOverall,
      possesionIMFL,
      possesionFMFL,
      possesionBeer,
      possesionLiquor
    } = this.state

    // const { startTime, endTime } = this.timeData.getData()
    // console.log(startTime, endTime);
    if (
      dryDay.length &&
      legalPurchaseAge.length &&
      maxDeliveriesPerMonth.length &&
      maxDeliveriesPerWeek.length &&
      possesionOverall.length &&
      possesionIMFL.length &&
      possesionFMFL.length &&
      possesionBeer.length &&
      possesionLiquor.length
    ) {
      this.props.actions.updateStateExciseRules({})
    }
  }
  render() {
    return (
      <div style={{ marginTop: '62px', padding: '20px', width: '100%', height: 'calc(100vh - 62px)', overflow: 'auto' }}>
        <Card title="State Excise Rules">
          <div style={{ display: 'flex', flexWrap: 'wrap' }}>

            <div style={{ padding: '20px', boxShadow: '0 1px 1px #dfdfdf' }}>
              <p style={{ fontSize: '14px' }}>Dry day</p>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px' }}>
                <div className="form-group">
                  <label>Day</label>
                  <input value={this.state.dryDay} onChange={this.handleChange} name="dryDay" type="date" style={{ maxWidth: '180px' }} />
                </div>
              </div>
            </div>


            <div style={{ padding: '20px', margin: '0 20px', boxShadow: '0 1px 1px #dfdfdf' }}>
              <p style={{ fontSize: '14px' }}>Legal purchase age</p>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px' }}>
                <div className="form-group">
                  <label>Minimum Permissable Age</label>
                  <input value={this.state.legalPurchaseAge} onChange={this.handleChange} name="legalPurchaseAge" style={{ maxWidth: '115px', marginRight: '20px' }} />
                </div>
              </div>
            </div>

            <div style={{ padding: '20px', boxShadow: '0 1px 1px #dfdfdf' }}>
              <p style={{ fontSize: '14px' }}>Delivery limit per unique customer</p>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px' }}>
                <div className="form-group">
                  <label>Maximum deliveries/month</label>
                  <input value={this.state.maxDeliveriesPerMonth} onChange={this.handleChange} name="maxDeliveriesPerMonth" style={{ maxWidth: '115px', marginRight: '20px' }} />
                </div>
                <div style={{ marginLeft: '20px' }} className="form-group">
                  <label>Maximum deliveries/week</label>
                  <input value={this.state.maxDeliveriesPerWeek} onChange={this.handleChange} name="maxDeliveriesPerWeek" style={{ maxWidth: '115px', marginRight: '20px' }} />
                </div>
              </div>
            </div>

            <div style={{ padding: '20px', boxShadow: '0 1px 1px #dfdfdf', marginTop: '20px' }}>
              <p style={{ fontSize: '14px' }}>Possesion limits (In litres)</p>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px' }}>
                <div className="form-group">
                  <label>Overall</label>
                  <input value={this.state.possesionOverall} onChange={this.handleChange} name="possesionOverall" style={{ maxWidth: '88px', marginRight: '20px' }} />
                </div>
                <div className="form-group">
                  <label>IMFL</label>
                  <input value={this.state.possesionIMFL} onChange={this.handleChange} name="possesionIMFL" style={{ maxWidth: '88px', marginRight: '20px' }} />
                </div>
                <div className="form-group">
                  <label>FMFL</label>
                  <input value={this.state.possesionFMFL} onChange={this.handleChange} name="possesionFMFL" style={{ maxWidth: '88px', marginRight: '20px' }} />
                </div>
                <div className="form-group">
                  <label>Beer</label>
                  <input value={this.state.possesionBeer} onChange={this.handleChange} name="possesionBeer" style={{ maxWidth: '88px', marginRight: '20px' }} />
                </div>
                <div className="form-group">
                  <label>Liquor</label>
                  <input value={this.state.possesionLiquor} onChange={this.handleChange} name="possesionLiquor" style={{ maxWidth: '88px' }} />
                </div>
              </div>
            </div>
          </div>

          <div style={{ margin: '20px 0', height: '1px', background: '#dfdfdf', width: '100%' }}></div>

          <div style={{ padding: '20px', boxShadow: '0 1px 1px #dfdfdf' }}>
            <p style={{ fontSize: '14px', marginBottom: '10px' }}>Order time restrictions</p>
            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
              {
                this.days.map((item, i) => (
                  <div style={{ margin: '8px 20px' }}>
                    <p style={{ display: 'inline-block', borderBottom: '1px solid #49587D' }}>{ item.label }</p>
                    <OrderTimeRestriction ref={(node) => { this.timeData = node }} />
                  </div>
                ))
              }
            </div>
          </div>
        </Card>

        <div style={{ display: 'flex', marginTop: '20px' }}>
          <Button onClick={this.handleSubmit} primary style={{ marginRight: '20px' }}>Save changes</Button>
          <Button secondary>Cancel</Button>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => state.main

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(Actions, dispatch)
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RuleManagement)
