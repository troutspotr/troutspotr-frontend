import * as React from 'react'
const classes = require('./BackButton.scss')
import { Link } from 'react-router'
import { CSSTransition } from 'react-transition-group'

export interface IBackButton {
  readonly previous: string
  readonly isEnabled: boolean
}

export const BackButtonComponent: React.SFC<IBackButton> = (props): JSX.Element => {
  const { previous, isEnabled } = props
  return (
    <CSSTransition timeout={500} classNames="close-button-" in={isEnabled} unmountOnExit={true}>
      <Link
        aria-label="Go Back to Streams"
        role="navigaton"
        to={previous}
        className={classes.backButton}
      >
        <svg
          width="44"
          height="44"
          viewBox="0 0 44 44"
          version="1.1"
          preserveAspectRatio="xMidYMid meet"
          className={classes.svg}
        >
          <title>Back Button Lg</title>
          <g id="Canvas" transform="translate(515 282)">
            <g id="Back Button Lg">
              <g id="Ellipse">
                <g className={classes.backdrop}>
                  <use xlinkHref="#path0_fill" transform="translate(-512 -279)" />
                </g>
                <mask id="mask0_outline_out">
                  <rect
                    id="mask0_outline_inv"
                    fill="white"
                    x="-3"
                    y="-3"
                    width="44"
                    height="44"
                    transform="translate(-512 -279)"
                  />
                  <use xlinkHref="#path0_fill" fill="black" transform="translate(-512 -279)" />
                </mask>
                <g mask="url(#mask0_outline_out)" className={classes.circle}>
                  <use xlinkHref="#path1_stroke_2x" transform="translate(-512 -279)" />
                </g>
              </g>
              <g id="Vector" className={classes.chevron}>
                <use xlinkHref="#path2_stroke" transform="translate(-500 -273)" />
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
              d="M 0 13L -1.10221 11.9826L -2.04136 13L -1.10221 14.0174L 0 13ZM 10.8978 -1.01742L -1.10221 11.9826L 1.10221 14.0174L 13.1022 1.01742L 10.8978 -1.01742ZM 0 13C -1.10221 14.0174 -1.10218 14.0175 -1.10212 14.0175C -1.10207 14.0176 -1.10198 14.0177 -1.10187 14.0178C -1.10165 14.018 -1.10131 14.0184 -1.10087 14.0189C -1.09998 14.0198 -1.09865 14.0213 -1.09689 14.0232C -1.09335 14.027 -1.08807 14.0327 -1.08108 14.0403C -1.0671 14.0555 -1.04628 14.078 -1.01892 14.1076C -0.964213 14.1669 -0.88336 14.2545 -0.778791 14.3678C -0.569654 14.5944 -0.265657 14.9237 0.113785 15.3347C 0.872669 16.1569 1.93333 17.3059 3.14044 18.6136C 5.55465 21.229 8.55465 24.479 10.8978 27.0174L 13.1022 24.9826C 10.7591 22.4442 7.75906 19.1942 5.34485 16.5788C 4.13774 15.2711 3.07708 14.122 2.3182 13.2999C 1.93875 12.8888 1.63476 12.5595 1.42562 12.3329C 1.32105 12.2197 1.2402 12.1321 1.18549 12.0728C 1.15813 12.0432 1.13731 12.0206 1.12333 12.0055C 1.11634 11.9979 1.11106 11.9922 1.10752 11.9883C 1.10576 11.9864 1.10443 11.985 1.10354 11.984C 1.1031 11.9835 1.10276 11.9832 1.10254 11.9829C 1.10243 11.9828 1.10234 11.9827 1.10229 11.9827C 1.10223 11.9826 1.10221 11.9826 0 13Z"
            />
          </defs>
        </svg>
      </Link>
    </CSSTransition>
  )
}
