import React, { PropTypes } from 'react'
import classes from './SvgMap.scss'
const StreamCentroidComponent = (props) => {
  let json = { type: 'Point', coordinates: props.geoJson.centroid, properties: props.geoJson }
  console.log(json)
  let path = props.pathGenerator(json)
  console.log(path)
  return (<path className={props.isOpen ? classes.open : classes.closed} data-name={json.properties.name} d={path} />)
}

StreamCentroidComponent.propTypes = {
  geoJson: PropTypes.object.isRequired,
  pathGenerator: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired
}

export default StreamCentroidComponent
