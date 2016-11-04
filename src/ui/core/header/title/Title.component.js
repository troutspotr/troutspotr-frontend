import React, { PropTypes } from 'react'
// import classes from './BackButton.scss'
// import { Link } from 'react-router'

const TitleComponent = React.createClass({
  propTypes: {
    title:  PropTypes.string
  },

  onClick () {

  },

  render () {
    let { title } = this.props
    return (<span>{title}</span>)
  }
})
export default TitleComponent
