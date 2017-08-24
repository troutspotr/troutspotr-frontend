import React from 'react'
import PropTypes from 'prop-types'

const TitleComponent = (props) => {
  const {title} = props
  return (<span>{title}</span>)
}

TitleComponent.propTypes = {'title': PropTypes.string}

export default TitleComponent
