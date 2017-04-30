import React, { PropTypes, Component } from 'react'
import classes from './SvgMap.scss'
import { isEmpty } from 'lodash'
import StreamCentroidComponent from './StreamCentroid.component'

class CentroidsLayerComponent extends Component {
  renderStreamCentroids () {
    let { streamCentroidsGeoJson } = this.props
    if (isEmpty(streamCentroidsGeoJson)) {
      return null
    }

    let decidedNotToRenderTheseThings = true
    if (decidedNotToRenderTheseThings) {
      return null
    }

    let paths = streamCentroidsGeoJson.map((centroid, index) => {
      let isOpen = this.props.getIsOpen(centroid.waterId)
      return (
        <StreamCentroidComponent
          geoJson={centroid}
          key={centroid.gid}
          isSelected={index % 2 === 0}
          isLoading={index < 400}
          isOpen={isOpen}
          pathGenerator={this.props.pathGenerator}
          projection={this.props.projection}
        />)
    })
    return (<g className={classes.centroids}>
      {paths}
    </g>)
  }

  renderSelectedStreamCentroid () {
    let { selectedStreamCentroid } = this.props
    if (selectedStreamCentroid == null) {
      return null
    }

    return (
      <StreamCentroidComponent
        geoJson={selectedStreamCentroid}
        isSelected
        isOpen={this.props.getIsOpen(selectedStreamCentroid.waterId)}
        isLoading={false}
        pathGenerator={this.props.selectedCentroidPathGenerator}
        projection={this.props.projection}
      />)
  }

  render () {
    return (
      <g>
        <g className={classes.centroids} style={{ opacity: this.props.isStreamCentroidsDisplayed ? 1 : 0 }}>
          {this.renderStreamCentroids()}
        </g>
        <g className={classes.selectedStreamCentroid}>
          {this.renderSelectedStreamCentroid()}
        </g>
      </g>
    )
  }
}

CentroidsLayerComponent.propTypes = {
  streamCentroidsGeoJson: PropTypes.array,
  getIsOpen: PropTypes.func.isRequired,
  isStreamCentroidsDisplayed: PropTypes.bool.isRequired,
  selectedStreamCentroid: PropTypes.object
}

export default CentroidsLayerComponent
