import React, {Component} from 'react'
import PropTypes from 'prop-types'
import classes from './SvgMap.scss'
class RegionComponent extends Component {
  constructor () {
    super()
    this.onClick = this.onClick.bind(this)
  }

  onClick (e) {
    const json = this.props.geoJson
    if (this.props.isActive === false) {
      e.preventDefault()
      return
    }

    this.props.selectRegion(e, json)
  }

  render () {
    const json = this.props.geoJson
    const path = this.props.pathGenerator(json.geometry)
    const className = this.props.isActive === false
      ? classes.inactiveRegion
      : this.props.isCached
        ? classes.cachedRegion
        : null

    return (
      <g onClick={this.onClick}>
        <path className={className} data-name={json.properties.name} d={path} />
      </g>)
  }
}

RegionComponent.propTypes = {
  'geoJson': PropTypes.object.isRequired,
  'pathGenerator': PropTypes.func.isRequired,
  'selectRegion': PropTypes.func.isRequired,
  'isCached': PropTypes.bool.isRequired,
  'isActive': PropTypes.bool.isRequired,
}

export default RegionComponent
