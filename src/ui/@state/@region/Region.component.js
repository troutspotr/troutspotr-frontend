import React from 'react'
// import classes from './BubblesList.scss'
// import BubbleComponent from './Bubble.component'

const RegionComponent = React.createClass({
  propTypes: {
    children: React.PropTypes.element
    // streams: PropTypes.array.isRequired,
    // getSouthEasternStreams: PropTypes.func.isRequired
  },

  // componentDidMount () {
  //   this.props.getSouthEasternStreams()
  // },

  render () {
    return (<div>
      Region Component (todo: display region)
      {this.props.children}
    </div>)
  }
})
export default RegionComponent
