import { PropTypes } from 'react'
import MicroMapBaseComponent from './MicroMap.base.component'
import * as Micromap from './Micromap'
import shallowCompare from 'shallow-compare'

class MicroMapStreamComponent extends MicroMapBaseComponent {
  componentWillUpdate (nextProps) {
    this.fireRenderToCanvas(nextProps.streamObject)
  }

  componentDidMount () {
    this.setUpCanvas()
    this.fireRenderToCanvas(this.props.streamObject)
  }

  renderToCanvas (streamObject) {
    let operation = Micromap.drawStreamToCanvas.bind(null, this.canvasContext, streamObject, this.dimensions)
    this.deferredRenderToCanvas(operation)
  }

  fireRenderToCanvas (streamObject) {
    this.renderToCanvas(streamObject)
  }

  shouldComponentUpdate (nextProps, nextState) {
    let isChanged = shallowCompare(this, nextProps, this.state)
    if (isChanged === false) {
      return false
    }

    if (nextProps.isVisible === false) {
      return false
    }

    return true
  }

  componentDidUpdate (prevProps) {
    this.fireRenderToCanvas(this.props.streamObject)
  }
}

MicroMapStreamComponent.propTypes = {
  streamObject: PropTypes.object.isRequired,
  id: PropTypes.string.isRequired,
  isVisible: PropTypes.bool.isRequired
}

export default MicroMapStreamComponent
