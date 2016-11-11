import React, { PropTypes } from 'react'
import { Link } from 'react-router'
// import classes from './BubblesList.scss'
// import BubbleComponent from './Bubble.component'

const StreamItemComponent = React.createClass({
  propTypes: {
    title: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired
  },

  // componentDidMount () {
  //   this.props.getSouthEasternStreams()
  // },

  render () {
    let { title, url } = this.props
    return (
      <div>
        <Link to={url}>
          {title}
        </Link>
      </div>)
  }
})
export default StreamItemComponent
