import React from 'react'
import './toggle.scss'

class ToggleButton extends React.Component {
  constructor(props) {
    super()
    this.handleChange = this.handleChange.bind(this)
    this.state = {
      toggled: props.isToggled
    }
  }
  componentWillReceiveProps(nextProps) {
    this.setState({ toggled: nextProps.isToggled })
  }

  handleChange(e) {
    if (this.props.onToggle) {
      this.props.onToggle()
    } else {
      this.setState({ toggled: !this.state.toggled })
    }
  }
  render() {
    return (
      <div className="toggle">
        <input type="checkbox" checked={this.state.toggled} onChange={this.handleChange} />
        <span className="toggle-switch"></span>
        <span className="bg"></span>
      </div>
    )
  }
}

export default ToggleButton
