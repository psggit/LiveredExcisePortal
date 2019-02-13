import React from 'react'
import Button from './../button'
import './dialog.scss'
import ButtonGroup from './../button-group/index.js'
import Icon from './../icon'

 class Dialog extends React.Component {
  render() {
    return (
     <div className="dialog--container">
     {/* <div style={{ position: 'absolute', right: '16px', top: '12px' }}>
      <Icon name="cross" size="10" />
     </div> */}
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
    ) 
 }
}

export default Dialog