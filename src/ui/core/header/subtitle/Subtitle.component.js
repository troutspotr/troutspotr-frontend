import React from 'react'
import PropTypes from 'prop-types'

const SubtitleComponent = (props) => {
  const {subtitle} = props
  return (<span>{subtitle}</span>)
}

SubtitleComponent.propTypes = {'subtitle': PropTypes.string.isRequired}

export default SubtitleComponent
