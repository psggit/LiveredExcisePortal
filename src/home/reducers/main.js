import * as ActionTypes from './../constants/actions'

const initialState = {
  loadingInProgressOTTP: true,
  loadingHistoryOTTP: true,
  loadingOTTPDetail: true,
  loadingSquadMembers: true,
  loadingDSOList: true,
  loadingDSODetail: true,
  loadingRetailerList: true,
  loadingRetailerDetail: true,
  loadingRules: true,
  inProgressCount: 0,
  historyOTTPCount: 0,
  retailerListCount: 0,
  DSOListCount: 0,
  inProgressOTTP: [],
  historyOTTPData: [],
  squadMembersData: [],
  retailerList: [],
  rulesData: [],
  DSOList: [],
  DSODetail: [],
  retailerDetail: [],
  OTTPDetailData: {}
}

const actionsMap = {
  [ActionTypes.SUCCESS_FETCH_IN_PROGRESS_OTTP]: (state, action) => {
    return Object.assign({}, state, {
      loadingInProgressOTTP: false,
      inProgressOTTP: action.data.ottp,
      inProgressCount: action.data.count
    })
  },

  [ActionTypes.SUCCESS_FETCH_HISTORY_OTTP]: (state, action) => {
    return Object.assign({}, state, {
      loadingHistoryOTTP: false,
      historyOTTPData: action.data.ottp,
      historyOTTPCount: action.data.count
    })
  },

  [ActionTypes.SUCCESS_FETCH_DSO_LIST]: (state, action) => {
    return Object.assign({}, state, {
      loadingDSOList: false,
      DSOList: action.data.dso,
      DSOListCount: action.data.count
    })
  },

  [ActionTypes.SUCCESS_FETCH_DSO_DETAILS]: (state, action) => {
    return Object.assign({}, state, {
      loadingDSODetail: false,
      DSODetail: action.data,
      // DSODetailCount: action.data.count
    })
  },

  [ActionTypes.SUCCESS_FETCH_RETAILER_LIST]: (state, action) => {
    return Object.assign({}, state, {
      loadingRetailerList: false,
      retailerList: action.data.data,
      retailerListCount: action.data.count
    })
  },

  [ActionTypes.SUCCESS_FETCH_RETAILER_DETAILS]: (state, action) => {
    return Object.assign({}, state, {
      loadingRetailerDetail: false,
      retailerDetail: action.data,
      // DSODetailCount: action.data.count
    })
  },

  [ActionTypes.SUCCESS_FETCH_RULES]: (state, action) => {
    return Object.assign({}, state, {
      loadingRules: false,
      rulesData: action.data
    })
  },

  [ActionTypes.SUCCESS_FETCH_OTTP_DETAIL]: (state, action) => {
    return Object.assign({}, state, {
      loadingOTTPDetail: false,
      OTTPDetailData: action.data.ottp
    })
  },

  [ActionTypes.SUCCESS_FETCH_SQUAD_MEMBERS]: (state, action) => {
    const transformedSquadMembersData = action.data.data.map((item) => {
      const _role = item.role.replace('_', ' ')
      item.role = _role.charAt(0).toUpperCase() + _role.slice(1)
      return item
    })
    return Object.assign({}, state, {
      loadingSquadMembers: false,
      squadMembersData: transformedSquadMembersData,
      squadMembersCount: action.data.count
    })
  },

  [ActionTypes.SUCCESS_UPDATE_SQUAD_MEMBER]: (state, action) => {
    const updatedSquadMembersData = state.squadMembersData.map((item) => {
      if (action.data.id === item.id) {
        item.status = action.data.status
      }
      return item
    })

    return Object.assign({}, state, {
      squadMembersData: updatedSquadMembersData
    })
  },

  [ActionTypes.SUCCESS_SET_LOADING_ALL]: (state, action) => {
    return Object.assign({}, state, {
      loadingInProgressOTTP: true,
      loadingHistoryOTTP: true,
      loadingOTTPDetail: true,
      loadingSquadMembers: true
    })
  }
}

export default function reducer(state = initialState, action = {}) {
  const fn = actionsMap[action.type]
  return fn ? fn(state, action) : state
}
