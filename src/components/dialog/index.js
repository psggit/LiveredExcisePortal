import React from 'react'
import Button from './../button'
import './dialog.scss'
import ButtonGroup from './../button-group/index.js'
import Icon from './../icon'

 class Dialog extends React.Component {

  constructor() {
    super()
    this.handlePress = this.handlePress.bind(this)
  }

  componentDidMount() {
    document.addEventListener('click', this.handlePress)
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.handlePress)
  }

  handlePress(e) {
    if (e.target.className === 'overlay-container') {
      this.props.onClick()
    }
  }

  render() {
    return (
      <div className="overlay-container">
        <div className="dialog--container">
          <div className="dialog--body">
            {
              this.props.title
              ? (
                <div className="dialog--title-bar">
                  <p>
                    { this.props.title }
                  </p>
                </div>
              )
              : ''
            }
            { this.props.children }
          </div>
          <div className="dialog--footer">
          <ButtonGroup alignment="right">
              { this.props.actions.map(item => item) }
          </ButtonGroup>
          </div>
        </div>
      </div>
    ) 
  }
}

export default Dialog