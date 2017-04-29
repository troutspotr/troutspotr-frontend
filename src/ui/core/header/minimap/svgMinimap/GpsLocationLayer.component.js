import React, { PropTypes, Component } from 'react'
import * as d3 from 'd3-geo'
import classes from './SvgMap.scss'
import RegionComponent from './Region.component'
import { isEmpty, has } from 'lodash'
import StreamCentroidComponent from './StreamCentroid.component'

class GpsLocationLayer extends Component {
  renderGpsCoorinates = () => {
    let { currentGpsCoordinatesFeature } = this.props
    if (currentGpsCoordinatesFeature == null) {
      return null
    }
    let path = this.props.selectedCentroidPathGenerator(currentGpsCoordinatesFeature)
    
    let pathElement = (<path
      className={classes.gpsCoordinates}
      data-name='gps-location'
      d={path} />)
    return pathElement
  }

  render () {
    return (
      <g>
        <g className={classes.gpsCoordinates}>
          {this.renderGpsCoorinates()}
        </g>
      </g>
    )
  }
}

GpsLocationLayer.propTypes = {
  currentGpsCoordinatesFeature: PropTypes.object
}

export default GpsLocationLayer
