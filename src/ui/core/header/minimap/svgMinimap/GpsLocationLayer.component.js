import React, {Component} from 'react'
import PropTypes from 'prop-types'
import classes from './SvgMap.scss'

class GpsLocationLayer extends Component {
  renderGpsCoorinates = () => {
    const {currentGpsCoordinatesFeature} = this.props
    if (currentGpsCoordinatesFeature == null) {
      return null
    }
    const path = this.props.selectedCentroidPathGenerator(currentGpsCoordinatesFeature)

    const pathElement = (<path
      className={classes.gpsCoordinates}
      data-name="gps-location"
      d={path}
    />)
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
  'currentGpsCoordinatesFeature': PropTypes.object,
  selectedCentroidPathGenerator: PropTypes.func.isRequired,
}

export default GpsLocationLayer
