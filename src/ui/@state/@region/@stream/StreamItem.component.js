import React from 'react'
import classes from './StreamItem.scss'
// import BubbleComponent from './Bubble.component'
const StreamItemComponent = React.createClass({
  propTypes: {
    // children: React.PropTypes.element
    // streams: PropTypes.array.isRequired,
    // getSouthEasternStreams: PropTypes.func.isRequired
  },

  // componentDidMount () {
  //   this.props.getSouthEasternStreams()
  // },

  render () {
    return (<div className={classes.streamItemContainer}>
      Stream DETAIL Item Component
    </div>)
  }
})
export default StreamItemComponent
