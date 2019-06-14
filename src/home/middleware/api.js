import { POST, GET } from '@utils/fetch'

// const ipAddress = "192.168.5.84"

const ottp = "https://02e60307.ngrok.io"
export const dso = "https://6f258f66.ngrok.io"
const credit = "https://dc3e9629.ngrok.io"
export const consumer = "https://32fcbab7.ngrok.io"
const rule = "https://3ff20ddb.ngrok.io"

export function fetchInProgressOTTP(action) {
  return POST({
    api: `${ottp}/livered/ottp/liveOttps`,
    // apiBase: 'livered',
    handleError: true,
    prependBaseUrl: false,
    data: action.data
  })
    .then(json => json)
}

export function fetchHistoryOTTP(action) {
  return POST({
    //api: '/excisePortal/ottpHistory',
    api: `${ottp}/livered/ottp/ottpHistory`,
    //apiBase: 'agamotto',
    handleError: true,
    prependBaseUrl: false,
    data: action.data
  })
    .then(json => json)
}

export function fetchOTTPDetail(action) {
  return POST({
    api: `${ottp}/livered/ottp/ottpDetails`,
    handleError: true,
    prependBaseUrl: false,
    data: action.data
  })
    .then(json => json)
}

export function fetchDSOList(action) {
  return POST({
    api: `${dso}/livered/dso/listDso`,
    handleError: true,
    prependBaseUrl: false,
    data: action.data
  })
    .then(json => json)
}

export function fetchCitiesList(action) {
  return GET({
    api: `${ottp}/livered/ottp/listCities`,
    handleError: true,
    prependBaseUrl: false,
    //data: action.data
  })
    .then(json => json)
}

export function fetchDSODetails(action) {
  console.log("action", action)
  return POST({
    api: `${dso}/livered/dso/dsoDetails`,
    handleError: true,
    prependBaseUrl: false,
    data: action.data
  })
    .then(json => json)
}

export function fetchRules(action) {
  return POST({
    api: `${rule}/livered/rules/listRules`,
    handleError: true,
    prependBaseUrl: false,
    data: action.data
  })
    .then(json => json)
}

export function fetchOutletList(action) {
  return POST({
    api: `http://${ipAddress}:3001/livered/retailer/listOutlets`,
    handleError: true,
    prependBaseUrl: false,
    data: action.data
  })
    .then(json => json)
}

export function fetchRetailerList(action) {
  return POST({
    api: `http://${ipAddress}:3001/livered/retailer/listRetailers`,
    handleError: true,
    prependBaseUrl: false,
    data: action.data
  })
    .then(json => json)
}

export function fetchRetailerDetails(action) {
  return POST({
    api: `http://${ipAddress}:3001/livered/retailer/retailerDetails`,
    handleError: true,
    prependBaseUrl: false,
    data: action.data
  })
    .then(json => json)
}

export function fetchConsumerList(action) {
  return POST({
    api: `${consumer}/livered/consumers/listConsumers`,
    handleError: true,
    prependBaseUrl: false,
    data: action.data
  })
    .then(json => json)
}

export function fetchConsumerComplaints(action) {
  return POST({
    api: `${consumer}/livered/consumers/listComplaints`,
    handleError: true,
    prependBaseUrl: false,
    data: action.data
  })
    .then(json => json)
}

export function fetchRevenueDetails(action) {
  return POST({
    api: `${credit}/livered/credits/revenueOverview`,
    handleError: true,
    prependBaseUrl: false,
    data: action.data
  })
    .then(json => json)
}

export function fetchPermitDetails(action) {
  return POST({
    api: `${ottp}/livered/ottp/ottpOverview`,
    handleError: true,
    prependBaseUrl: false,
    data: action.data
  })
    .then(json => json)
}

export function fetchUserList(action) {
  return POST({
    api: `${dso}/livered/dso/listExciseUsers`,
    handleError: true,
    prependBaseUrl: false,
    data: action.data
  })
    .then(json => json)
}

export function fetchAuditLog(action) {
  return POST({
    api: `${ottp}/livered/ottp/listAuditLog`,
    handleError: true,
    prependBaseUrl: false,
    data: action.data
  })
    .then(json => json)
}

export function createComplaints(action) {
  return POST({
    api: `${ottp}/livered/createExciseComplaints`,
    handleError: true,
    prependBaseUrl: false,
    data: action.data
  })
    .then(json => json)
}

