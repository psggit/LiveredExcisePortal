import { POST, GET } from '@utils/fetch'

// const ipAddress = "192.168.5.84"
const ottp = "https://fca0bbea.ngrok.io"
export const dso = "https://007072aa.ngrok.io"
const credit = "https://df53a98c.ngrok.io"
const rule = "https://6774026d.ngrok.io"


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
    api: `${ottp}/livered/ottp/ottpOverview`,
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

