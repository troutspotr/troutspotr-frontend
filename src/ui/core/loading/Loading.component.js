import React, { PropTypes } from 'react'
import classes from './Loading.scss'
// import { Link } from 'react-router'

const LoadingComponent = React.createClass({
  propTypes: {
    title: PropTypes.string,
    subTitle: PropTypes.string
  },

  render () {
    return (
      <div className={classes.box}>
        <div className={classes.title}>{this.props.title}</div>
        <div className={classes.boxSub}>
          <div>{this.props.subTitle}</div>
          <svg width='100%'
            height='8px'
            className={classes.loader}
            viewBox='0 0 400 8'
            preserveAspectRatio='xMinYMid slice'>
            <path className={classes.background} d='M 2 4.5 l 398 0' />
            <path className={classes.rounded} d='M 2 4.5 l 398 0' />
          </svg>
        </div>
      </div>)
  }
})
export default LoadingComponent
