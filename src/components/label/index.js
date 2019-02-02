import React from 'react'
import './label.scss'
import Icon from './../icon'

const Label = ({ children, color, icon }) => {
  return (
    <p className="label">
      { children }
      {
        icon ? <Icon name={icon} /> : ''
      }
    </p>
  )
}

export default Label
