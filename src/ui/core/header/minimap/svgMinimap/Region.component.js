import React, { PropTypes, Component } from 'react'
class RegionComponent extends Component {
  constructor () {
    super()
    this.onClick = this.onClick.bind(this)
  }

  onClick (e) {
    let json = this.props.geoJson

    this.props.selectRegion(e, json)
    // browserHistory.push(path)
  }

  render () {
    let json = this.props.geoJson
    let path = this.props.pathGenerator(json.geometry)
    return (
      <g onClick={this.onClick}>
        <path data-name={json.properties.name} d={path} />
      </g>)
  }
}

RegionComponent.propTypes = {
  geoJson: PropTypes.object.isRequired,
  pathGenerator: PropTypes.func.isRequired,
  selectRegion: PropTypes.func.isRequired
}

export default RegionComponent
