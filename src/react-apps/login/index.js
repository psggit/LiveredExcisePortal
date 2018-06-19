import React from 'react'
import Button from './../../components/button'
import Dialog from './../../components/modal'

class Login extends React.Component {
  state = {
    shouldMountDialog: false
  }

  mountDialog = () => {
    this.setState({ shouldMountDialog: true })
  }

  unmountDialog = () => {
    this.setState({ shouldMountDialog: false })
  }

  render() {
    const { shouldMountDialog } = this.state
    return (
      <div>
        <h3>Login</h3>
        <Button onClick={this.mountDialog} appearance="primary">add</Button>
        <Dialog open={shouldMountDialog} onClose={this.unmountDialog} title="Modal title">
          <p>
            Good design is good business. Good design is good business.
            Good design is good business. Good design is good business.
            Good design is good business. Good design is good business.
          </p>
        </Dialog>
      </div>
    )
  }
}


export default Login
