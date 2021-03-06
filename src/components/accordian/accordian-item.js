import React from 'react'

class AccordianItem extends React.Component {
  render() {
    return (
      <div className={`accordian-item ${this.props.activeAccordian === this.props.id ? 'active' : '' }`}>
        <div id={this.props.id} onClick={this.props.handleClick} className="accordian-item__header">
          <p>{ this.props.title }</p>
        </div>
        <div className="accordian-item__body">
          { this.props.children }
        </div>
      </div>
    )
  }
}

export default AccordianItem
