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
    console.log('children:', this.props.children)
    return (<div>
      {this.props.children}
    </div>)
  }
})
export default StateComponent
