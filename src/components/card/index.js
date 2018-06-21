import React from 'react'
import './card.scss'

class Card extends React.Component {
  render() {
    return (
      <div className="card">
        <div className="card__header">
          <p>{ this.props.title }</p>
        </div>
        <div className="card__body">
          { this.props.children }
        </div>
      </div>
    )
  }
}

export default Card
