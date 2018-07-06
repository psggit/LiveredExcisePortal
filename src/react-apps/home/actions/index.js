import * as ActionTypes from './../constants/actions'

export const fetchInProgressOTTP = data => ({
  type: ActionTypes.REQUEST_FETCH_IN_PROGRESS_OTTP,
  data
})

export const fetchHistoryOTTP = data => ({
  type: ActionTypes.REQUEST_FETCH_HISTORY_OTTP,
  data
})

export const fetchOTTPDetail = data => ({
  type: ActionTypes.REQUEST_FETCH_OTTP_DETAIL,
  data
})

export const fetchSquadMembers = data => ({
  type: ActionTypes.REQUEST_FETCH_SQUAD_MEMBERS,
  data
})

export const updateSquadMember = data => ({
  type: ActionTypes.REQUEST_UPDATE_SQUAD_MEMBER,
  data
})
