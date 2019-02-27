import React from 'react'
import './search.scss'
import Icon from './../icon'

class Search extends React.Component {

  constructor() {
    super()

    this.state = {
      searchQuery: ''
    }
    console.log("search props", this.props)
    this.setSearchQuery = this.setSearchQuery.bind(this)
    this.clearSearch = this.clearSearch.bind(this)
    this.handleSearch = this.handleSearch.bind(this)
  }

  componentDidMount() {
    //console.log("search comp props", this.props)
    this.setState({searchQuery: this.props.searchText ? this.props.searchText : ''})
  }

  componentDidUpdate(prevProps) {
    //console.log("search comp update props", this.props)
    if(this.props.searchText !== prevProps.searchText) {
      this.setState({searchQuery: this.props.searchText})
    }
  }

  clearSearch() {
    this.setState({
      searchQuery: ''
    })
    this.props.clearSearch()
  }

  setSearchQuery(e) {
    this.setState({ searchQuery: e.target.value })
    if (!e.target.value.length) {
      this.clearSearch()
    }
  }

  handleSearch(e) {
    const { searchQuery } = this.state;
    if (e.keyCode === 13 && searchQuery.length) {
      this.props.search(searchQuery)
    }
  }

  render() {
    return (
      <div className="search--box">
        <span 
          className="search-icon search" 
          onClick={(e) => this.handleSearch(e)}
        >
          <Icon name="search" />
        </span>
        <input 
          placeholder={this.props.placeholder} 
          value={this.state.searchQuery}
          onChange={(e) => this.setSearchQuery(e)}
          onKeyDown={(e) => this.handleSearch(e)}
        />
        {
          this.state.searchQuery ? 
          <span className="search-icon cross" onClick={this.clearSearch}>
            <Icon name="cross" />
          </span> : 
          ''
        }
      </div>
    )
  }
}

export default Search