import React from 'react'
import classes from './Search.scss'
const SearchComponent = React.createClass({
  propTypes: {
  },

  // let regionId = this.props.params.regionId || null;

  textChange (e) {
    console.log(e.value)
  },

  render () {
    return (
      <span className={classes.streamSearch}>
        <input onChange={this.textChange}
          id='streamSearch'
          type='search'
          placeholder='Search'
          role='search' />
      </span>
    )
  }
})
export default SearchComponent
