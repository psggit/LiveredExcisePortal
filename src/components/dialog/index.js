import React from 'react'
import Button from './../button'
import './dialog.scss'
import ButtonGroup from './../button-group/index.js'

 class Dialog extends React.Component {
  render() {
    return (
     <div className="dialog--container">
      {/* <div className="dialog--title-bar">
        <p>
          { this.props.title }
        </p>
      </div> */}
      <div className="dialog--body">
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