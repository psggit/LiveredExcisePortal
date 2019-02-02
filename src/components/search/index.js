import React from 'react'
import './search.scss'
import Icon from './../icon'

class Search extends React.Component {
  render() {
    return (
      <div className="search--box">
        <Icon name="search" />
        <input placeholder={this.props.placeholder} />
      </div>
    )
  }
}

export default Search