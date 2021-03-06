import * as ActionTypes from './../constants/actions'

const initialState = {
  loadingInProgressOTTP: true,
  loadingHistoryOTTP: true,
  loadingOTTPDetail: true,
  loadingDSOList: true,
  loadingDSODetail: true,
  loadingRetailerList: true,
  loadingRetailerDetail: true,
  loadingAuditLog: true,
  loadingCustomerList: true,
  loadingCustomerComplaints: true,
  loadingRules: true,
  loadingCityList: true,
  loadingOutletList: true,
  loadingPermitList: true,
  loadingRevenueList: true,
  loadingUserList: true,
  creatingComplaint: true,
  inProgressCount: 0,
  customerComplaintsCount: 0,
  auditLogCount: 0,
  historyOTTPCount: 0,
  retailerListCount: 0,
  userListCount: 0,
  DSOListCount: 0,
  customerListCount: 0,
  inProgressOTTP: [],
  historyOTTPData: [],
  auditLog: [],
  cityList: [],
  retailerList: [],
  userList: [],
  customerList: [],
  outletList: [],
  rulesData: [],
  DSOList: [],
  DSODetail: [],
  retailerDetail: [],
  customerComplaints: [],
  revenueList: [],
  permitList: [],
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

  [ActionTypes.SUCCESS_FETCH_CONSUMER_LIST]: (state, action) => {
    return Object.assign({}, state, {
      loadingCustomerList: false,
      customerList: action.data.consumers,
      customerListCount: action.data.count
    })
  },

  [ActionTypes.SUCCESS_FETCH_AUDIT_LOG]: (state, action) => {
    return Object.assign({}, state, {
      loadingAuditLog: false,
      auditLog: action.data.log,
      auditLogCount: action.data.count
    })
  },

  [ActionTypes.SUCCESS_FETCH_CITIES_LIST]: (state, action) => {
    return Object.assign({}, state, {
      loadingCityList: false,
      cityList: action.data.stateCity,
      //customerListCount: action.data.count
    })
  },

  [ActionTypes.SUCCESS_FETCH_CONSUMER_COMPLAINTS_LIST]: (state, action) => {
    return Object.assign({}, state, {
      loadingCustomerComplaints: false,
      customerComplaints: action.data.complaints,
      customerComplaintsCount: action.data.count
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
      DSODetail: action.data.dso,
      // DSODetailCount: action.data.count
    })
  },

  [ActionTypes.SUCCESS_FETCH_USERS_LIST]: (state, action) => {
    return Object.assign({}, state, {
      loadingUserList: false,
      userList: action.data.excise_users,
      userListCount: action.data.count
    })
  },

  [ActionTypes.SUCCESS_CREATE_COMPLAINTS]: (state, action) => {
    return Object.assign({}, state, {
      creatingComplaint: false,
    })
  },

  [ActionTypes.SUCCESS_FETCH_RETAILER_LIST]: (state, action) => {
    return Object.assign({}, state, {
      loadingRetailerList: false,
      retailerList: action.data.retailer_list,
      retailerListCount: action.data.count
    })
  },

  [ActionTypes.SUCCESS_FETCH_OUTLETS_LIST]: (state, action) => {
    return Object.assign({}, state, {
      loadingOutletList: false,
      outletList: action.data.outlets_list,
      //retailerListCount: action.data.count
    })
  },

  [ActionTypes.SUCCESS_FETCH_RETAILER_DETAILS]: (state, action) => {
    return Object.assign({}, state, {
      loadingRetailerDetail: false,
      retailerDetail: action.data,
      // DSODetailCount: action.data.count
    })
  },

  [ActionTypes.SUCCESS_FETCH_PERMIT_LIST]: (state, action) => {
    return Object.assign({}, state, {
      loadingPermitList: false,
      permitList: action.data.overview.stats,
      // DSODetailCount: action.data.count
    })
  },

  [ActionTypes.SUCCESS_FETCH_REVENUE_LIST]: (state, action) => {
    return Object.assign({}, state, {
      loadingRevenueList: false,
      revenueList: action.data.overview.stats,
      // DSODetailCount: action.data.count
    })
  },

  [ActionTypes.SUCCESS_FETCH_RULES]: (state, action) => {
    return Object.assign({}, state, {
      loadingRules: false,
      rulesData: action.data.rules
    })
  },

  [ActionTypes.SUCCESS_FETCH_OTTP_DETAIL]: (state, action) => {
    return Object.assign({}, state, {
      loadingOTTPDetail: false,
      OTTPDetailData: action.data.ottp
    })
  },

  [ActionTypes.SUCCESS_SET_LOADING]: (state, action) => {
    if (action.data) {
      return Object.assign({}, state, {
        [action.data]: true
      })
    }
  },

  [ActionTypes.SUCCESS_SET_LOADING_ALL]: (state, action) => {
    return Object.assign({}, state, {
      loadingInProgressOTTP: true,
      loadingHistoryOTTP: true,
      loadingOTTPDetail: true,
      loadingSquadMembers: true,
      loadingDSOList: true,
      loadingAuditLog: true,
      auditLog: [],
      DSOList: []
    })
  }
}

export default function reducer(state = initialState, action = {}) {
  const fn = actionsMap[action.type]
  return fn ? fn(state, action) : state
}
