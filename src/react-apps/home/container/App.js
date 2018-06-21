import React from 'react'
import createHistory from 'history/createBrowserHistory'
import { Route, Switch } from 'react-router-dom'
import { Router } from 'react-router'
import Navbar from '@components/navbar'
import Filter from '@components/filter'
import { menuItemsMap, menuItems } from './../constants/navbar-items'
import LiveOrdersList from './../components/live-orders-list'
import HistoryOrdersList from './../components/history-orders-list'
import '@sass/app.scss'

const history = createHistory()


class App extends React.Component {
  constructor() {
    super()
    this.state = {
      currentRoute: location.pathname.split('/')[2] || 'live-orders',
      isFilters: true,
      filterTypes: []
    }

    this.mountFilters = this.mountFilters.bind(this)
  }

  setFilterTypes(route) {
    const filterTypes = []
    if (route === 'live-orders') {
      filterTypes.push('status')
    } else {
      filterTypes.push('status', 'date')
    }

    this.setState({ filterTypes })
  }

  mountFilters(route) {
    if (route === 'user-management') {
      this.setState({ isFilters: false })
    } else {
      this.setState({ isFilters: true })
      // set types of filter here
      this.setFilterTypes(route)
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
        overflow: 'auto',
        padding: '20px'
      }}>
        <Navbar
          history={history}
          menuItems={menuItems}
          menuItemsMap={menuItemsMap}
          currentRoute={this.state.currentRoute}
        />

        <div style={{ marginTop: '62px' }}>
          {
            this.state.isFilters &&
            <Filter currentRoute={this.state.currentRoute} filterTypes={this.state.filterTypes} />
          }
          <div style={{ marginTop: '20px' }}>
            <Router history={history}>
              <Switch>
                <Route
                  exact
                  path='/home/live-orders'
                  render={
                    props => <LiveOrdersList {...props} mountOrderDetail={this.mountOrderDetail} />
                  }
                />

                <Route
                  exact
                  path='/home/history-orders'
                  render={
                    props => <HistoryOrdersList {...props} mountOrderDetail={this.mountOrderDetail} />
                  }
                />
              </Switch>
            </Router>
          </div>
        </div>
      </div>
    )
  }
}

export default App
