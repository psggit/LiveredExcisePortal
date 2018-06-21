/*
This is your saga file, which containes generator functions.
This is a side-effect container. Do all your side-effect here only.
*/

import { takeLatest, delay } from 'redux-saga'
import { call, fork, put, race, take } from 'redux-saga/effects'
import * as ActionTypes from './../constants/actions'
import * as Api from './api'
// import Notify from '@components/Notification'


/**
 * Handlers
 */
function* fetchLiveOrders(action) {
  try {
    const data = yield call(Api.fetchLiveOrders, action)
    yield put({type: ActionTypes.SUCCESS_FETCH_LIVE_ORDERS, data})
  } catch (err) {
    console.log(err)
  }
}


function* fetchHistoryOrders(action) {
  try {
    const data = yield call(Api.fetchHistoryOrders, action)
    yield put({type: ActionTypes.SUCCESS_FETCH_HISTORY_ORDERS, data})
  } catch (err) {
    console.log(err)
  }
}

function* searchLiveOrders(action) {
  try {
    const data = yield call(Api.searchLiveOrders, action)
    yield put({type: ActionTypes.SUCCESS_SEARCH_LIVE_ORDERS, data})
  } catch (err) {
    console.log(err)
  }
}

function* searchHistoryOrders(action) {
  try {
    const data = yield call(Api.searchHistoryOrders, action)
    yield put({type: ActionTypes.SUCCESS_SEARCH_LIVE_ORDERS, data})
  } catch (err) {
    console.log(err)
  }
}

function* fetchOrderDetail(action) {
  console.log(action)
  try {
    const data = yield call(Api.fetchOrderDetail, action)
    yield put({type: ActionTypes.SUCCESS_FETCH_ORDER_DETAIL, data})
  } catch (err) {
    console.log(err)
  }
}


function* setLoading(action) {
  try {
    yield put({ type: ActionTypes.SUCCESS_SET_LOADING, data: action.data })
  } catch (err) {
    console.log(err)
  }
}

function* setLoadingAll(action) {
  try {
    yield put({ type: ActionTypes.SUCCESS_SET_LOADING_ALL, data: action.data })
  } catch (err) {
    console.log(err)
  }
}

function* watchFetchLiveOrders() {
  while (true) {
    yield* takeLatest(ActionTypes.REQUEST_FETCH_LIVE_ORDERS, fetchLiveOrders)
  }
}

function* watchFetchHistoryOrders() {
  while (true) {
    yield* takeLatest(ActionTypes.REQUEST_FETCH_HISTORY_ORDERS, fetchHistoryOrders)
  }
}

function* watchSearchLiveOrders() {
  while (true) {
    yield* takeLatest(ActionTypes.REQUEST_SEARCH_LIVE_ORDERS, searchLiveOrders)
  }
}


function* watchSearchHistoryOrders() {
  while (true) {
    yield* takeLatest(ActionTypes.REQUEST_SEARCH_HISTORY_ORDERS, searchHistoryOrders)
  }
}


function* watchFetchOrderDetail() {
  while (true) {
    yield* takeLatest(ActionTypes.REQUEST_FETCH_ORDER_DETAIL, fetchOrderDetail)
  }
}

function* watchSetLoading() {
  while (true) {
    yield* takeLatest(ActionTypes.REQUEST_SET_LOADING, setLoading)
  }
}

function* watchSetLoadingAll() {
  while (true) {
    yield* takeLatest(ActionTypes.REQUEST_SET_LOADING_ALL, setLoadingAll)
  }
}

export default function* rootSaga() {
  yield [
    fork(watchFetchLiveOrders),
    fork(watchFetchHistoryOrders),
    fork(watchSearchLiveOrders),
    fork(watchSearchHistoryOrders),
    fork(watchFetchOrderDetail),
    fork(watchSetLoading),
    fork(watchSetLoadingAll)
  ]
}
