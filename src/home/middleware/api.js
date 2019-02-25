import { POST, GET } from '@utils/fetch'

export function fetchInProgressOTTP(action) {
  return POST({
    api: 'http://192.168.5.86:3000/livered/liveOttps',
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
    api: 'http://192.168.5.86:3000/livered/ottpHistory',
    //apiBase: 'agamotto',
    handleError: true,
    prependBaseUrl: false,
    data: action.data
  })
    .then(json => json)
}

export function fetchOTTPDetail(action) {
  return POST({
    api: 'http://192.168.5.86:3000/livered/ottpDetails',
    handleError: true,
    prependBaseUrl: false,
    data: action.data
  })
    .then(json => json)
}

export function fetchDSOList(action) {
  return POST({
    api: 'http://192.168.5.86:8086/livered/listDso',
    handleError: true,
    prependBaseUrl: false,
    data: action.data
  })
    .then(json => json)
}

export function fetchCitiesList(action) {
  return GET({
    api: 'http://192.168.5.86:3000/livered/listCities',
    handleError: true,
    prependBaseUrl: false,
    //data: action.data
  })
    .then(json => json)
}

export function fetchDSODetails(action) {
  return POST({
    api: 'http://192.168.5.86:8086/livered/dsoDetails',
    handleError: true,
    prependBaseUrl: false,
    data: action.data
  })
    .then(json => json)
}

export function fetchRules(action) {
  return POST({
    api: 'http://192.168.5.86:8085/ruleEngine/listRules',
    handleError: true,
    prependBaseUrl: false,
    data: action.data
  })
    .then(json => json)
}

export function fetchRetailerList(action) {
  return POST({
    api: 'http://192.168.5.86:8086/livered/listDso',
    handleError: true,
    prependBaseUrl: false,
    data: action.data
  })
    .then(json => json)
}

export function fetchRetailerDetails(action) {
  return POST({
    api: 'http://192.168.5.86:8086/livered/dsoDetails',
    handleError: true,
    prependBaseUrl: false,
    data: action.data
  })
    .then(json => json)
}

export function fetchConsumerList(action) {
  return POST({
    api: 'http://192.168.5.86:8087/livered/listConsumers',
    handleError: true,
    prependBaseUrl: false,
    data: action.data
  })
    .then(json => json)
}

export function fetchConsumerComplaints(action) {
  return POST({
    api: 'http://192.168.5.86:8087/livered/listComplaints',
    handleError: true,
    prependBaseUrl: false,
    data: action.data
  })
    .then(json => json)
}

export function fetchSquadMembers(action) {
  return POST({
    api: '/excisePortal/userManagement/listUsers',
    handleError: true,
    apiBase: 'agamotto',
    data: action.data
  })
    .then(json => json)
}

export function updateSquadMember(action) {
  return POST({
    api: '/excisePortal/userManagement/updateUsers',
    handleError: true,
    apiBase: 'agamotto',
    data: action.data
  })
    .then(json => json)
}

export function addSquadMember(action) {
  return POST({
    api: '/excisePortal/userManagement/addUsers',
    handleError: true,
    apiBase: 'agamotto',
    data: action.data
  })
    .then(json => json)
}

export function updateStateExciseRules(action) {
  return POST({
    api: '/excisePortal/userManagement/addUsers',
    handleError: true,
    apiBase: 'agamotto',
    data: action.data
  })
    .then(json => json)
}
