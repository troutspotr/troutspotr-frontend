import React from 'react'
// import classes from './BubblesList.scss'
// import BubbleComponent from './Bubble.component'
import { Link } from 'react-router'
const StreamViewSelectFooter = React.createClass({
  propTypes: {
    // streams: PropTypes.array.isRequired,
    // getSouthEasternStreams: PropTypes.func.isRequired
  },

  // componentDidMount () {
  //   this.props.getSouthEasternStreams()
  // },

  render () {
    return (<div>
      Region Selection:
      <ul>
        <li><Link to='/mn/superior/map'>Go To superior map</Link></li>
        <li><Link to='/mn/superior/list'>Go To superior list</Link></li>
      </ul>
    </div>)
  }
})
export default StreamViewSelectFooter
