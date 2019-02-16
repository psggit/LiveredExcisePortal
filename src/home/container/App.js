import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { setLoadingAll } from './../actions'
import createHistory from 'history/createBrowserHistory'
import { Route, Switch } from 'react-router-dom'
import { Router } from 'react-router'
import Header from '@components/header'
import SideMenu from '@components/sidemenu'
import { menuItemsMap, menuItems } from './../constants/navbar-items'
import LiveOTTPList from './../components/live-ottp-list'
import HistoryOTTPList from './../components/history-ottp-list'
import OTTPDetail from './../components/ottp-detail'
import RetailerDetail from './../components/retailer-details'
import DSODetail from './../components/dso-details'
import UserManagement from './../components/user-management'
import DSO from './../components/dso-list'
import RetailersList from './../components/retailers-list'
import RetailerDetail2 from './../components/retailer-detail2'
import WithFilters from './../components/with-filters'
import RuleManagement from './../components/rule-engine'
import Support from './../components/support'
import GeoFences from './../components/geofences'
import { liveFilters, historyFilters, dsoFilters } from './../constants/status-filters'
import '@sass/app.scss'

const history = createHistory()


class App extends React.Component {
  constructor() {
    super()
    this.state = {
      currentRoute: location.pathname.split('/')[2] || 'live-ottp',
      key: 0
    }
  }

  componentDidMount() {
    console.log("mount")
    history.listen((loction) => {
      console.log("history")
      const { key } = this.state
      this.setState({ key: key + 1 })
    })
  }

  checkUserLoggedIn() {
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
      <Router history={history}>
        <div>
          <Route path='/support' component={Support} />
          {
            location.pathname.includes("home") &&
            <div style={{
              backgroundColor: '#fbfbfb',
              // border: '1px solid #D6DAE3',
              // borderTop: 0,
              // borderBottom: 0,
              width: '100%',
              maxWidth: '1440px',
              margin: '0 auto',
              height: '100vh',
              overflow: 'auto'
            }}>
              <Header
                isLoggedIn
                history={history}
              />
              <div>
                <SideMenu
                  history={history}
                  menuItems={menuItems}
                  menuItemsMap={menuItemsMap}
                  currentRoute={this.state.currentRoute}
                />
                <div
                  style={{ display: 'inline-block', width: 'calc(100% - 250px)', verticalAlign: 'top', padding: '60px', backgroundColor: '#f5f7fa', height: 'calc(100vh - 96px)', overflow: 'auto' }}
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
                      path="/home/user-management"
                      render={
                        props => (
                          <UserManagement {...props} />
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
                      path="/home/geofences"
                      render={
                        props => (
                          <GeoFences {...props} />
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
    )
  }
}

const mapStateToProps = state => state.main

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({ setLoadingAll }, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(App)
