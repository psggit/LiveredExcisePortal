import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { setLoadingAll } from './../actions'
import createHistory from 'history/createBrowserHistory'
import { Route, Switch } from 'react-router-dom'
import { Router } from 'react-router'
import Navbar from '@components/navbar'
import SideMenu from '@components/sidemenu'
import { menuItemsMap, menuItems } from './../constants/navbar-items'
import LiveOTTPList from './../components/live-ottp-list'
import HistoryOTTPList from './../components/history-ottp-list'
import OTTPDetail from './../components/ottp-detail'
import DSODetail from './../components/dso-detail'
import UserManagement from './../components/user-management'
import DSO from './../components/dso-list'
import RetailersList from './../components/retailers-list'
import RetailerDetail2 from './../components/retailer-detail2'
import WithFilters from './../components/with-filters'
import RuleManagement from './../components/rule-management'
import GeoFences from './../components/geofences'
import BirdsEyeView from './../components/birds-eye-view'
import { liveFilters, historyFilters, dsoFilters } from './../constants/status-filters'
import '@sass/app.scss'

const history = createHistory()


class App extends React.Component {
  constructor() {
    super()
    this.state = {
      currentRoute: location.pathname.split('/')[2] || 'live-ottp',
    }
  }

  componentDidMount() {
    history.listen((loction) => {
      const newRoute = location.pathname.split('/')[2]
      if (newRoute !== this.state.currentRoute) {
        this.props.actions.setLoadingAll()
        this.setState({ currentRoute: newRoute })
      }
    })
  }

  render() {
    return (
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
        <Navbar
          history={history}
          menuItems={menuItems}
          menuItemsMap={menuItemsMap}
          currentRoute={this.state.currentRoute}
        />
        <div style={{ display: 'flex' }}>
          <SideMenu
            history={history}
            menuItems={menuItems}
            menuItemsMap={menuItemsMap}
            currentRoute={this.state.currentRoute}
          />
          <Router history={history}>
            <Switch>
              <Route
                exact
                path="/home/live-ottp"
                render={
                  props => (
                    <WithFilters
                      history={history}
                      currentRoute={this.state.currentRoute}
                      statusFilters={liveFilters}
                      filters={['status']}
                    >
                      <LiveOTTPList {...props} />
                    </WithFilters>
                  )
                }
              />

              <Route
                exact
                path="/home/history-ottp"
                render={
                  props => (
                    <WithFilters
                      history={history}
                      currentRoute={this.state.currentRoute}
                      statusFilters={historyFilters}
                      filters={['status', 'date']}
                    >
                      <HistoryOTTPList {...props} />
                    </WithFilters>
                  )
                }
              />

              <Route
                exact
                path="/home/dso"
                render={
                  props => (
                    <WithFilters
                      history={history}
                      currentRoute={this.state.currentRoute}
                      dsoFilters={dsoFilters}
                      filters={['dso-status']}
                    >
                      <DSO {...props} />
                    </WithFilters>
                  )
                }
              />

              <Route
                exact
                path="/home/retailers"
                render={
                  props => (
                    <WithFilters
                      history={history}
                      currentRoute={this.state.currentRoute}
                      filters={['jurisdiction']}
                    >
                      <RetailersList {...props} />
                    </WithFilters>
                  )
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
                path="/home/rule-management"
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
                path="/home/birds-eye-view"
                render={
                  props => (
                    <BirdsEyeView {...props} />
                  )
                }
              />

              <Route
                exact
                path="/home/dso/:dsoId"
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
                    <RetailerDetail2 currentRoute={this.state.currentRoute} {...props} />
                  )
                }
              />

              <Route
                exact
                path="/home/history-ottp/:ottpId"
                render={
                  props => (
                    <OTTPDetail currentRoute={this.state.currentRoute} {...props} />
                  )
                }
              />

              <Route
                exact
                path="/home/live-ottp/:ottpId"
                render={
                  props => (
                    <OTTPDetail currentRoute={this.state.currentRoute} {...props} />
                  )
                }
              />
            </Switch>
          </Router>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => state.main

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({ setLoadingAll }, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(App)
