import * as React from 'react'
const classes = require('./Header.scss')

export interface IHeaderLayout {
  readonly backButton?: JSX.Element
  readonly locationSubtitle?: JSX.Element
  readonly title?: JSX.Element
  readonly minimap?: JSX.Element
  readonly search?: JSX.Element
}

const HeaderLayout: React.SFC<IHeaderLayout> = props => {
  return (
    <div className={classes.headerContainer} role="navigation">
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

export { HeaderLayout }
