import debounce from 'lodash-es/debounce'
import * as React from 'react'
import { CloseButtonComponent } from '../backButton/CloseButton.component'
const classes = require('./Minimap.scss')
const cssVariables = require('ui/styles/_variables.scss')
const headerHeight = parseInt(cssVariables['header-height'], 10) + 40
const footerHeight = parseInt(cssVariables['footer-height'], 10)

export interface IMinimapDispatchProps {
  handleExpand(bool): any
}

export interface IMinimapStateProps {
  readonly isExpanded: boolean
  readonly isCloseCloseButtonShown: boolean
  readonly isReadyToReveal: boolean
}

export interface IMinimapPassedProps {
  readonly mapComponent: React.ReactNode
}

export interface IMinimapProps
  extends IMinimapPassedProps,
    IMinimapStateProps,
    IMinimapDispatchProps {}

export interface IMinimapState {
  windowWidth: number
  windowHeight: number
  homeRect: ClientRect
  sandboxRect: ClientRect
}
const MARGIN = 5
export class MinimapComponent extends React.Component<IMinimapProps, IMinimapState> {
  constructor(props) {
    super(props)
    this.resizeEvent = this.resizeEvent.bind(this)
    this.handleCloseClick = this.handleCloseClick.bind(this)
    this.handleSandboxClick = this.handleSandboxClick.bind(this)
    this.handleHomeClick = this.handleHomeClick.bind(this)
    const width = window.innerWidth > 0 ? window.innerWidth : screen.width
    const height = window.innerHeight > 0 ? window.innerHeight : screen.height

    const clientTop = headerHeight + MARGIN
    const clientBottom = height - footerHeight - MARGIN
    const clientLeft = MARGIN
    const clientRight = width - MARGIN

    this.state = {
      windowWidth: 0,
      windowHeight: 0,
      homeRect: null,
      sandboxRect: {
        width: clientRight - clientLeft,
        height: clientBottom - clientTop,
        left: clientLeft,
        right: clientRight,
        bottom: clientBottom,
        top: clientTop,
      },
    }
  }
  private homeElement: HTMLDivElement
  private sandboxElement: HTMLDivElement
  // tslint:disable-next-line:no-empty
  protected debouncedResizeEvent = () => {}

  public componentWillMount() {
    if (window) {
      this.debouncedResizeEvent = debounce(this.resizeEvent, 80)
      window.addEventListener('resize', this.debouncedResizeEvent)
      window.addEventListener('orientationchange', this.debouncedResizeEvent)
    }
  }

  public componentDidMount() {
    setTimeout(this.resizeEvent, 20)
  }

  public componentWillUnmount() {
    if (window) {
      window.removeEventListener('resize', this.debouncedResizeEvent)
      window.removeEventListener('orientationchange', this.debouncedResizeEvent)
    }
  }

  public getSandboxStyle(): React.CSSProperties {
    const { sandboxRect } = this.state

    const t = {
      width: `${sandboxRect.width}px`,
      height: `${sandboxRect.height}px`,
      position: 'fixed',
      top: `${sandboxRect.top}px`,
      left: `${sandboxRect.left}px`,
      transform: null,
    }

    const { isExpanded } = this.props
    const { homeRect } = this.state
    if (isExpanded === false && homeRect != null) {
      const sandboxCenterPosition = {
        x: sandboxRect.left + sandboxRect.width * 0.5,
        y: sandboxRect.top + sandboxRect.height * 0.5,
      }

      const homeCenterPosition = {
        x: homeRect.left + homeRect.width / 2,
        y: homeRect.top + homeRect.height / 2,
      }

      // grab the ratio - this determines how much bigger it needs to become
      const ratio =
        Math.min(homeRect.height, homeRect.width) / Math.min(sandboxRect.width, sandboxRect.height)

      // figure out how much we need to move this box around
      const translateY = homeCenterPosition.y - sandboxCenterPosition.y
      const translateX = homeCenterPosition.x - sandboxCenterPosition.x

      const translateYRule = `translateY(${translateY}px)`
      const translateXRule = `translateX(${translateX}px)`
      const scaleRule = `scale(${ratio})`

      // assemble the complete tranform rule
      const newStyle = `${translateYRule} ${translateXRule} ${scaleRule}`

      t.transform = newStyle
    }
    return t as React.CSSProperties
  }

  public resizeEvent() {
    const homeRect = this.homeElement.getBoundingClientRect()

    this.setState(() => {
      const width = window.innerWidth > 0 ? window.innerWidth : screen.width
      const height = window.innerHeight > 0 ? window.innerHeight : screen.height

      const windowCenterPosition = {
        x: width * 0.5,
        y: headerHeight + (height - headerHeight - footerHeight) * 0.5,
      }

      const minDimension = Math.min(width, height - headerHeight - footerHeight)
      const minDimensionOffset = minDimension * 0.5

      const clientTop = windowCenterPosition.y - minDimensionOffset + MARGIN
      const clientBottom = windowCenterPosition.y + minDimensionOffset - MARGIN
      const clientLeft = windowCenterPosition.x - minDimensionOffset + MARGIN
      const clientRight = windowCenterPosition.x + minDimensionOffset - MARGIN

      const minClientDimensions = Math.min(clientBottom - clientTop, clientRight - clientLeft)
      return {
        windowHeight: height,
        windowWidth: width,
        homeRect: {
          width: Math.round(homeRect.width),
          height: Math.round(homeRect.height),
          left: Math.round(homeRect.left),
          right: Math.round(homeRect.right),
          bottom: Math.round(homeRect.bottom),
          top: Math.round(homeRect.top),
        },
        sandboxRect: {
          width: minClientDimensions,
          height: minClientDimensions,
          left: clientLeft,
          right: clientRight,
          bottom: clientBottom,
          top: clientTop,
        },
      }
    })
  }

  private handleCloseClick() {
    const { isExpanded, handleExpand } = this.props
    if (isExpanded === false) {
      return
    }

    handleExpand(false)
  }

  private handleHomeClick() {
    const { isExpanded, handleExpand } = this.props
    if (isExpanded === false) {
      return
    }

    handleExpand(false)
  }

  // tslint:disable-next-line:no-empty
  private handleSandboxClick() {

  }

  public render() {
    const { mapComponent, isReadyToReveal, isExpanded, isCloseCloseButtonShown } = this.props
    const sandboxClassName = isExpanded ? classes.sandboxContainerExpand : classes.sandboxContainer
    return (
      <div>
        <div
          id="js-home-container"
          className={classes.homeContainer}
          onClick={this.handleHomeClick}
          ref={container => (this.homeElement = container)}
        >
          {<CloseButtonComponent isEnabled={isCloseCloseButtonShown} onClick={this.handleCloseClick} />}
        </div>
        <div
          id="js-sandbox-container"
          style={this.getSandboxStyle()}
          onClick={this.handleSandboxClick}
          className={sandboxClassName}
          ref={container => (this.sandboxElement = container)}
        >
          {isReadyToReveal && mapComponent}
        </div>
        {/* <div className={sneezeGuardClass} /> */}
      </div>
    )
  }
}
