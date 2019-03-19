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
            <div className="header">
              <div className="column1">
                <Icon name="calendar" />
              </div>
              <div  className="column2">
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
                {
                  this.props.subtitle
                  ? (
                    <div className="dialog--subtitle-bar">
                      <p>
                        { this.props.subtitle }
                      </p>
                    </div>
                  )
                  : ''
                }
              </div>
            </div>
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