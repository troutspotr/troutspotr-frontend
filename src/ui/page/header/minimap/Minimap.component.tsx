import * as React from 'react'
import { debounce } from 'lodash'
const classes = require('./Minimap.scss')
// const MINIMAP_WIDTH = 50

export interface IMinimapProps {
  readonly isExpanded: boolean
  readonly handleExpand: any
  readonly isReadyToReveal: boolean
  readonly mapComponent: React.ReactNode
  readonly closeButton: React.ReactNode
}

export interface IMinimapState {
  windowWidth: number
  windowHeight: number
  containerRect?: ClientRect
}

export class MinimapComponent extends React.Component<IMinimapProps, IMinimapState> {
  constructor(props) {
    super(props)
    // this.getCSSRule = this.getCSSRule.bind(this)
    this.resizeEvent = this.resizeEvent.bind(this)
    this.state = {
      windowWidth: 0,
      windowHeight: 0,
      containerRect: null,
    }
  }
  private containerElement: HTMLDivElement
  protected debouncedResizeEvent = () => {}

  componentWillMount() {
    if (window) {
      this.debouncedResizeEvent = debounce(this.resizeEvent, 200)
      window.addEventListener('resize', this.debouncedResizeEvent)
      window.addEventListener('orientationchange', this.debouncedResizeEvent)
    }
  }

  componentDidMount() {
    setTimeout(this.resizeEvent, 20)
  }

  componentWillUnmount() {
    if (window) {
      window.removeEventListener('resize', this.debouncedResizeEvent)
      window.removeEventListener('orientationchange', this.debouncedResizeEvent)
    }
  }

  resizeEvent() {
    const rect = this.containerElement.getBoundingClientRect()
    this.setState(() => {
      const width = window.innerWidth > 0 ? window.innerWidth : screen.width
      const height = window.innerHeight > 0 ? window.innerHeight : screen.height
      return {
        windowHeight: height,
        windowWidth: width,
        containerRect: rect,
      }
    })
  }

  getStyle() {
    const { windowWidth, windowHeight, containerRect } = this.state

    if (containerRect == null || windowWidth === 0 || windowHeight === 0) {
      return null
    }

    const windowCenterPosition = {
      x: windowWidth / 2,
      y: windowHeight / 2,
    }

    const containerCenterPosition = {
      x: containerRect.left + containerRect.width / 2,
      y: containerRect.top + containerRect.height / 2,
    }

    // grab the ratio - this determines how much bigger it needs to become
    const minimumDimension = Math.min(windowWidth, windowHeight)
    const ratio =
      Math.round(minimumDimension / Math.min(containerRect.height, containerRect.width)) * 0.9

    // figure out how much we need to move this box around
    const translateY = Math.round(windowCenterPosition.y - containerCenterPosition.y)
    const translateX = Math.round(windowCenterPosition.x - containerCenterPosition.x)

    const translateYRule = `translateY(${translateY}px)`
    const translateXRule = `translateX(${translateX}px)`
    const scaleRule = `scale(${ratio})`

    // assemble the complete tranform rule
    const newStyle = `${translateYRule} ${translateXRule} ${scaleRule}`

    return {
      transform: newStyle,
      backfaceVisibility: 'hidden',
      borderColor: 'transparent',
    }
    // result.style.transform = newStyle
  }

  render() {
    const { isExpanded, mapComponent, isReadyToReveal } = this.props
    const style = isExpanded ? this.getStyle() : null
    return (
      <div className={classes.container} ref={container => (this.containerElement = container)}>
        <div className={classes.backButtonContainer}>
          {isExpanded &&
            isReadyToReveal && <span className={`${classes.close} ${classes.black}`} />}
        </div>
        <div className={classes.minimapContent} style={style}>
          {isReadyToReveal && mapComponent}
        </div>
      </div>
    )
  }
}
