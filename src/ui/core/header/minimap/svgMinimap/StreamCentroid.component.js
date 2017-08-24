import React from 'react'
import PropTypes from 'prop-types'
import classes from './SvgMap.scss'
const StreamCentroidComponent = (props) => {
  const json = {'type': 'Point', 'coordinates': props.geoJson.centroid, 'properties': props.geoJson}
  const path = props.pathGenerator(json)
  return (<path className={props.isOpen ? classes.open : classes.closed} data-name={json.properties.name} d={path} />)
}

StreamCentroidComponent.propTypes = {
  'geoJson': PropTypes.object.isRequired,
  'pathGenerator': PropTypes.func.isRequired,
  'isOpen': PropTypes.bool.isRequired,
}

export default StreamCentroidComponent
