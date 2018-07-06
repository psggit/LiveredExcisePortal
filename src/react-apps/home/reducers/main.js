import * as ActionTypes from './../constants/actions'

const initialState = {
  loadingInProgressOTTP: true,
  loadingHistoryOTTP: true,
  loadingOTTPDetail: true,
  loadingSquadMembers: true,
  inProgressOTTP: [],
  historyOTTPData: [],
  squadMembersData: [],
  OTTPDetailData: {}
}

const actionsMap = {
  [ActionTypes.SUCCESS_FETCH_IN_PROGRESS_OTTP]: (state, action) => {
    return Object.assign({}, state, {
      loadingInProgressOTTP: false,
      inProgressOTTP: action.data.data,
      inProgressCount: action.data.count
    })
  },

  [ActionTypes.SUCCESS_FETCH_HISTORY_OTTP]: (state, action) => {
    return Object.assign({}, state, {
      loadingHistoryOTTP: false,
      historyOTTPData: action.data.data,
      historyOTTPCount: action.data.count
    })
  },

  [ActionTypes.SUCCESS_FETCH_OTTP_DETAIL]: (state, action) => {
    return Object.assign({}, state, {
      loadingOTTPDetail: false,
      OTTPDetailData: action.data.data
    })
  },

  [ActionTypes.SUCCESS_FETCH_SQUAD_MEMBERS]: (state, action) => {
    return Object.assign({}, state, {
      loadingSquadMembers: false,
      squadMembersData: action.data.data
    })
  },

  [ActionTypes.SUCCESS_UPDATE_SQUAD_MEMBER]: (state, action) => {
    return Object.assign({}, state, {
      loadingOrderDetail: false,
      orderDetailData: action.data.orderStatus
    })
  }
}

export default function reducer(state = initialState, action = {}) {
  const fn = actionsMap[action.type]
  return fn ? fn(state, action) : state
}
