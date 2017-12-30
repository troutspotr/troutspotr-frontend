import React, {Component} from 'react'
import PropTypes from 'prop-types'
import classes from './Search.scss'
class SearchComponent extends Component {
  constructor () {
    super()
    this.onTextChange = this.onTextChange.bind(this)
  }

  onTextChange (e) {
    const text = e.target.value
    this.props.updateSearchText(text)
  }

  render () {
    return (
      <span className={classes.streamSearch}>
        <label htmlFor="streamSearch" className={classes.hidden}>
          Search Streams
        </label>
        <input
          id="streamSearch"
          type="search"
          placeholder="Search Streams"
          value={this.props.searchText}
          onChange={this.onTextChange}
          role="search"
        />
      </span>
    )
  }
}

SearchComponent.propTypes = {
  'updateSearchText': PropTypes.func.isRequired,
  'searchText': PropTypes.string.isRequired,
}

export default SearchComponent
