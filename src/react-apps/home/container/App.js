import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { setLoadingAll } from './../actions'
import createHistory from 'history/createBrowserHistory'
import { Route, Switch } from 'react-router-dom'
import { Router } from 'react-router'
import Navbar from '@components/navbar'
import { menuItemsMap, menuItems } from './../constants/navbar-items'
import LiveOrdersList from './../components/live-orders-list'
import HistoryOrdersList from './../components/history-orders-list'
import OrderDetail from './../components/order-detail'
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
        backgroundColor: '#DFDAE6',
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
                    currentRoute={this.state.currentRoute}
                    statusFilters={liveFilters}
                    filters={['status']}
                  >
                    <LiveOrdersList {...props} />
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
                    currentRoute={this.state.currentRoute}
                    statusFilters={historyFilters}
                    filters={['status', 'date']}
                  >
                    <HistoryOrdersList {...props} />
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
              path="/home/history-ottp/:orderId"
              render={
                props => (
                  <OrderDetail {...props} />
                )
              }
            />

            <Route
              exact
              path="/home/live-ottp/:orderId"
              render={
                props => (
                  <OrderDetail {...props} />
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
