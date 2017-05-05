import { PropTypes } from 'react'
import MicroMapBaseComponent from './MicroMap.base.component'
import * as Micromap from './Micromap'
import shallowCompare from 'shallow-compare'

class MicroMapGpsComponent extends MicroMapBaseComponent {
  componentDidMount () {
    this.setUpCanvas()
    this.renderToCanvas(this.props.gpsCoordinates, this.props.streamObject)
  }

  renderToCanvas (gpsLocation, streamObject) {
    let operation = Micromap.drawGpsLocationToCanvas.bind(null, this.canvasContext, streamObject, this.dimensions, 1, gpsLocation)
    this.deferredRenderToCanvas(operation)
  }

  componentWillReceiveProps (nextProps) {
    let isChanged = shallowCompare(this, nextProps, this.state)
    if (isChanged === false) {
      return
    }

    if (this.props.isVisible === false) {
      return
    }

    if (this.isInitialized === false) {
      return
    }

    this.renderToCanvas(nextProps.gpsCoordinates, nextProps.streamObject)
  }
}

MicroMapGpsComponent.propTypes = {
  streamObject: PropTypes.object.isRequired,
  id: PropTypes.string.isRequired,
  isVisible: PropTypes.bool.isRequired,
  gpsCoordinates: PropTypes.object
}

export default MicroMapGpsComponent
