import { IStreamObject } from 'coreTypes/IStreamObject'
import * as React from 'react'
import * as Settings from 'ui/core/micromap/Micromap.settings'
import * as Micromap from './Micromap.canvas'
const styles = require('./Micromap.canvas.scss')

// Calling getBoundingClientRect in WebKit is
// Excruciatingly slow. CACHE IT FOR PERFORMANCE!
// const boundingRectangleCache = {}

export interface IMicromapCanvasProps {
  readonly settings: Settings.IMicromapCanvasSettings
  readonly streamObject: IStreamObject
  readonly id: string
}

export interface IMicromapCanvasState {
  readonly canvasElement?: HTMLCanvasElement
  readonly canvasContext?: CanvasRenderingContext2D
  readonly height?: number
  readonly width?: number
  readonly isInitialized: boolean
}

export class MicroMapComponentCanvas extends React.PureComponent<
  IMicromapCanvasProps,
  IMicromapCanvasState
> {
  constructor(props) {
    super(props)
    this.state = {
      canvasElement: null,
      height: null,
      width: null,
      isInitialized: false,
      canvasContext: null,
    }
    this.setUpRefCanvas = this.setUpRefCanvas.bind(this)
  }

  protected setUpCanvas() {
    const { height, width } = this.state.canvasElement.getBoundingClientRect()
    console.log(height, width)
    const devicePixelRatio = window.devicePixelRatio || 1
    const canvasContext = Micromap.setUpCanvas(
      this.state.canvasElement,
      width,
      height,
      devicePixelRatio
    )

    this.setState(previousState => {
      return {
        ...previousState,
        isInitialized: true,
        width,
        height,
        canvasContext,
      }
    })
  }

  public componentDidUpdate(prevProps: IMicromapCanvasProps, prevState) {
    if (this.state.isInitialized === false) {
      return
    }

    const { height, width } = prevProps.settings.dimensions

    if (this.state.width !== width || this.state.height !== height) {
      this.setUpCanvas()
    }
    this.renderToCanvas(this.props.streamObject)
  }

  public deferredRenderToCanvas(operation) {
    // https://github.com/Microsoft/TypeScript/issues/21309
    // "working as intended"
    // if (window.requestIdleCallback != null) {
    //   window.requestIdleCallback(() => {
    //     operation()
    //   })
    //   return
    // }

    // It's polite to save our canvas style here.
    // Draw a big rectangle to clear our canvas.
    operation()
  }

  public renderToCanvas(streamObject) {
    // const scale = Math.min(this.dimensions.height, this.dimensions.width) / 40.0
    const operation = Micromap.drawStreamToCanvas.bind(
      null,
      this.state.canvasContext,
      streamObject,
      this.props.settings
    )
    this.deferredRenderToCanvas(operation)
  }

  public setUpRefCanvas(canvasElement: HTMLCanvasElement) {
    if (canvasElement == null) {
      return
    }
    // this.canvasElement = canvasElement
    this.setState(previousState => {
      return {
        ...previousState,
        canvasElement,
      }
    })
  }

  public componentDidMount() {
    setTimeout(() => {
      this.setUpCanvas()
      this.renderToCanvas(this.props.streamObject)
    }, 2)
  }

  public render() {
    return (
      <div className={styles.container}>
        <canvas
          id={this.props.id}
          className={styles.microMap}
          style={{
            width: this.props.settings.dimensions.width,
            height: this.props.settings.dimensions.height,
          }}
          ref={this.setUpRefCanvas}
        />
      </div>
    )
  }
}
