import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { setLoadingAll } from './../actions'
import createHistory from 'history/createBrowserHistory'
import { Route, Switch } from 'react-router-dom'
import { Router } from 'react-router'
import Navbar from '@components/navbar'
import { menuItemsMap, menuItems } from './../constants/navbar-items'
import LiveOTTPList from './../components/live-ottp-list'
import HistoryOTTPList from './../components/history-ottp-list'
import OTTPDetail from './../components/ottp-detail'
import UserManagement from './../components/user-management'
import WithFilters from './../components/with-filters'
import { liveFilters, historyFilters } from './../constants/status-filters'
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
        backgroundColor: '#D5DAE6',
        width: '100%',
        height: '100vh',
        overflow: 'auto'
      }}>
        <Navbar
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
              path="/home/user-management"
              render={
                props => (
                  <UserManagement {...props} />
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
    )
  }
}

const mapStateToProps = state => state.main

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({ setLoadingAll }, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(App)
