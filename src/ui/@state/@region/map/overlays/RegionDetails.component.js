import React, { Component } from 'react'
import classes from './RegionDetails.scss'

class RegionDetails extends Component {
  renderPublic () {
    return (
      <div>
        <div>
          <span className={classes.nonPublicMarker} />
          <span className={classes.text}>Trout habitat</span>
        </div>
        <div>
          {<span className={classes.publicMarker} />}
          <span className={classes.text}>Publicly fishable land</span>
        </div>
      </div>)
  }

  renderPrivate () {
    return (
      <div>
        <div>
          <span className={classes.privateBridgesBadge} />
          <span className={classes.text}>Bridge on private land</span>
        </div>
        <div>
          <span className={classes.publicBridgesBadge} />
          <span className={classes.text}>Publicly fishable bridge</span>
        </div>
      </div>)
  }

  render () {
    return (
      <div className={classes.regionContainer}>
        <div className={classes.leftItems}>
          {this.renderPublic()}
        </div>
        <div className={classes.rightItems}>
          {this.renderPrivate()}
        </div>
      </div>)
  }
}

export default RegionDetails
