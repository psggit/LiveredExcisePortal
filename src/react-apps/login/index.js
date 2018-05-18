import React from 'react'
import Button from './../../components/button'
import ModalBox from './../../components/modal'
// import './login.css'

class Login extends React.Component {
  state = {
    isToggleOn: false
  }
  handleClick = (e) => {
    this.setState(prevState => ({
      isToggleOn: !prevState.isToggleOn
    }));
  }

  render() {
    return (
      <button onClick={this.handleClick}>
        {this.state.isToggleOn ? 'ON' : 'OFF'}
      </button>
    )
  }
}


export default Login
