import React from 'react'
// import classes from './BubblesList.scss'
// import BubbleComponent from './Bubble.component'

const StateComponent = React.createClass({
  propTypes: {
    // streams: PropTypes.array.isRequired,
    // getSouthEasternStreams: PropTypes.func.isRequired
    children: React.PropTypes.element
  },

  // componentDidMount () {
  //   this.props.getSouthEasternStreams()
  // },

  render () {
    return (this.props.children)
  }
})
export default StateComponent
