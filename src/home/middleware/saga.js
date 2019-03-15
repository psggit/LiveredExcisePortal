/*
This is your saga file, which containes generator functions.
This is a side-effect container. Do all your side-effect here only.
*/

import { takeLatest } from 'redux-saga'
import { call, fork, put, all } from 'redux-saga/effects'
import * as ActionTypes from './../constants/actions'
import * as Api from './api'
import Notify from '@components/notification';

/**
 * Handlers
 */
function* fetchInProgressOTTP(action) {
  console.log("fetch in progress otp")
  try {
    const data = yield call(Api.fetchInProgressOTTP, action)
    yield put({ type: ActionTypes.SUCCESS_FETCH_IN_PROGRESS_OTTP, data })
  } catch (err) {
    console.log(err)
    err.response.json().then(json => { Notify(json.message, "warning") })
  }
}


function* fetchHistoryOTTP(action) {
  try {
    const data = yield call(Api.fetchHistoryOTTP, action)
    yield put({ type: ActionTypes.SUCCESS_FETCH_HISTORY_OTTP, data })
  } catch (err) {
    console.log(err)
    err.response.json().then(json => { Notify(json.message, "warning") })
  }
}

function* fetchDSOList(action) {
  try {
    const data = yield call(Api.fetchDSOList, action)
    yield put({ type: ActionTypes.SUCCESS_FETCH_DSO_LIST, data })
  } catch (err) {
    console.log(err)
    err.response.json().then(json => { Notify(json.message, "warning") })
  }
}

function* fetchConsumerList(action) {
  try {
    const data = yield call(Api.fetchConsumerList, action)
    yield put({ type: ActionTypes.SUCCESS_FETCH_CONSUMER_LIST, data })
  } catch (err) {
    console.log(err)
    err.response.json().then(json => { Notify(json.message, "warning") })
  }
}

function* fetchConsumerComplaints(action) {
  try {
    const data = yield call(Api.fetchConsumerComplaints, action)
    yield put({ type: ActionTypes.SUCCESS_FETCH_CONSUMER_COMPLAINTS_LIST, data })
  } catch (err) {
    console.log(err)
    err.response.json().then(json => { Notify(json.message, "warning") })
  }
}

function* fetchDSODetails(action) {
  try {
    const data = yield call(Api.fetchDSODetails, action)
    yield put({ type: ActionTypes.SUCCESS_FETCH_DSO_DETAILS, data })
  } catch (err) {
    console.log(err)
    err.response.json().then(json => { Notify(json.message, "warning") })
  }
}

function* fetchOutletList(action) {
  try {
    const data = yield call(Api.fetchOutletList, action)
    yield put({ type: ActionTypes.SUCCESS_FETCH_OUTLETS_LIST, data })
  } catch (err) {
    console.log(err)
    err.response.json().then(json => { Notify(json.message, "warning") })
  }
}

function* fetchRetailerList(action) {
  try {
    const data = yield call(Api.fetchRetailerList, action)
    yield put({ type: ActionTypes.SUCCESS_FETCH_RETAILER_LIST, data })
  } catch (err) {
    console.log(err)
    err.response.json().then(json => { Notify(json.message, "warning") })
  }
}

function* fetchRetailerDetails(action) {
  try {
    const data = yield call(Api.fetchRetailerDetails, action)
    yield put({ type: ActionTypes.SUCCESS_FETCH_RETAILER_DETAILS, data })
  } catch (err) {
    console.log(err)
    err.response.json().then(json => { Notify(json.message, "warning") })
  }
}

function* fetchOTTPDetail(action) {
  try {
    const data = yield call(Api.fetchOTTPDetail, action)
    yield put({ type: ActionTypes.SUCCESS_FETCH_OTTP_DETAIL, data })
  } catch (err) {
    console.log(err)
    err.response.json().then(json => { Notify(json.message, "warning") })
  }
}

function* fetchRevenueDetails(action) {
  console.log("fetch revenue details")
  try {
    const data = yield call(Api.fetchRevenueDetails, action)
    yield put({ type: ActionTypes.SUCCESS_FETCH_REVENUE_LIST, data })
  } catch (err) {
    console.log(err)
    err.response.json().then(json => { Notify(json.message, "warning") })
  }
}

function* fetchPermitDetails(action) {
  console.log("fetch revenue details")
  try {
    const data = yield call(Api.fetchPermitDetails, action)
    yield put({ type: ActionTypes.SUCCESS_FETCH_PERMIT_LIST, data })
  } catch (err) {
    console.log(err)
    err.response.json().then(json => { Notify(json.message, "warning") })
  }
}


function* fetchRules(action) {
  try {
    const data = yield call(Api.fetchRules, action)
    yield put({ type: ActionTypes.SUCCESS_FETCH_RULES, data })
  } catch (err) {
    console.log(err)
    err.response.json().then(json => { Notify(json.message, "warning") })
  }
}

function* fetchUserList(action) {
  try {
    const data = yield call(Api.fetchUserList, action)
    yield put({ type: ActionTypes.SUCCESS_FETCH_USERS_LIST, data })
  } catch (err) {
    err.response.json().then(json => { Notify(json.message, "warning") })
  }
}

function* fetchCitiesList(action) {
  //console.log(action)
  try {
    const data = yield call(Api.fetchCitiesList, action)
    yield put({ type: ActionTypes.SUCCESS_FETCH_CITIES_LIST, data })
  } catch (err) {
    //console.log(err)
    err.response.json().then(json => { Notify(json.message, "warning") })
  }
}

function* setLoading(action) {
  try {
    yield put({ type: ActionTypes.SUCCESS_SET_LOADING, data: action.data })
  } catch (err) {
    console.log(err)
  }
}

function* createComplaints(action) {
  try {
    const data = yield call(Api.createComplaints, action)
    yield put({ type: ActionTypes.SUCCESS_CREATE_COMPLAINTS, data })
    Notify("Submitted complaint", "success")
  } catch (err) {
    console.log(err)
  }
}

function* setLoadingAll() {
  try {
    yield put({ type: ActionTypes.SUCCESS_SET_LOADING_ALL })
  } catch (err) {
    console.log(err)
  }
}

function* watchFetchInProgressOTTP() {
  while (true) {
    yield* takeLatest(ActionTypes.REQUEST_FETCH_IN_PROGRESS_OTTP, fetchInProgressOTTP)
  }
}

function* watchFetchHistoryOTTP() {
  while (true) {
    yield* takeLatest(ActionTypes.REQUEST_FETCH_HISTORY_OTTP, fetchHistoryOTTP)
  }
}

function* watchFetchRules() {
  while (true) {
    yield* takeLatest(ActionTypes.REQUEST_FETCH_RULES, fetchRules)
  }
}

function* watchFetchUserList() {
  while (true) {
    yield* takeLatest(ActionTypes.REQUEST_FETCH_USERS_LIST, fetchUserList)
  }
}

function* watchFetchConsumerList() {
  while (true) {
    yield* takeLatest(ActionTypes.REQUEST_FETCH_CONSUMER_LIST, fetchConsumerList)
  }
}

function* watchFetchConsumerComplaints() {
  while (true) {
    yield* takeLatest(ActionTypes.REQUEST_FETCH_CONSUMER_COMPLAINTS_LIST, fetchConsumerComplaints)
  }
}

function* watchFetchDSOList() {
  while (true) {
    yield* takeLatest(ActionTypes.REQUEST_FETCH_DSO_LIST, fetchDSOList)
  }
}

function* watchFetchDSODetails() {
  while (true) {
    yield* takeLatest(ActionTypes.REQUEST_FETCH_DSO_DETAILS, fetchDSODetails)
  }
}

function* watchFetchRevenueDetails() {
  //console.log("hello")
  while (true) {
    yield* takeLatest(ActionTypes.REQUEST_FETCH_REVENUE_LIST, fetchRevenueDetails)
  }
}

function* watchFetchPermitDetails() {
  while (true) {
    yield* takeLatest(ActionTypes.REQUEST_FETCH_PERMIT_LIST, fetchPermitDetails)
  }
}
function* watchFetchOutletList() {
  while (true) {
    yield* takeLatest(ActionTypes.REQUEST_FETCH_OUTLETS_LIST, fetchOutletList)
  }
}

function* watchFetchRetailerList() {
  while (true) {
    yield* takeLatest(ActionTypes.REQUEST_FETCH_RETAILER_LIST, fetchRetailerList)
  }
}

function* watchFetchRetailerDetails() {
  while (true) {
    yield* takeLatest(ActionTypes.REQUEST_FETCH_RETAILER_DETAILS, fetchRetailerDetails)
  }
}

function* watchCreateComplaints() {
  while (true) {
    yield* takeLatest(ActionTypes.REQUEST_CREATE_COMPLAINTS, createComplaints)
  }
}

function* watchFetchOTTPDetail() {
  while (true) {
    yield* takeLatest(ActionTypes.REQUEST_FETCH_OTTP_DETAIL, fetchOTTPDetail)
  }
}

function* watchFetchCitiesList() {
  while (true) {
    yield* takeLatest(ActionTypes.REQUEST_FETCH_CITIES_LIST, fetchCitiesList)
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
    fork(watchFetchInProgressOTTP),
    fork(watchFetchHistoryOTTP),
    fork(watchFetchOTTPDetail),
    fork(watchSetLoading),
    fork(watchSetLoadingAll),
    fork(watchFetchDSODetails),
    fork(watchFetchDSOList),
    fork(watchFetchRetailerList),
    fork(watchFetchRetailerDetails),
    fork(watchFetchRules),
    fork(watchFetchConsumerList),
    fork(watchFetchConsumerComplaints),
    fork(watchFetchCitiesList),
    fork(watchFetchOutletList),
    fork(watchFetchRevenueDetails),
    fork(watchFetchPermitDetails),
    fork(watchCreateComplaints),
    fork(watchFetchUserList)
  ]
}
