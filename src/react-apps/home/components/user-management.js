import React from 'react'
import UserManagementListItem from './user-management-list-item'
import Button from '@components/button/index.js'
import ConfirmModal from '@components/ModalBox/ConfirmModal'
import MemberInfoModal from './member-info-modal'
import { mountModal, unMountModal } from '@components/ModalBox/utils'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as Actions from './../actions'
import Pagination from 'react-js-pagination'
import '@sass/_pagination.scss'
import Loader from '@components/loader'

class UserManagement extends React.Component {
  constructor() {
    super()
    this.state = {
      shouldMountMemberInfoModal: false
    }
    this.mountMemberInfoModal = this.mountMemberInfoModal.bind(this)
    this.handleAccessUpdate = this.handleAccessUpdate.bind(this)
    this.openAccessDeniedModal = this.openAccessDeniedModal.bind(this)
  }

  openAccessDeniedModal(id, name, status) {
    let heading, confirmMessage, cancelTitle
    if (status) {
      heading = `Grant access to ${name}`
      confirmMessage =  ``
      cancelTitle = 'Yes, grant access'
    } else {
      heading = `Deny access to ${name}`
      confirmMessage = `If you deny access to ${name}, he won’t be able to access this portal. You can grant him access later if necessary.`
      cancelTitle = 'Yes, deny access'
    }

    mountModal(ConfirmModal({
      heading,
      confirmMessage,
      cancelTitle,
      handleConfirm: () => {
        this.handleAccessUpdate(id, status)
      }
    }))
  }

  handleAccessUpdate(id, status) {
    this.props.actions.updateSquadMember({ id, status })
    unMountModal()
  }

  componentDidMount() {
    this.props.actions.fetchSquadMembers({
      limit: 40,
      offset: 0
    })
  }

  mountMemberInfoModal() {
    mountModal(MemberInfoModal({
      handleSubmit: (data) => {
        this.props.actions.addSquadMember(data)
      }
    }))
  }

  render() {
    const { loadingSquadMembers, squadMembersData } = this.props
    return (
      <React.Fragment>
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
                {/* <th></th> */}
              </tr>
            </thead>

            <tbody>
              {
                !loadingSquadMembers
                ? squadMembersData.map((item, i) => (
                  <UserManagementListItem
                    data={item}
                    key={i}
                    openAccessDeniedModal={this.openAccessDeniedModal}
                  />
                ))
                : <Loader />
              }
            </tbody>
          </table>
          {
            !this.props.loadingSquadMembers && this.props.squadMembersData.length
            ? <Pagination
              activePage={this.state.activePage}
              itemsCountPerPage={this.pagesLimit}
              totalItemsCount={this.props.squadMembersCount}
              pageRangeDisplayed={5}
              onChange={this.handlePageChange}
            />
            : ''
          }
        </div>
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => state.main

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(Actions, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(UserManagement)
