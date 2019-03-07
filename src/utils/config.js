// function getAPIObj() {
//   if (window.location.href.split(':')[1] === '//localhost') {
//     let scheme = 'https'
//     let baseHost = '.amebae21.hasura-app.io'
//     let appName = 'amebae21'

//     return {
//       authUrl: 'https://auth.' + appName + '.hasura-app.io',
//       blogicUrl: 'https://api1.' + appName + '.hasura-app.io',
//       gremlinUrl: scheme + '://gremlin' + baseHost,
//       catman: scheme + '://catman' + baseHost,
//       ordermanUrl: scheme + '://orderman' + baseHost,
//       deliverymanUrl: scheme + '://deliveryman' + baseHost,
//       socketUrl: 'https://livered' + baseHost,
//       agamotto: scheme + '://agamotto' + baseHost,
//       livered: '192.168.5.86:8084',
//       api1: 'https://api1.' + appName + '.hasura-app.io'
//     }
//   } else {
//     let scheme = window.location.href.split(':')[0]
//     let baseHost = window.location.hostname.match(/.*?(\..*)/)[1]
//     let subdomain = window.location.hostname.split('.')[0]
//     console.log("scheme", scheme, "base host", baseHost)
//     return {
//       authUrl: scheme + '://auth' + baseHost,
//       blogicUrl: scheme + '://api1' + baseHost,
//       gremlinUrl: scheme + '://gremlin' + baseHost,
//       ordermanUrl: scheme + '://orderman' + baseHost,
//       catman: scheme + '://catman' + baseHost,
//       deliverymanUrl: scheme + '://deliveryman' + baseHost,
//       socketUrl: scheme + '://livered' + baseHost,
//       agamotto: scheme + '://agamotto' + baseHost,
//       livered: '192.168.5.86:8084',
//       api1: scheme + '://api1' + baseHost
//     }
//   }
// }

// // export const api_base_url = getApiBaseUrl()
// // export const host_server = getHostServer()

// export const Api = getAPIObj()


function getAPIObj() {
  // console.log(BASE_URL)
  console.log(process.env.BASE_URL)
  const baseHost = process.env.BASE_URL
 
  return {
    //livered: '192.168.5.86:8084',
    api1: 'https://api1.' + baseHost,
    authUrl: "https://auth." + baseHost,
  }
}

// export const api_base_url = getApiBaseUrl()
// export const host_server = getHostServer()

export const Api = getAPIObj()

