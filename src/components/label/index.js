import React from 'react'
import './label.scss'

const Label = ({ children, color }) => {
  return (
    <p className="label">
      { children }
    </p>
  )
}

export default Label