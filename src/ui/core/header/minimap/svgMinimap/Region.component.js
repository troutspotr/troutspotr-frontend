import React, { PropTypes, Component } from 'react'
import classes from './SvgMap.scss'
class RegionComponent extends Component {
  constructor () {
    super()
    this.onClick = this.onClick.bind(this)
  }

  onClick (e) {
    let json = this.props.geoJson
    if (this.props.isActive === false) {
      e.preventDefault()
      return
    }

    this.props.selectRegion(e, json)
    // browserHistory.push(path)
  }

  render () {
    let json = this.props.geoJson
    let path = this.props.pathGenerator(json.geometry)
    let className = this.props.isActive === false
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
  geoJson: PropTypes.object.isRequired,
  pathGenerator: PropTypes.func.isRequired,
  selectRegion: PropTypes.func.isRequired,
  isCached: PropTypes.bool.isRequired,
  isActive: PropTypes.bool.isRequired
}

export default RegionComponent
