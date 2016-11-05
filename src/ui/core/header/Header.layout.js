import React, { PropTypes } from 'react'
import classes from './Header.scss'

const HeaderContainer = React.createClass({
  propTypes: {
    backButton:  PropTypes.element,
    locationSubtitle: PropTypes.element,
    title: PropTypes.element,
    minimap: PropTypes.element,
    search: PropTypes.element
  },

  render () {
    return (
      <div className={classes.headerContainer} role='navigation'>
        <div className={classes.header}>
          <div className={classes.backButtonContainer}>{this.props.backButton}</div>
          <div className={classes.details}>
            <div className={classes.top}>
              <div>{this.props.locationSubtitle}</div>
            </div>
            <div className={classes.bottom}>
              <span className={classes.title}>{this.props.title}</span>
              <span>{this.props.search}</span>
            </div>
          </div>

          <div className={classes.minimapContainer}>{this.props.minimap}</div>
        </div>
      </div>
    )
  }
})
export default HeaderContainer
