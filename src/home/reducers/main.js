import * as ActionTypes from './../constants/actions'

const initialState = {
  loadingInProgressOTTP: true,
  loadingHistoryOTTP: true,
  loadingOTTPDetail: true,
  loadingDSOList: true,
  loadingDSODetail: true,
  loadingRetailerList: true,
  loadingRetailerDetail: true,
  loadingCustomerList: true,
  loadingCustomerComplaints: true,
  loadingRules: true,
  loadingCityList: true,
  loadingOutletList: true,
  loadingPermitList: true,
  loadingRevenueList: true,
  inProgressCount: 0,
  customerComplaintsCount: 0,
  historyOTTPCount: 0,
  retailerListCount: 0,
  DSOListCount: 0,
  customerListCount: 0,
  inProgressOTTP: [],
  historyOTTPData: [],
  cityList: [],
  retailerList: [],
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

  [ActionTypes.SUCCESS_FETCH_CITIES_LIST]: (state, action) => {
    return Object.assign({}, state, {
      loadingCityList: false,
      cityList: action.data.cities,
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
      rulesData: action.data
    })
  },

  [ActionTypes.SUCCESS_FETCH_OTTP_DETAIL]: (state, action) => {
    return Object.assign({}, state, {
      loadingOTTPDetail: false,
      OTTPDetailData: action.data.ottp
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
