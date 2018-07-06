import React from 'react'
import UserManagementListItem from './user-management-list-item'
import Button from '@components/button/index.js'
import ConfirmModal from '@components/ModalBox/ConfirmModal'
import MemberInfoModal from './member-info-modal'
import { mountModal, unMountModal } from '@components/ModalBox/utils'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as Actions from './../actions'
// import Pagination from 'react-js-pagination

class UserManagement extends React.Component {
  constructor() {
    super()
    this.state = {
      shouldMountMemberInfoModal: false
    }
    this.mountMemberInfoModal = this.mountMemberInfoModal.bind(this)
  }
  openAccessDeniedModal() {
    mountModal(ConfirmModal({
      heading: 'Deny access to Karthik Pasagada?',
      confirmMessage: 'If you deny access to Karthik Pasagada, he won’t be able to access this portal. You can grant him access later if necessary.',
      cancelTitle: 'Yes, deny access'
    }))
  }

  componentDidMount() {
    this.props.actions.fetchSquadMembers({
      limit: 40,
      offset: 0
    })
  }

  mountMemberInfoModal() {
    mountModal(MemberInfoModal({}))
  }

  handleAddMember() {

  }

  render() {
    const { loadingSquadMembers, squadMembersData } = this.props
    return (
      <div style={{ marginTop: '62px', padding: '20px' }}>
        <Button primary onClick={this.mountMemberInfoModal}>Add Member</Button>
        <table style={{ marginTop: '20px' }}>
          <thead>
            <tr>
              <th>Access status</th>
              <th>Member name</th>
              <th>Phone number</th>
              <th>Email address</th>
              <th>Role</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {
              !loadingSquadMembers
              ? squadMembersData.map((item, i) => (
                <UserManagementListItem data={item} key={i} openAccessDeniedModal={this.openAccessDeniedModal} />
              ))
              : <tr className="loader2" />
            }
          </tbody>
        </table>
      </div>
    )
  }
}

const mapStateToProps = state => state.main

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(Actions, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(UserManagement)
