import React from 'react'
import './indicator.scss'

function getClassName(type) {
  switch (type) {
    case 'success':
      return 'indicator--success'
    case 'danger':
      return 'indicator--danger'
    case 'warning':
      return 'indicator--warning'
    default:
      return ''
  }
}

const Indicator = ({ type }) => (
  <div className={`indicator ${getClassName(type)}`} />
)

export default Indicator
