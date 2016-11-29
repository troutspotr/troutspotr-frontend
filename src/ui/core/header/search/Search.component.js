import React from 'react'
import classes from './Search.scss'
const SearchComponent = React.createClass({
  propTypes: {
    updateSearchText: React.PropTypes.func.isRequired,
    searchText: React.PropTypes.string.isRequired
  },

  onTextChange (e) {
    let text = e.target.value
    this.props.updateSearchText(text)
  },

  render () {
    return (
      <span className={classes.streamSearch}>
        <input
          id='streamSearch'
          type='search'
          placeholder='Search Streams'
          value={this.props.searchText}
          onChange={this.onTextChange}
          role='search' />
      </span>
    )
  }
})
export default SearchComponent
