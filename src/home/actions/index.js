import * as ActionTypes from './../constants/actions'

export const fetchInProgressOTTP = data => ({
  type: ActionTypes.REQUEST_FETCH_IN_PROGRESS_OTTP,
  data
})

export const fetchHistoryOTTP = data => ({
  type: ActionTypes.REQUEST_FETCH_HISTORY_OTTP,
  data
})

export const fetchRules = data => ({
  type: ActionTypes.REQUEST_FETCH_RULES,
  data
})

export const fetchConsumerList = data => ({
  type: ActionTypes.REQUEST_FETCH_CONSUMER_LIST,
  data
})

export const fetchConsumerComplaints = data => ({
  type: ActionTypes.REQUEST_FETCH_CONSUMER_COMPLAINTS_LIST,
  data
})

export const fetchDSOList = data => ({
  type: ActionTypes.REQUEST_FETCH_DSO_LIST,
  data
})

export const fetchDSODetails = data => ({
  type: ActionTypes.REQUEST_FETCH_DSO_DETAILS,
  data
})

export const fetchRetailerList = data => ({
  type: ActionTypes.REQUEST_FETCH_RETAILER_LIST,
  data
})

export const fetchRetailerDetails = data => ({
  type: ActionTypes.REQUEST_FETCH_RETAILER_DETAILS,
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

export const addSquadMember = data => ({
  type: ActionTypes.REQUEST_ADD_SQUAD_MEMBER,
  data
})

export const updateSquadMember = data => ({
  type: ActionTypes.REQUEST_UPDATE_SQUAD_MEMBER,
  data
})

export const setLoadingAll = () => ({
  type: ActionTypes.REQUEST_SET_LOADING_ALL
})

export const updateStateExciseRules = data => ({
  type: ActionTypes.REQUEST_UPDATE_STATE_EXCISE_RULES,
  data
})

export const fetchCitiesList = (data) => ({
  type: ActionTypes.REQUEST_FETCH_CITIES_LIST
})
