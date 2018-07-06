import React from 'react'
import getIcon from './../getIcon'
import './infobar.scss'

const InfoBar = ({ title }) => (
  <div className="info-bar">
    <span>{ getIcon('info-icon') }</span>
    <span>{ title }</span>
  </div>
)

export default InfoBar
