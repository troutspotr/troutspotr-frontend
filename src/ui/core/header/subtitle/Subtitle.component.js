import React, { PropTypes } from 'react'
// import classes from './BackButton.scss'
// import { Link } from 'react-router'

const SubtitleComponent = React.createClass({
  propTypes: {
    subtitle:  PropTypes.string.isRequired
  },

  onClick () {

  },

  render () {
    let { subtitle } = this.props
    return (<span>{subtitle}</span>)
  }
})
export default SubtitleComponent
