import React from 'react'
import { render } from 'react-dom'
import Hello from './hello'

class App extends React.Component {
  render() {
    return (
      <div>
        <Hello />
        <button>load hello</button>
      </div>
    )
  }
}

render(<App />, document.getElementById('root'))
