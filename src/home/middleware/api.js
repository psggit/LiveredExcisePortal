import { POST } from '@utils/fetch'

export function fetchInProgressOTTP(action) {
  return POST({
    api: 'https://192.168.5.86:8084/livered/liveOttps',
    // apiBase: 'livered',
    handleError: true,
    prependBaseUrl: false,
    data: action.data
  })
    .then(json => json)
}

export function fetchHistoryOTTP(action) {
  return POST({
    api: '/excisePortal/ottpHistory',
    apiBase: 'agamotto',
    handleError: true,
    data: action.data
  })
    .then(json => json)
}

export function fetchOTTPDetail(action) {
  return POST({
    api: 'https://192.168.5.86:8084/livered/ottpDetails',
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
