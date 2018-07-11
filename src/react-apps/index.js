import 'babel-polyfill'
import React from 'react'
import { render } from 'react-dom'
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom'

import { Api } from '@utils/config'
import Login from './login'
import Home from './home/container/Root'

// import makeAsyncComponent from './makeAsyncComponent'
// const Login = makeAsyncComponent(() => import("./login").then(module => module.default), { name: "Page 1" })
// const Dashboard = makeAsyncComponent(() => import("./dashboard").then(module => module.default), { name: "Page 1" })

class App extends React.Component {
  componentWillMount() {
    console.log("debug");
    const fetchOptions = {
      method: 'get',
      credentials: 'include',
      mode: 'cors',
      'x-hasura-role': 'user'
    }
    // https://auth.hipbar-dev.com/user/account/info
    fetch(`${Api.authUrl}/user/account/info`, fetchOptions)
      .then((response) => {
        if (response.status !== 200) {
          console.log(`Looks like there was a problem. Status Code: ${response.status}`)
          if (location.pathname !== '/login') {
            location.href = '/login'
          }
          return
        }
        response.json().then((data) => {
          if (!location.pathname.includes('home')) {
            // createSession(data)
            location.href = '/home/live-ottp'
          }
        })
      })
      .catch((err) => {
        console.log('Fetch Error :-S', err)
        if (location.pathname !== '/login') {
          location.href = '/login'
        }
      })
  }

  render() {
    return (
      <Router>
        <div>
          <Route exact path="/" component={Login} />
          <Route exact path="/login" component={Login} />
          <Route path="/home" component={Home} />
        </div>
      </Router>
    )
  }
}

render(<App />, document.getElementById('root'))

export default App
