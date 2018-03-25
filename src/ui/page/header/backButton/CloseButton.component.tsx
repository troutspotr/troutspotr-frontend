import * as React from 'react'
const classes = require('./BackButton.scss')
import { CSSTransition } from 'react-transition-group'

export interface ICloseButton {
  onClick(any): void
  isEnabled: boolean
}

export const CloseButtonComponent: React.SFC<ICloseButton> = (props): JSX.Element => {
  const { onClick, isEnabled } = props
  return (
    <CSSTransition timeout={500} classNames="close-button-" in={isEnabled} unmountOnExit={true}>
      <div className={classes.backButton} key={'close_button'}>
        <svg width="44" height="44" viewBox="0 0 44 44" onClick={onClick} className={classes.svg}>
          <title>Close Button Lg</title>
          <g id="Canvas" transform="translate(515 229)">
            <g id="Close Button Lg">
              <g id="Ellipse">
                <mask id="mask0_outline_out">
                  <rect
                    id="mask0_outline_inv"
                    fill="white"
                    x="-3"
                    y="-3"
                    width="44"
                    height="44"
                    transform="translate(-512 -226)"
                  />
                  <g className={classes.backdrop}>
                    <use xlinkHref="#path0_fill" fill="black" transform="translate(-512 -226)" />
                  </g>
                </mask>
                <g mask="url(#mask0_outline_out)" className={classes.circle}>
                  <use xlinkHref="#path1_stroke_2x" transform="translate(-512 -226)" />
                </g>
              </g>
              <g id="Vector" className={classes.chevron}>
                <use xlinkHref="#path2_stroke" transform="translate(-504 -218)" />
              </g>
              <g id="Vector 2" className={classes.chevron}>
                <use xlinkHref="#path3_stroke" transform="translate(-504 -218)" />
              </g>
            </g>
          </g>
          <defs>
            <path
              id="path0_fill"
              d="M 38 19C 38 29.4934 29.4934 38 19 38C 8.50659 38 0 29.4934 0 19C 0 8.50659 8.50659 0 19 0C 29.4934 0 38 8.50659 38 19Z"
            />
            <path
              id="path1_stroke_2x"
              d="M 35 19C 35 27.8366 27.8366 35 19 35L 19 41C 31.1503 41 41 31.1503 41 19L 35 19ZM 19 35C 10.1634 35 3 27.8366 3 19L -3 19C -3 31.1503 6.84974 41 19 41L 19 35ZM 3 19C 3 10.1634 10.1634 3 19 3L 19 -3C 6.84974 -3 -3 6.84974 -3 19L 3 19ZM 19 3C 27.8366 3 35 10.1634 35 19L 41 19C 41 6.84974 31.1503 -3 19 -3L 19 3Z"
            />
            <path
              id="path2_stroke"
              d="M 20.9393 -1.06066L -1.06066 20.9393L 1.06066 23.0607L 23.0607 1.06066L 20.9393 -1.06066Z"
            />
            <path
              id="path3_stroke"
              d="M -1.06066 1.06066L 20.9393 23.0607L 23.0607 20.9393L 1.06066 -1.06066L -1.06066 1.06066Z"
            />
          </defs>
        </svg>
      </div>
    </CSSTransition>
  )
}
