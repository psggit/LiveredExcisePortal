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

function* fetchDSODetails(action) {
  try {
    const data = yield call(Api.fetchDSODetails, action)
    yield put({ type: ActionTypes.SUCCESS_FETCH_DSO_DETAILS, data })
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

function* fetchSquadMembers(action) {
  console.log(action)
  try {
    const data = yield call(Api.fetchSquadMembers, action)
    yield put({ type: ActionTypes.SUCCESS_FETCH_SQUAD_MEMBERS, data })
  } catch (err) {
    console.log(err)
    err.response.json().then(json => { Notify(json.message, "warning") })
  }
}

function* updateSquadMember(action) {
  console.log(action)
  try {
    const data = yield call(Api.updateSquadMember, action)
    yield put({ type: ActionTypes.SUCCESS_UPDATE_SQUAD_MEMBER, data: { id: action.data.id, status: action.data.status } })
    Notify("Successfully updated squad members", "success");
  } catch (err) {
    console.log(err)
    err.response.json().then(json => { Notify(json.message, "warning") })
  }
}

function* addSquadMember(action) {
  console.log(action)
  try {
    const data = yield call(Api.addSquadMember, action)
    yield put({ type: ActionTypes.REQUEST_FETCH_SQUAD_MEMBERS, data: { offset: 0, limit: 10 } })
    Notify("Successfully added squad members", "success");
  } catch (err) {
    console.log(err)
    err.response.json().then(json => { Notify(json.message, "warning") })
  }
}

function* updateStateExciseRules(action) {
  console.log(action)
  try {
    // const data = yield call(Api.updateStateExciseRules, action)
    yield put({ type: ActionTypes.SUCCESS_UPDATE_STATE_EXCISE_RULES })
    Notify("Successfully updated state excise rules", "success");
  } catch (err) {
    console.log(err)
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

function* watchFetchOTTPDetail() {
  while (true) {
    yield* takeLatest(ActionTypes.REQUEST_FETCH_OTTP_DETAIL, fetchOTTPDetail)
  }
}

function* watchFetchSquadMembers() {
  while (true) {
    yield* takeLatest(ActionTypes.REQUEST_FETCH_SQUAD_MEMBERS, fetchSquadMembers)
  }
}

function* watchUpdateSquadMember() {
  while (true) {
    yield* takeLatest(ActionTypes.REQUEST_UPDATE_SQUAD_MEMBER, updateSquadMember)
  }
}

function* watchAddSquadMember() {
  while (true) {
    yield* takeLatest(ActionTypes.REQUEST_ADD_SQUAD_MEMBER, addSquadMember)
  }
}

function* watchUpdateStateExciseRules() {
  while (true) {
    yield* takeLatest(ActionTypes.REQUEST_UPDATE_STATE_EXCISE_RULES, updateStateExciseRules)
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
    fork(watchFetchSquadMembers),
    fork(watchUpdateSquadMember),
    fork(watchAddSquadMember),
    fork(watchSetLoading),
    fork(watchSetLoadingAll),
    fork(watchUpdateStateExciseRules),
    fork(watchFetchDSODetails),
    fork(watchFetchDSOList)
  ]
}
