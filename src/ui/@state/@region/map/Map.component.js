import React from 'react'
import classes from './Map.scss'
// import BubbleComponent from './Bubble.component'
import { Link } from 'react-router'
const MapComponent = React.createClass({
  propTypes: {
    // children: React.PropTypes.element
    // streams: PropTypes.array.isRequired,
    // getSouthEasternStreams: PropTypes.func.isRequired
  },

  // componentDidMount () {
  //   this.props.getSouthEasternStreams()
  // },

  render () {
    return (<div className={classes.mapContainer}>
      Map Component
      <Link to='/mn/superior/123'>Go To superior map with stream 123</Link>
    </div>)
  }
})
export default MapComponent
