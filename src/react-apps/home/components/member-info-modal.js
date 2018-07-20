import React from 'react'
import ModalBox from '@components/ModalBox'
import Accordian from '@components/accordian'
import AccordianItem from '@components/accordian/accordian-item'
import Button from '@components/button/index.js'
import Toggle from '@components/toggle'
import InfoBar from '@components/infobar'
import { unMountModal } from '@components/ModalBox/utils'

function MemberInfoModal(data) {
  return class MemberInfoModal extends React.Component {
    constructor() {
      super()
      this.handleChange = this.handleChange.bind(this)
      this.setActiveAccordian = this.setActiveAccordian.bind(this)
      this.handleNextAccordian = this.handleNextAccordian.bind(this)
      this.handleSetAccess = this.handleSetAccess.bind(this)
      this.handleSubmit = this.handleSubmit.bind(this)

      this.state = {
        activeAccordian: 1,
        name: '',
        mobile_number: '',
        email: '',
        status: false,
        role: 'member',
      }
    }

    setActiveAccordian(activeAccordian) {
      this.setState({ activeAccordian })
    }

    handleNextAccordian() {
      const { activeAccordian } = this.state
      if (activeAccordian <= 3) {
        this.setActiveAccordian(activeAccordian + 1)
      }
    }

    handleSubmit() {
      const { name, mobile_number, email, role, status } = this.state
      if (name.length && mobile_number.length && email.length) {
        data.handleSubmit({
          name,
          mobile_number,
          email,
          role,
          status
        })
        unMountModal()
      }
    }

    handleChange(e) {
      this.setState({ [e.target.name]: e.target.value })
    }

    handleSetAccess() {
      this.setState({ status: !this.state.status })
    }

    render() {
      return (
        <ModalBox>
          <Accordian
            setActiveAccordian={this.setActiveAccordian}
            activeAccordian={this.state.activeAccordian}
          >
            <AccordianItem title="Basic Member Information" id={1}>
              <div className="form-group">
                <label>Member Name</label>
                <input
                  onChange={this.handleChange}
                  value={this.state.name}
                  name="name"
                  type="text"
                />
              </div>

              <div className="form-group">
                <label>Member Phone Number</label>
                <input
                  onChange={this.handleChange}
                  value={this.state.mobile_number}
                  name="mobile_number"
                  type="text"
                  maxLength={10}
                />
              </div>

              <div className="form-group">
                <label>Email Address</label>
                <input
                  onChange={this.handleChange}
                  value={this.state.email}
                  name="email"
                  type="text"
                />
              </div>

              <div style={{ marginTop: '30px' }} className="form-group">
                <Button onClick={this.handleNextAccordian} primary>Next</Button>
                <Button onClick={unMountModal} secondary>Cancel</Button>
              </div>
            </AccordianItem>

            <AccordianItem title="Access Status" id={2}>
              <div className="form-group">
                <label>Set access status</label>
                <Toggle
                  isToggled={this.state.status}
                  onToggle={() => { this.handleSetAccess(this.state.status) }}
                />
                <span
                  style={{
                    marginLeft: '12px',
                    color: '#6D788F',
                    fontSize: '12px'
                  }}>
                  Grant Access
                </span>
              </div>

              <div style={{ marginTop: '30px' }} className="form-group">
                <Button onClick={this.handleNextAccordian} primary>Next</Button>
                <Button onClick={unMountModal} secondary>Cancel</Button>
              </div>
            </AccordianItem>

            <AccordianItem title="Role" id={3}>
              <div className="form-group">
                <label>Set Role</label>
                <div style={{ display: 'flex' }}>
                  <div>
                    <input
                      checked={this.state.role === 'member'}
                      value="member"
                      onChange={this.handleChange}
                      name="role"
                      id="member"
                      type="radio"
                    />
                    <label htmlFor="member" style={{ fontSize: '13px', color: '#3E3E3C' }}>Member</label>
                  </div>

                  <div style={{ marginLeft: '20px' }}>
                    <input
                      checked={this.state.role === 'admin'}
                      value="admin"
                      onChange={this.handleChange}
                      name="role"
                      id="admin"
                      type="radio"
                    />
                    <label htmlFor="admin" style={{ fontSize: '13px', color: '#3E3E3C' }}>Admin</label>
                  </div>
                </div>
              </div>

              <InfoBar
                title={
                  this.state.role === 'member'
                  ? 'Can only view In Progress OTTP and OTTP History.'
                  : 'Can create, view and edit member information.'
                }
              />

              <div style={{ marginTop: '30px' }} className="form-group">
                <Button onClick={this.handleSubmit} primary>Save changes</Button>
                <Button onClick={unMountModal} secondary>Cancel</Button>
              </div>
            </AccordianItem>
          </Accordian>
        </ModalBox>
      )
    }
  }
}

export default MemberInfoModal
