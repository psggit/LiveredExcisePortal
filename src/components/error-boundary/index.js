import React from 'react'

class ErrorBoundary extends React.Component {
  constructor() {
    super()
    this.state = {
      hasError: false
    }
  }
  componentDidCatch(err, info) {
    this.setState({ hasError: true })
    console.log(err, info)
  }
  render() {
    if (this.state.hasError) {
      return (
        <div>
          <h3>Something went wrong.</h3>
        </div>
      )
    }
    return this.props.children
  }
}

export default ErrorBoundary
