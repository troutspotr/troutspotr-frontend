import React, { PropTypes } from 'react'

const SubtitleComponent = (props) => {
  let { subtitle } = props
  return (<span>{subtitle}</span>)
}

SubtitleComponent.propTypes = {
  subtitle:  PropTypes.string.isRequired
}

export default SubtitleComponent
