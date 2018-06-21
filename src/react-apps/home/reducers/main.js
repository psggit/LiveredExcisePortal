import * as ActionTypes from './../constants/actions'

const initialState = {
  loadingLiveOrders: true,
  loadingHistoryOrders: true,
  liveOrdersData: [],
  historyOrdersData: []
}

const actionsMap = {
  [ActionTypes.SUCCESS_FETCH_LIVE_ORDERS]: (state, action) => {
    return Object.assign({}, state, {
      loadingLiveOrders: false,
      liveOrdersData: action.data.orders,
      liveOrdersCount: action.data.count
    })
  },

  [ActionTypes.SUCCESS_FETCH_HISTORY_ORDERS]: (state, action) => {
    return Object.assign({}, state, {
      loadingHistoryOrders: false,
      historyOrdersData: action.data.orders,
      historyOrdersCount: action.data.count
    })
  }
}

export default function reducer(state = initialState, action = {}) {
  const fn = actionsMap[action.type]
  return fn ? fn(state, action) : state
}
