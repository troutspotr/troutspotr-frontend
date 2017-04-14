import React, { PropTypes } from 'react'

const TitleComponent = (props) => {
  let { title } = props
  return (<span>{title}</span>)
}

TitleComponent.propTypes = {
  title:  PropTypes.string
}

export default TitleComponent
