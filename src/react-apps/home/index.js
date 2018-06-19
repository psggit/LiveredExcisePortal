import React from 'react'
import createHistory from 'history/createBrowserHistory'
import Navbar from '@components/navbar'
import { menuItemsMap, menuItems } from './constants/navbar-items'

const history = createHistory()


class App extends React.Component {
  constructor() {
    super()
    this.state = {
      currentRoute: window.location.pathname.split('/')[2] || 'live-orders'
    }
  }

  componentDidMount() {
    history.listen((loction) => {
      const newRoute = location.pathname.split('/')[2]
      this.setState({ currentRoute: newRoute })
    })
  }

  render() {
    return (
      <div>
        <Navbar
          history={history}
          menuItems={menuItems}
          menuItemsMap={menuItemsMap}
          currentRoute={this.state.currentRoute}
        />
      </div>
    )
  }
}

export default App
