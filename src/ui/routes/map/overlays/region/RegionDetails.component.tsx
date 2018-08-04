import * as React from 'react'
const classes = require('./RegionDetails.scss')

export class RegionDetailsComponent extends React.PureComponent<any> {
  public renderPublic() {
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
      </div>
    )
  }

  public renderPrivate() {
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
      </div>
    )
  }

  public render() {
    return (
      <div className={classes.regionContainer}>
        <div className={classes.leftItems}>{this.renderPublic()}</div>
        <div className={classes.rightItems}>{this.renderPrivate()}</div>
      </div>
    )
  }
}

