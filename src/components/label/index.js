import React from 'react'
import './label.scss'
import Icon from './../icon'

const Label = ({ children, color, icon, tooltipText }) => {
  return (
    <p className="label">
      { children }
      {
        icon 
        ?
          <span className="info"  style={{ position: "relative" }}>
            <Icon name={icon} /> 
            <span className="tooltip-text">
              {tooltipText}
            </span>
          </span>
        : ''
      }
    </p>
  )
}

export default Label
