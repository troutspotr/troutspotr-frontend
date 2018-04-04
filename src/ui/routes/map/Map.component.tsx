import * as React from 'react'
import { MapboxGlContainer } from './MapboxGlMap/MapboxGl.container'
import { MapboxGlCameraContainer } from './MapboxGlMap/MapboxGl.camera.container'
const classes = require('./Map.scss')
export class MapComponent extends React.Component<any> {
  public componentWillUnmount() {
    if (this.state == null) {
      return
    }
  }

  public componentWillReceiveProps(nextProps) {}

  public renderLoading() {}

  public onFeatureClick = features => {}

  renderMap() {
    return (
      <MapboxGlContainer>
        <MapboxGlCameraContainer />
      </MapboxGlContainer>
    )
  }

  public onFeatureHover = feature => {}

  public render() {
    const isVisible = true
    const isMapLoaded = true
    const { isReadyToInsertLayers } = this.props
    return (
      <div className={isVisible ? classes.mapContainer : classes.invisible}>
        {isMapLoaded && this.renderMap()}
        {isReadyToInsertLayers === false && this.renderLoading()}
      </div>
    )
  }
}
