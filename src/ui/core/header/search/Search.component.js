import React, { Component } from 'react'
import classes from './Search.scss'
class SearchComponent extends Component {
  constructor () {
    super()
    this.onTextChange = this.onTextChange.bind(this)
  }

  onTextChange (e) {
    let text = e.target.value
    this.props.updateSearchText(text)
  }

  render () {
    return (
      <span className={classes.streamSearch}>
        <input
          id='streamSearch'
          type='search'
          placeholder='Search Streams'
          value={this.props.searchText}
          onChange={this.onTextChange}
          role='search'
        />
      </span>
    )
  }
}

SearchComponent.propTypes = {
  updateSearchText: React.PropTypes.func.isRequired,
  searchText: React.PropTypes.string.isRequired
}

export default SearchComponent
