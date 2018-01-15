import * as React from 'react'
const classes = require('./Loading.scss')

export interface ILoadingProps {
  title: string
  subTitle: string
}

export const LoadingComponent: React.SFC<ILoadingProps> = props => {
  return (
    <div className={classes.box}>
      <div className={classes.title}>{props.title}</div>
      <div className={classes.boxSub}>
        <div>{props.subTitle}</div>
        <svg
          width="100%"
          height="8px"
          className={classes.loader}
          viewBox="0 0 410 8"
          preserveAspectRatio="xMinYMin meet"
        >
          <path className={classes.background} d="M 2 4.5 l 398 0" />
          <path className={classes.rounded} d="M 2 4.5 l 398 0" />
        </svg>
      </div>
    </div>
  )
}

// LoadingComponent.propTypes = {
//   'title': PropTypes.string,
//   'subTitle': PropTypes.string,
// }
