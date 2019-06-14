import React from 'react'
import { connect } from 'react-redux'
import * as Actions from '../../actions'
import { bindActionCreators } from 'redux'
import PageHeader from '@components/pageheader'
import Collpasible from '@components/collapsible'
import Label from '@components/label'
import './rule-engine.scss'
import moment from "moment"

class RuleManagement extends React.Component {
  constructor() {
    super()
    this.days = [
      { value: 1, label: 'Monday' },
      { value: 2, label: 'Tuesday' },
      { value: 3, label: 'Wednesday' },
      { value: 4, label: 'Thursday' },
      { value: 5, label: 'Friday' },
      { value: 6, label: 'Saturday' },
      { value: 7, label: 'Sunday' }
    ]
    this.state = {
      possessionLimits: [],
      timeRestrictions: [],
      legalPurchaseAge: "",
      zoneRestrictions: [],
      permitRules: {}
    }

    this.formatResponse = this.formatResponse.bind(this)
  }

  /**
   * Fetches rules of given state_id
   */
  componentDidMount() {
    this.props.actions.fetchRules({
      state_id: parseInt(localStorage.getItem("state-id"))
    })
  }

  componentDidUpdate(prevProps) {
    if (this.props.rulesData !== prevProps.rulesData) {
      this.formatResponse()
    }
  }

  /**
   * Map's weekday_id and get weekday_label and initializes state
   */
  formatResponse() {
    const timeRestrictions = this.props.rulesData.time_restrictions.map((item) => {
      return { ...item, weekday_name: this.days.find(dayItem => dayItem.value === item.weekday_id).label }
    })
    this.setState({
      timeRestrictions: timeRestrictions,
      legalPurchaseAge: this.props.rulesData.consumer_min_age ? this.props.rulesData.consumer_min_age : 0,
      possessionLimits: this.props.rulesData.possession_limit,
      permitRules: this.props.rulesData.permit_rules,
      zoneRestrictions: this.props.rulesData.city_special_days.concat(this.props.rulesData.state_special_days)
    })
  }

  render() {
    const { possessionLimits, timeRestrictions, legalPurchaseAge, zoneRestrictions, permitRules } = this.state
    return (
      <div id="rule-engine">
        <PageHeader pageName="Rule Engine" />
        <div style={{ background: '#fff', padding: '30px' }}>
          <div className="rule--header">
            <p className="title">Rules</p>
          </div>
          <div className="rule--body possession-limit">
            <div className="title">
              <Label
                icon="info"
                tooltipText="The quantity of liquor that an individual can possess at any given time"
              >
                Possession Limits (Litres)
            </Label>
            </div>
            <div className="brand-type">
              <span>IMFL</span>
              <input
                className="small"
                type="text"
                disabled={true}
                defaultValue={
                  possessionLimits && possessionLimits.length > 0
                    ? possessionLimits.find((item) => item.brand_type === "IMFL").volume_limit / 1000
                    : ""
                }
              />
            </div>
            <div className="brand-type">
              <span>FMFL</span>
              <input
                className="small"
                type="text"
                disabled={true}
                defaultValue={
                  possessionLimits && possessionLimits.length > 0
                    ? possessionLimits.find((item) => item.brand_type === "FMFL").volume_limit / 1000
                    : ""
                }
              />
            </div>
            <div className="brand-type">
              <span>Beer</span>
              <input
                className="small"
                type="text"
                disabled={true}
                defaultValue={
                  possessionLimits && possessionLimits.length > 0
                    ? possessionLimits.find((item) => item.brand_type === "Beer").volume_limit / 1000
                    : ""
                }
              />
            </div>
            <div className="brand-type">
              <span>Wine</span>
              <input
                className="small"
                type="text"
                disabled={true}
                defaultValue={
                  possessionLimits && possessionLimits.length > 0
                    ? possessionLimits.find((item) => item.brand_type === "Wine").volume_limit / 1000
                    : ""
                }
              />
            </div>
          </div>

          <div className="rule--body legal-age">
            <div className="title">
              <Label
                icon="info"
                tooltipText="Minimum legal age limit to place an order"
              >
                Legal Purchage Age
            </Label>
            </div>
            <input
              type="number"
              disabled={true}
              defaultValue={legalPurchaseAge}
            />
          </div>

          <div className="rule--body">
            <div className="cancellation-fee" style={{ margin: '20px 0 40px 0' }}>
              <div className="title">
                <Label
                  icon="info"
                  tooltipText="In case an OTTP (One Time Transport Permit) is cancelled, a cancellation fee will be charged"
                >
                  Cancellation Fee (₹)
              </Label>
              </div>
              <input
                type="text"
                disabled={true}
                className="small"
                value={`₹ ${permitRules && permitRules.length > 0 ? permitRules[0].cancellation_fee : 0}`}
              />
            </div>
            <div className="permit-fee" style={{ marginTop: '10px' }}>
              <div className="title">
                <Label
                  icon="info"
                  tooltipText="Amount charged per OTTP per order"
                >
                  Cost/Permit (₹)
            </Label>
              </div>
              <input
                type="text"
                disabled={true}
                className="small"
                value={`₹ ${permitRules && permitRules.length > 0 ? permitRules[0].permit_cost : 0}`}
              />
            </div>
          </div>

          <div className="rule--body time-restrictions">
            <div className="title">
              <Label
                icon="info"
                tooltipText="Time range per day within which delivery of liquor is permitted"
              >
                TIME RESTRICTIONS
              </Label>
            </div>
            <div className="timings">
              {
                timeRestrictions.map((item, i) => {
                  return <div style={{ display: 'flex', alignItems: 'center' }} key={i}>
                    <span>{item.weekday_name}</span>
                    <input
                      style={{ margin: '10px 20px 10px 0' }}
                      className="small" type="text"
                      disabled={true}
                      value={moment(item.start_time).format('h:mm a')}
                    />
                    <p>to</p>
                    <input
                      style={{ margin: '10px 0 10px 20px' }}
                      className="small"
                      type="text"
                      disabled={true}
                      value={moment(item.end_time).format('h:mm a')}
                    />
                  </div>
                })
              }
            </div>
          </div>

          <div className="rule--body">
            <div className="title">
              <Label
                icon="info"
                tooltipText="Restricting delivery with a minimum of 48 hours of intimation on certain days due to dry days, state emergencies or other requirements"
              >
                Special Restrictions
          </Label>
            </div>
            <table>
              {
                zoneRestrictions.length > 0
                  ? <React.Fragment>
                    <thead>
                      <tr>
                        <th><Label>City/Town</Label></th>
                        <th><Label>On</Label></th>
                        <th><Label>From</Label></th>
                        <th><Label>To</Label></th>
                        <th><Label>Repeat</Label></th>
                        <th><Label>Reason</Label></th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        zoneRestrictions.map((item, i) => {
                          return (
                            <tr>
                              <td>{item.city ? item.city : item.state}</td>
                              <td>{moment(item.date).format('DD/MM/YYYY')}</td>
                              <td>{moment(item.from_time).format('h:mm a')}</td>
                              <td>{moment(item.to_time).format('h:mm a')}</td>
                              <td>{item.is_repeat ? 'Yearly' : 'No'}</td>
                              <td>{item.reason}</td>
                            </tr>
                          )
                        })
                      }
                    </tbody>
                  </React.Fragment>
                  : <tbody>
                    <tr>
                      <td style={{ textAlign: 'center' }} colSpan='6'>
                        <p style={{ fontWeight: '16px' }}>No special day found</p>
                      </td>
                    </tr>
                  </tbody>
              }
            </table>
          </div>
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
