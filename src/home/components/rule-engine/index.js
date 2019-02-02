import React from 'react'
import Card from '@components/card'
import Button from '@components/button/index'
import OrderTimeRestriction from '../order-time-restriction'
import { connect } from 'react-redux'
import * as Actions from '../../actions'
import { bindActionCreators } from 'redux'
import { mountModal, unMountModal } from '@components/ModalBox/utils'
import setDryDayModal from '../dry-days-modal'
import PageHeader from '@components/pageheader'
import Icon from '@components/icon';
import Collpasible from '@components/collapsible'
import Label from '@components/label'
import './rule-engine.scss'
import Select from '@components/select'
import Checkbox from '@components/checkbox'

class RuleManagement extends React.Component {
  constructor() {
    super()
    this.possessionLimits = [
      { name: 'IMFL', value: '' },
      { name: 'FMFL', value: '' },
      { name: 'Beer', value: '' },
      { name: 'Wine', value: '' },
      { name: 'Toddy', value: '' }
    ]
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
      dryDays: [],
      dryDay: '2018-08-10',
      legalPurchaseAge: '21',
      maxDeliveriesPerMonth: '10',
      maxDeliveriesPerWeek: '2',
      possesionOverall: '12',
      possesionIMFL: '2.3',
      possesionFMFL: '4',
      possesionBeer: '10',
      possesionWine: '3',
      canSubmit: false,
      isSubmitting: false,
      editMode: false
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.enableEditMode = this.enableEditMode.bind(this)
    this.mountDryDaysModal = this.mountDryDaysModal.bind(this)
  }

  mountDryDaysModal() {
    mountModal(setDryDayModal({
      dryDaysMonths: this.state.dryDaysMonths,
      dryDays: this.state.dryDays,
      setNumberOfDryDays: (dryDays) => {
        this.setState({
          dryDays
        })
        unMountModal()
      }
    }))
  }

  componentDidMount() {
    console.log("Rule engine mounted")
  }

  componentDidUpdate(prevProps) {
    console.log(prevProps, this.props)
    if (prevProps.location.search !== this.props.location.search) {
      if (this.props.location.search.length) {
        this.setState({ editMode: true })
      } else {
        this.setState({ editMode: false })
      }
    }
  }

  enableEditMode() {
    this.props.history.push('/home/rule-engine?edit=true')
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
      <div id="rule-engine">
        <PageHeader pageName="Rule Engine" />
        {
          this.state.editMode &&
          <p style={{ fontSize: '16px', fontWeight: '500', color: '#152935' }}>EDIT RULE ENGINE</p>
        }
        {
          !this.state.editMode &&
          <div style={{ textAlign: 'right' }} >
            <Button onClick={this.enableEditMode} primary>
              <span style={{ position: 'relative', top: '2px' }}>
                <Icon name="edit" />
              </span>
              <span style={{ marginLeft: '5px' }}>Edit Rules</span>
            </Button>
          </div>
        }
          <Collpasible title="Customer Restrictions">
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <div>
                <div className="legal-age">
                  <Label icon="info">
                    Legal Purchage Age
                  </Label>
                  <input type="number" />
                </div>

                <div className="possession" style={{ marginTop: '20px' }}>
                  <Label icon="info">
                    Possession Limits
                  </Label>
                  {
                    this.possessionLimits.map(item => (
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <p>{item.name}</p>
                        <input className="small" type="text" />
                      </div>
                    ))
                  }
                </div>

              </div>

              <div style={{ marginLeft: '77px' }}>
                <div>
                  <Label icon="info">Velocity Check (per week)</Label>
                  <input type="text" className="small" />
                </div>

                <div style={{ marginTop: '30px' }}>
                  <Label icon="info">Amount Check (per week)</Label>
                  <input type="text" className="small" />
                </div>
              </div>
            </div>
          </Collpasible>

          <Collpasible title="Time Restrictions">
            <div>
              <Label>Daily Restrictions</Label>
            </div>
            {
              this.days.map(item => (
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <p style={{ width: '110px' }}>{item.label}</p>
                  <input style={{ margin: '0 20px 10px 0' }} className="small" type="text" />
                  <p>to</p>
                  <input style={{ margin: '0 0 10px 20px' }} className="small" type="text" />
                </div>
              ))
            }
          </Collpasible>


          <Collpasible title="Zone Restrictions">
            <table>
              <thead>
                <tr>
                  <th><Label>Zone</Label></th>
                  <th><Label>On</Label></th>
                  <th><Label>From</Label></th>
                  <th><Label>To</Label></th>
                  <th><Label>Repeat</Label></th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Secunderabad</td>
                  <td>05-12-2018</td>
                  <td>11:00 AM to </td>
                  <td>21:00 PM</td>
                  <td>No</td>
                  <td>
                    <Icon name="edit" />
                    <Icon name="cross-red" color="#3d70b2" />
                  </td>
                </tr>
              </tbody>
            </table>

            <div>
              <Label icon="info">Restricting Delivery</Label>
              <div style={{ display: 'inline-block' }}>
                <Select options={[]} />
              </div>

              <div style={{ display: 'inline-block', verticalAlign: 'top' }}>
                <div style={{ display: 'flex', alignItems: 'center', marginLeft: '40px' }}>
                  <p style={{ width: '100px' }}>Choose day</p>
                  <Select options={[]} />
                </div>
                
                <div style={{ display: 'flex', alignItems: 'center', marginLeft: '40px' }}>
                  <p style={{ width: '100px' }}>Time</p>
                  <input className="small" type="text" />
                  <p style={{ margin: '20px 30px' }}>to</p>
                  <input className="small" type="text" />
                </div>

                <div style={{ marginLeft: '140px', display: 'flex', alignItems: 'center' }}>
                  <div>
                    <Checkbox />
                  </div>
                  <p style={{ marginLeft: '10px' }}>Repeat</p>
                  <div style={{ margin: '0 90px' }}>
                    <Select small options={[]} />
                  </div>
                </div>

                <div style={{ marginLeft: '140px', display: 'flex', alignItems: 'center' }}>
                  <Checkbox />
                  <p style={{ marginLeft: '10px' }}>Don't Repeat</p>
                </div>
              </div>
            </div>
          </Collpasible>

          <Collpasible title="Special Restrictions">
            <table>
              <thead>
                <tr>
                  <th><Label>Zone</Label></th>
                  <th><Label>On</Label></th>
                  <th><Label>From</Label></th>
                  <th><Label>To</Label></th>
                  <th><Label>Repeat</Label></th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Secunderabad</td>
                  <td>05-12-2018</td>
                  <td>11:00 AM to </td>
                  <td>21:00 PM</td>
                  <td>No</td>
                  <td>
                    <Icon name="edit" />
                    <Icon name="cross-red" color="#3d70b2" />
                  </td>
                </tr>
              </tbody>
            </table>

            <div>
              <Label icon="info">Restricting Delivery</Label>
              <div style={{ display: 'inline-block' }}>
                <Select options={[]} />
              </div>

              <div style={{ display: 'inline-block', verticalAlign: 'top' }}>
                <div style={{ display: 'flex', alignItems: 'center', marginLeft: '40px' }}>
                  <p style={{ width: '100px' }}>Choose day</p>
                  <Select options={[]} />
                </div>
                
                <div style={{ display: 'flex', alignItems: 'center', marginLeft: '40px' }}>
                  <p style={{ width: '100px' }}>Time</p>
                  <input className="small" type="text" />
                  <p style={{ margin: '20px 30px' }}>to</p>
                  <input className="small" type="text" />
                </div>

                <div style={{ marginLeft: '140px', display: 'flex', alignItems: 'center' }}>
                  <div>
                    <Checkbox />
                  </div>
                  <p style={{ marginLeft: '10px' }}>Repeat</p>
                  <div style={{ margin: '0 90px' }}>
                    <Select small options={[]} />
                  </div>
                </div>

                <div style={{ marginLeft: '140px', display: 'flex', alignItems: 'center' }}>
                  <Checkbox />
                  <p style={{ marginLeft: '10px' }}>Don't Repeat</p>
                </div>
              </div>
            </div>
          </Collpasible>
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
