import classes from './ParallaxGradient.scss'
import React from 'react'

export const ParallaxGradient = props => {
  return (<div><div className={classes.bg}></div>
    <div className={classes.parallax}>
      <div className={classes.parallaxGroup}>
        <div className={classes.layer}></div>
        <div className={classes.layer}></div>
        <div className={classes.layer}></div>
        <div className={classes.layer}></div>
        <div className={classes.layer}></div>
        <div className={`${classes.layer} ${classes.fill}`}></div>
      </div>
      <div className={classes.content}>
        <h1>Parallax Scrolling</h1>
        <p>Using only CSS</p>
      </div>
    </div>
  </div>
  ) }

export default ParallaxGradient
