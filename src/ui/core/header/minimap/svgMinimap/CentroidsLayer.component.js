import React, {Component} from 'react'
import PropTypes from 'prop-types'
import classes from './SvgMap.scss'
import {isEmpty} from 'lodash'
import StreamCentroidComponent from './StreamCentroid.component'
import shallowCompare from 'shallow-compare'

class CentroidsLayerComponent extends Component {
  renderStreamCentroids () {
    const {streamCentroidsGeoJson} = this.props
    if (isEmpty(streamCentroidsGeoJson)) {
      return null
    }

    const decidedNotToRenderTheseThings = true
    if (decidedNotToRenderTheseThings) {
      return null
    }

    const paths = streamCentroidsGeoJson.map((centroid, index) => {
      const isOpen = this.props.getIsOpen(centroid.waterId)
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

  shouldComponentUpdate (nextProps, nextState) {
    const shouldUpdate = shallowCompare(this, nextProps, nextState)
    return shouldUpdate
  }

  renderSelectedStreamCentroid () {
    const {selectedStreamCentroid} = this.props
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
        <g className={classes.centroids} style={{'opacity': this.props.isStreamCentroidsDisplayed ? 1 : 0}}>
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
  'streamCentroidsGeoJson': PropTypes.array,
  'getIsOpen': PropTypes.func.isRequired,
  'isStreamCentroidsDisplayed': PropTypes.bool.isRequired,
  'selectedStreamCentroid': PropTypes.object,
  pathGenerator: PropTypes.func.isRequired,
  projection: PropTypes.func.isRequired,
  selectedCentroidPathGenerator: PropTypes.func.isRequired,
}

export default CentroidsLayerComponent
