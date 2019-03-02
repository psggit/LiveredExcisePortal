// import 'babel-polyfill'
// import React from 'react'
// import { render } from 'react-dom'
// import {
//   BrowserRouter as Router,
//   Route,
// } from 'react-router-dom'

// import { Api } from '@utils/config'
// import Login from './login/new'
// import Home from './home/container/Root'
// import { createSession } from './login/session'

// import makeAsyncComponent from './makeAsyncComponent'
// // const Login = makeAsyncComponent(() => import("./login").then(module => module.default), { name: "Page 1" })
// // const Home = makeAsyncComponent(() => import("./home/container/Root").then(module => module.default), { name: "Page 1" })

// class App extends React.Component {
//   componentWillMount() {
//   //  this.checkUserLoggedIn()
//   }

//   checkUserLoggedIn() {
//     const fetchOptions = {
//       method: 'get',
//       credentials: 'include',
//       mode: 'cors',
//       'x-hasura-role': 'user'
//     }
//     // https://auth.hipbar-dev.com/user/account/info
//     fetch(`${Api.authUrl}/user/account/info`, fetchOptions)
//       .then((response) => {
//         if (response.status !== 200) {
//           console.log(`Looks like there was a problem. Status Code: ${response.status}`)
//           if (location.pathname !== '/login') {
//             location.href = '/login'
//           }
//           return
//         }
//         response.json().then((data) => {
//           if (!location.pathname.includes('home')) {
//             location.href = '/home/live-ottp'
//           }
//         })
//       })
//       .catch((err) => {
//         console.log('Fetch Error :-S', err)
//         if (location.pathname !== '/login') {
//           location.href = '/login'
//         }
//       })
//   }

//   render() {
//     return (
//       <Router>
//         <div>
//           <Route exact path="/" component={Login} />
//           <Route exact path="/login" component={Login} />
//           <Route path="/home" component={Home} />
//         </div>
//       </Router>
//     )
//   }
// }

// render(<App />, document.getElementById('root'))

// export default App

import React from 'react'
import 'babel-polyfill'
import ReactDOM from "react-dom"
import createHistory from 'history/createBrowserHistory'
import { Route, Switch } from 'react-router-dom'
import { Router } from 'react-router'
import Header from '@components/header'
import SideMenu from '@components/sidemenu'
import { menuItemsMap, menuItems } from './home/constants/navbar-items'
import LiveOTTPList from './home/components/live-ottp-list'
import HistoryOTTPList from './home/components/history-ottp-list'
import OTTPDetail from './home/components/ottp-detail'
import RetailerDetail from './home/components/retailer-details'
import DSODetail from './home/components/dso-details'
import DSO from './home/components/dso-list'
import RetailersList from './home/components/retailers-list'
import RuleManagement from './home/components/rule-engine'
import Complaints from './home/components/complaints'
import SuccessPage from './home/components/complaint-success'
import FailurePage from './home/components/complaint-failure'
import '@sass/app.scss'
import { Api } from '@utils/config'
import Login from './login/new'
import { createSession } from './login/session'
import { Provider } from 'react-redux'
import configureStore from './home/store/configure-store'
import rootSaga from './home/middleware/saga'
import ConsumerManagement from "./home/components/consumer-list"
import ConsumerComplaints from "./home/components/consumer-complaints"
import Support from "./home/components/supportWithForm/"

const history = createHistory()

const config = configureStore()
config.runSaga(rootSaga)

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      currentRoute: location.pathname.split('/')[2] || 'overview',
      key: 0,
      isLoggedIn: true
    }
    this.checkUserLoggedIn = this.checkUserLoggedIn.bind(this)
  }

  componentDidMount() {
    history.listen((loction) => {
      const newRoute = location.pathname.split('/')[2]
      const { key } = this.state
      this.setState({ key: key + 1, currentRoute: newRoute })
    })
  }

  checkUserLoggedIn() {
    const fetchOptions = {
      method: 'get',
      credentials: 'include',
      mode: 'cors',
      'x-hasura-role': 'user'
    }

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
          if (!location.pathname.includes('home') && !location.pathname.includes('support')) {
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
    const mainDivStyleWithSideMenu = {
      display: 'inline-block', 
      width: 'calc(100% - 250px)', 
      verticalAlign: 'top', 
      padding: '60px', 
      backgroundColor: '#f5f7fa', 
      height: 'calc(100vh - 60px)', 
      overflow: 'auto' 
    }

    const mainDivStyleWithoutSideMenu = {
      display: 'inline-block', 
      width: '100%', 
      verticalAlign: 'top', 
      padding: '60px', 
      backgroundColor: '#f5f7fa', 
      height: 'calc(100vh - 60px)', 
      overflow: 'auto' 
    }
    return (
      <Provider store={config.store}>
        <Router history={history}>
          <div>
            {/* <Route exact path="/" component={Login} /> */}
            <Route exact path="/login" component={Login} />
            <Route exact path="/complaint-success" component={SuccessPage} />
            <Route exact path="/complaint-failure" component={FailurePage} />
            <Route path='/complaints' component={Complaints} />
            {
              location.pathname.includes("home") &&
              <div style={{
                backgroundColor: '#fbfbfb',
                width: '100%',
                //maxWidth: '1440px',
                margin: '0 auto',
                height: '100vh',
                overflow: 'auto'
              }}>
                <Header
                  isLoggedIn
                  history={history}
                />
                <div>
                  {
                    this.state.isLoggedIn &&
                    <SideMenu
                      history={history}
                      menuItems={menuItems}
                      menuItemsMap={menuItemsMap}
                      currentRoute={this.state.currentRoute}
                    />
                  }
                  <div
                    style={this.state.isLoggedIn ? mainDivStyleWithSideMenu : mainDivStyleWithoutSideMenu}
                    key={this.state.key}
                  >
                    <Switch>
                      <Route
                        exact
                        path="/home/live-orders"
                        render={props => <LiveOTTPList {...props} />}
                      />

                      <Route 
                        exact 
                        path="/home/support" 
                        render={props => <Support {...props} isLoggedIn={this.state.isLoggedIn} className={`${this.state.isLoggedIn ? 'hideSideMenu' : undefined}`} />}
                      />

                      <Route
                        exact
                        path="/home/past-orders"
                        render={
                          props => <HistoryOTTPList {...props} />
                        }
                      />

                      <Route
                        exact
                        path="/home/delivery-operators"
                        render={
                          props => <DSO {...props} />
                        }
                      />

                      <Route
                        exact
                        path="/home/retailers"
                        render={
                          props => <RetailersList {...props} />
                        }
                      />

                      <Route
                        exact
                        path="/home/consumers"
                        render={
                          props => (
                            <ConsumerManagement {...props} />
                          )
                        }
                      />

                      <Route
                        exact
                        path="/home/consumer-complaints"
                        render={
                          props => (
                            <ConsumerComplaints {...props} />
                          )
                        }
                      />

                      <Route
                        exact
                        path="/home/rule-engine"
                        render={
                          props => (
                            <RuleManagement {...props} />
                          )
                        }
                      />

                      <Route
                        exact
                        path="/home/delivery-operators/:dsoId"
                        render={
                          props => (
                            <DSODetail currentRoute={this.state.currentRoute} {...props} />
                          )
                        }
                      />

                      <Route
                        exact
                        path="/home/retailers/:retailerId"
                        render={
                          props => (
                            <RetailerDetail currentRoute={this.state.currentRoute} {...props} />
                          )
                        }
                      />

                      <Route
                        exact
                        path="/home/past-orders/:ottpId"
                        render={
                          props => (
                            <OTTPDetail currentRoute={this.state.currentRoute} {...props} />
                          )
                        }
                      />

                      <Route
                        exact
                        path="/home/live-orders/:ottpId"
                        render={
                          props => (
                            <OTTPDetail currentRoute={this.state.currentRoute} {...props} />
                          )
                        }
                      />
                    </Switch>
                  </div>
                </div>
              </div>
            }
          </div>
        </Router>
      </Provider> 
    )
  }
}
ReactDOM.render(<App />, document.getElementById('root'))

export default App
