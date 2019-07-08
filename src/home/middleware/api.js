import { POST, GET } from '@utils/fetch'

// const ipAddress = "192.168.5.84"

//dev
// const ottp = "https://79bd647f.ngrok.io"
// export const dso = "http://192.168.5.84:3002"
// const credit = "https://23fff800.ngrok.io"
// export const consumer = "https://9800b602.ngrok.io"
// const rule = "https://d429cc52.ngrok.io"

//prod 
const ottp = "https://ottp.livered-dev.com"
export const dso = "https://dsomanagement.livered-dev.com"
const credit = "https://credit.livered-dev.com"
export const consumer = "https://consumer.livered-dev.com"
const rule = "https://ruleengine.livered-dev.com"

export function fetchInProgressOTTP(action) {
  return POST({
    api: `${ottp}/livered/ottp/liveOttps`,
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
    api: `${ottp}/livered/ottp/getCityAndStates`,
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

