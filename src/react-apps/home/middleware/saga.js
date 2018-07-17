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
  try {
    const data = yield call(Api.fetchInProgressOTTP, action)
    yield put({ type: ActionTypes.SUCCESS_FETCH_IN_PROGRESS_OTTP, data })
    Notify("Successfully fetched in progress OTTP", "success");
  } catch (err) {
    console.log(err)
    err.response.json().then(json => { Notify(json.message, "warning") })
  }
}


function* fetchHistoryOTTP(action) {
  try {
    const data = yield call(Api.fetchHistoryOTTP, action)
    yield put({ type: ActionTypes.SUCCESS_FETCH_HISTORY_OTTP, data })
    Notify("Successfully fetched OTTP history", "success");
  } catch (err) {
    console.log(err)
    err.response.json().then(json => { Notify(json.message, "warning") })
  }
}

function* fetchOTTPDetail(action) {
  try {
    const data = yield call(Api.fetchOTTPDetail, action)
    yield put({ type: ActionTypes.SUCCESS_FETCH_OTTP_DETAIL, data })
    Notify("Successfully fetched OTTP details", "success");
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
    Notify("Successfully fetched squad members", "success");
  } catch (err) {
    console.log(err)
    err.response.json().then(json => { Notify(json.message, "warning") })
  }
}

function* updateSquadMember(action) {
  console.log(action)
  try {
    const data = yield call(Api.updateSquadMember, action)
    yield put({ type: ActionTypes.REQUEST_FETCH_SQUAD_MEMBERS, data: { offset: 0, limit: 10 } })
  } catch (err) {
    console.log(err)
  }
}

function* addSquadMember(action) {
  console.log(action)
  try {
    const data = yield call(Api.addSquadMember, action)
    yield put({ type: ActionTypes.REQUEST_FETCH_SQUAD_MEMBERS, data: { offset: 0, limit: 10 } })
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
    fork(watchSetLoadingAll)
  ]
}
