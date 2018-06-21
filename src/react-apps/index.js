import 'babel-polyfill'
import React from 'react'
import { render } from 'react-dom'
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

import Login from './login'
import Home from './home/container/Root'

// import makeAsyncComponent from './makeAsyncComponent'
// const Login = makeAsyncComponent(() => import("./login").then(module => module.default), { name: "Page 1" })
// const Dashboard = makeAsyncComponent(() => import("./dashboard").then(module => module.default), { name: "Page 1" })

class App extends React.Component {
  render() {
    return (
      <Router>
        <div>
          <Route exact path="/" component={Login} />
          <Route path="/home" component={Home} />
        </div>
      </Router>
    )
  }
}

render(<App />, document.getElementById('root'))

export default App
