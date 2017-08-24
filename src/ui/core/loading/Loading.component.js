import React from 'react'
import PropTypes from 'prop-types'
import classes from './Loading.scss'
// Import { Link } from 'react-router'
const LoadingComponent = (props) => (
  <div className={classes.box}>
    <div className={classes.title}>{props.title}</div>
    <div className={classes.boxSub}>
      <div>{props.subTitle}</div>
      <svg width="100%"
        height="8px"
        className={classes.loader}
        viewBox="0 0 400 8"
        preserveAspectRatio="xMinYMid slice"
      >
        <path className={classes.background} d="M 2 4.5 l 398 0" />
        <path className={classes.rounded} d="M 2 4.5 l 398 0" />
      </svg>
    </div>
  </div>)

LoadingComponent.propTypes = {
  'title': PropTypes.string,
  'subTitle': PropTypes.string,
}

export default LoadingComponent
