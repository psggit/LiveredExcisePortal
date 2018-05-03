import React from 'react'
import { render } from 'react-dom'
import Hello from './hello'
import bg from './../images/bg.jpg'

class App extends React.Component {
  render() {
    return (
      <div>
        <Hello />
        <button>load hello</button>
        <img width='200' height='200' src={bg} />
      </div>
    )
  }
}

render(<App />, document.getElementById('root'))
