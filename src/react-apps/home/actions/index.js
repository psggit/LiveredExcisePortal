import * as ActionTypes from './../constants/actions'

export const fetchLiveOrders = (data) => ({
  type: ActionTypes.REQUEST_FETCH_LIVE_ORDERS,
  data
})

export const fetchHistoryOrders = (data) => ({
  type: ActionTypes.REQUEST_FETCH_HISTORY_ORDERS,
  data
})
