import React from 'react'
import classes from './Header.scss'
import HeaderLogo from './logo.svg'
const HeaderContainer = React.createClass({
  propTypes: {
  },

  // let regionId = this.props.params.regionId || null;

  render () {
    return (
      <div className={'container-fluid ' + classes.header}>
        header
      </div>
    )
  }
})
export default HeaderContainer
