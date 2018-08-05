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
    this.pagesLimit = 10
    this.state = {
      shouldMountMemberInfoModal: false
    }
    this.mountMemberInfoModal = this.mountMemberInfoModal.bind(this)
    this.handleAccessUpdate = this.handleAccessUpdate.bind(this)
    this.openAccessDeniedModal = this.openAccessDeniedModal.bind(this)
    this.handlePageChange = this.handlePageChange.bind(this)
  }

  openAccessDeniedModal(id, name, status) {
    if (parseInt(localStorage.getItem('hasura-id')) === id) return;
    let heading, confirmMessage, cancelTitle
    heading = `Deny access to ${name}`
    confirmMessage = `If you deny access to ${name}, he won’t be able to access this portal. You can grant him access later if necessary.`
    cancelTitle = 'Yes, deny access'
    // if (status) {
    //   heading = `Grant access to ${name}`
    //   confirmMessage =  ``
    //   cancelTitle = 'Yes, grant access'
    // } else {
    //   heading = `Deny access to ${name}`
    //   confirmMessage = `If you deny access to ${name}, he won’t be able to access this portal. You can grant him access later if necessary.`
    //   cancelTitle = 'Yes, deny access'
    // }

    if (!status) {
      mountModal(ConfirmModal({
        heading,
        confirmMessage,
        cancelTitle,
        handleConfirm: () => {
          this.handleAccessUpdate(id, status)
        }
      }))
    } else {
      this.handleAccessUpdate(id, status)
    }
  }

  handlePageChange(pageNumber) {
    const offset = this.pagesLimit * (pageNumber - 1)
    const { filters } = this.props
    this.setState({ activePage: pageNumber, pageOffset: offset })
    this.props.actions.fetchSquadMembers({
      limit: this.pagesLimit,
      offset,
    })
  }

  handleAccessUpdate(id, status) {
    this.props.actions.updateSquadMember({ id, status })
    unMountModal()
  }

  componentDidMount() {
    this.props.actions.fetchSquadMembers({
      limit: this.pagesLimit,
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
        <div style={{ marginTop: '62px', padding: '20px', width: '100%' }}>
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
                : (
                  <tr>
                    <td colSpan="5">
                      <Loader />
                    </td>
                  </tr>
                )
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
