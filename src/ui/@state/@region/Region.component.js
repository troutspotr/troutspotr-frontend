import React, { PropTypes } from 'react'
import classes from './Region.scss'
// import BubbleComponent from './Bubble.component'
import { Link } from 'react-router'
const RegionComponent = React.createClass({
  propTypes: {
    children: PropTypes.element.isRequired
    // getSouthEasternStreams: PropTypes.func.isRequired
  },

  // componentDidMount () {
  //   this.props.getSouthEasternStreams()
  // },

  render () {
    return (<div className={classes.regionContainer}>
      container
      {this.props.children}
    </div>)
  }
})
export default RegionComponent
