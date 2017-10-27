import React, {Component} from 'react'
import PropTypes from 'prop-types'
import classes from './SvgMap.scss'
import AnimatedPathComponent from './AnimatedPath.component'
const lengthInMilliseconds = 1100
const offsetInMilliseconds = 400

class RegionComponent extends Component {
  constructor () {
    super()
    this.onClick = this.onClick.bind(this)
    this.state = {
      offset: offsetInMilliseconds + (Math.random() * 500),
    }
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
        : classes.cachedRegion
    return (
      <g onClick={this.onClick} data-name={json.properties.name}>
        <AnimatedPathComponent
          cssName={className}
          path={path}
          length={lengthInMilliseconds}
          offset={this.state.offset}/>
      </g>)
  }
}

RegionComponent.propTypes = {
  'geoJson': PropTypes.object.isRequired,
  'pathGenerator': PropTypes.func.isRequired,
  'selectRegion': PropTypes.func.isRequired,
  'isCached': PropTypes.bool.isRequired,
  'isActive': PropTypes.bool.isRequired,
  index: PropTypes.number.isRequired,
}

/*
    return (
      <g onClick={this.onClick}>
        <path className={className} data-name={json.properties.name} d={path} />
      </g>)
*/

export default RegionComponent
