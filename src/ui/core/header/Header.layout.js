import React, { PropTypes } from 'react'
import classes from './Header.scss'
const HeaderLayout = (props) => {
  let headerContainerClass = props.isOffline
    ? classes.isOffline
    : classes.headerContainer

  return (
    <div className={headerContainerClass} role='navigation'>
      <div className={classes.offlineIndicator} />
      <div className={classes.header}>
        <div className={classes.backButtonContainer}>{props.backButton}</div>
        <div className={classes.details}>
          <div className={classes.top}>
            <div>{props.locationSubtitle}</div>
          </div>
          <div className={classes.bottom}>
            <span className={classes.title}>{props.title}</span>
            <span>{props.search}</span>
          </div>
        </div>

        <div className={classes.minimapContainer}>{props.minimap}</div>
      </div>
    </div>
  )
}
HeaderLayout.propTypes = {
  backButton:  PropTypes.element,
  locationSubtitle: PropTypes.element,
  title: PropTypes.element,
  minimap: PropTypes.element,
  search: PropTypes.element,
  isOffline: PropTypes.bool.isRequired
}

export default HeaderLayout
