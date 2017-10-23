import PropTypes from 'prop-types'
import MicroMapBaseComponent from './MicroMap.base.component'
import * as Micromap from './Micromap'
import shallowCompare from 'shallow-compare'

class MicroMapStreamComponent extends MicroMapBaseComponent {
  componentWillUpdate (nextProps) {
    this.fireRenderToCanvas(nextProps.streamObject)
  }

  componentDidMount () {
    setTimeout(() => {
      this.setUpCanvas()
      this.fireRenderToCanvas(this.props.streamObject)
    }, 2)
  }

  renderToCanvas (streamObject) {
    // const scale = Math.min(this.dimensions.height, this.dimensions.width) / 40.0
    const operation = Micromap.drawStreamToCanvas.bind(null, this.canvasContext, streamObject, this.microMapSettings)
    this.deferredRenderToCanvas(operation)
  }

  fireRenderToCanvas (streamObject) {
    this.renderToCanvas(streamObject)
  }

  shouldComponentUpdate (nextProps, nextState) {
    const isChanged = shallowCompare(this, nextProps, this.state)
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
  'streamObject': PropTypes.object.isRequired,
  'id': PropTypes.string.isRequired,
  'isVisible': PropTypes.bool.isRequired,
  scale: PropTypes.number.isRequired,
}

export default MicroMapStreamComponent
