import React, {Component} from 'react'
import PropTypes from 'prop-types'
import classes from './SvgMap.scss'
import AnimatedPathComponent from './AnimatedPath.component'
const lengthInMilliseconds = 500
const offsetInMilliseconds = 200

class RegionComponent extends Component {
  constructor () {
    super()
    this.onClick = this.onClick.bind(this)
    this.state = {
      offset: offsetInMilliseconds + (Math.random() * 300),
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

  getClassName() {
    const { isActive } = this.props
    const activeClassName = isActive
      ? ''
      : classes.inactiveRegion

    return activeClassName
  }

  render () {
    const json = this.props.geoJson
    const path = this.props.pathGenerator(json.geometry)
    const className = this.getClassName()
    return (
      <g className={className} onClick={this.onClick} data-name={json.properties.name}>
        <AnimatedPathComponent
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
  // isActive refers to it being selectable - if you're online or if it's offline but cached.
  'isActive': PropTypes.bool.isRequired,
}

export default RegionComponent
