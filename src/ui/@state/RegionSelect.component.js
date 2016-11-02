import React from 'react'
// import classes from './BubblesList.scss'
// import BubbleComponent from './Bubble.component'
import { Link } from 'react-router'
const RegionSelectComponent = React.createClass({
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
        <li><Link to='/mn/driftless'>Go To Driftless</Link></li>
        <li><Link to='/mn/superior'>Go To Superior</Link></li>
        <li><Link to='/mn/interior'>Go To Interior</Link></li>
      </ul>
    </div>)
  }
})
export default RegionSelectComponent
