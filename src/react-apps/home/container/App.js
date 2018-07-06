import React from 'react'
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
import '@sass/app.scss'

const history = createHistory()


class App extends React.Component {
  constructor() {
    super()
    this.state = {
      currentRoute: location.pathname.split('/')[2] || 'live-orders',
      isFilters: true
    }

    this.mountFilters = this.mountFilters.bind(this)
  }

  mountFilters(route) {
    if (route === 'user-management') {
      this.setState({ isFilters: false })
    } else {
      this.setState({ isFilters: true })
    }
  }

  componentDidMount() {
    this.mountFilters(this.state.currentRoute)
    history.listen((loction) => {
      const newRoute = location.pathname.split('/')[2]
      this.setState({ currentRoute: newRoute })
      this.mountFilters(newRoute)
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
                  <WithFilters filters={['status']}>
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
                  <WithFilters filters={['status', 'date']}>
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

export default App
