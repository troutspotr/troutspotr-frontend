import * as React from 'react'
const classes = require('./BackButton.scss')
import { Link } from 'react-router'
import { CSSTransition } from 'react-transition-group'

export interface ICheckButton {
  readonly isEnabled: boolean
}

export const BackButtonComponent: React.SFC<ICheckButton> = (props): JSX.Element => {
  const { isEnabled } = props
  return (
    <CSSTransition timeout={500} classNames="close-button-" in={isEnabled} unmountOnExit={true}>
      <svg
        width="38"
        height="38"
        viewBox="0 0 38 38"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
      >
        <title>Close Button Lg</title>
        <desc>Created using Figma</desc>
        <g id="Canvas" transform="translate(715 417)">
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
                  transform="translate(-715 -417)"
                />
                <use xlinkHref="#path0_fill" fill="black" transform="translate(-715 -417)" />
              </mask>
              <g mask="url(#mask0_outline_out)">
                <use xlinkHref="#path1_stroke_2x" transform="translate(-715 -417)" fill="#FFFFFF" />
              </g>
            </g>
            <g id="Vector">
              <use
                xlinkHref="#path2_stroke"
                transform="matrix(-4.37114e-08 -1 1 -4.37114e-08 -708 -387)"
                fill="#FFFFFF"
              />
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
            d="M 0 9.00001L -1.06066 7.93935L -2.29698 9.17567L -0.887047 10.2096L 0 9.00001ZM 7.93934 -1.06066L -1.06066 7.93935L 1.06066 10.0607L 10.0607 1.06066L 7.93934 -1.06066ZM 0 9.00001C -0.887047 10.2096 -0.886988 10.2097 -0.886873 10.2097C -0.886759 10.2098 -0.886587 10.21 -0.886358 10.2101C -0.8859 10.2105 -0.885216 10.211 -0.884305 10.2116C -0.882483 10.213 -0.879758 10.215 -0.87614 10.2176C -0.868904 10.2229 -0.8581 10.2308 -0.843821 10.2413C -0.815262 10.2623 -0.772802 10.2934 -0.717189 10.3342C -0.605963 10.4157 -0.442123 10.5359 -0.231651 10.6902C 0.189292 10.9988 0.796765 11.4442 1.54292 11.9911C 3.03521 13.0849 5.08225 14.585 7.30119 16.2102C 11.7382 19.4598 16.8653 23.2114 19.6177 25.2131L 21.3823 22.7869C 18.6347 20.7887 13.5118 17.0402 9.07381 13.7899C 6.85525 12.165 4.80854 10.6651 3.31646 9.57145C 2.57042 9.02462 1.96305 8.57934 1.5422 8.27078C 1.33177 8.1165 1.16797 7.9964 1.05679 7.91487C 1.0012 7.87411 0.958756 7.84299 0.930216 7.82206C 0.915946 7.81159 0.905152 7.80368 0.897926 7.79838C 0.894313 7.79573 0.891592 7.79373 0.889775 7.7924C 0.888866 7.79174 0.888183 7.79124 0.887728 7.7909C 0.887501 7.79073 0.88733 7.79061 0.887216 7.79053C 0.887103 7.79044 0.887047 7.7904 0 9.00001Z"
          />
        </defs>
      </svg>
    </CSSTransition>
  )
}

// <svg width="44" height="44" viewBox="0 0 44 44" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
// <title>Close Button Lg</title>
// <desc>Created using Figma</desc>
// <g id="Canvas" transform="translate(515 176)">
// <g id="Close Button Lg">
// <g id="Ellipse">
// <mask id="check_mask0_outline_out">
// <rect id="mask0_outline_inv" fill="white" x="-3" y="-3" width="44" height="44" transform="translate(-512 -173)"/>
// <use xlink:href="#close_path0_fill" fill="black" transform="translate(-512 -173)"/>
// </mask>
// <g mask="url(#check_mask0_outline_out)">
// <use xlink:href="#close_path1_stroke_2x" transform="translate(-512 -173)" fill="#FFFFFF"/>
// </g>
// </g>
// <g id="Vector">
// <use xlink:href="#close_path2_stroke" transform="matrix(-4.37114e-08 -1 1 -4.37114e-08 -505 -143)" fill="#FFFFFF"/>
// </g>
// </g>
// </g>
// <defs>
// <path id="close_path0_fill" d="M 38 19C 38 29.4934 29.4934 38 19 38C 8.50659 38 0 29.4934 0 19C 0 8.50659 8.50659 0 19 0C 29.4934 0 38 8.50659 38 19Z"/>
// <path id="close_path1_stroke_2x" d="M 35 19C 35 27.8366 27.8366 35 19 35L 19 41C 31.1503 41 41 31.1503 41 19L 35 19ZM 19 35C 10.1634 35 3 27.8366 3 19L -3 19C -3 31.1503 6.84974 41 19 41L 19 35ZM 3 19C 3 10.1634 10.1634 3 19 3L 19 -3C 6.84974 -3 -3 6.84974 -3 19L 3 19ZM 19 3C 27.8366 3 35 10.1634 35 19L 41 19C 41 6.84974 31.1503 -3 19 -3L 19 3Z"/>
// <path id="close_path2_stroke" d="M 0 9.00001L -1.06066 7.93935L -2.29698 9.17567L -0.887047 10.2096L 0 9.00001ZM 7.93934 -1.06066L -1.06066 7.93935L 1.06066 10.0607L 10.0607 1.06066L 7.93934 -1.06066ZM 0 9.00001C -0.887047 10.2096 -0.886988 10.2097 -0.886873 10.2097C -0.886759 10.2098 -0.886587 10.21 -0.886358 10.2101C -0.8859 10.2105 -0.885216 10.211 -0.884305 10.2116C -0.882483 10.213 -0.879758 10.215 -0.87614 10.2176C -0.868904 10.2229 -0.8581 10.2308 -0.843821 10.2413C -0.815262 10.2623 -0.772802 10.2934 -0.717189 10.3342C -0.605963 10.4157 -0.442123 10.5359 -0.231651 10.6902C 0.189292 10.9988 0.796765 11.4442 1.54292 11.9911C 3.03521 13.0849 5.08225 14.585 7.30119 16.2102C 11.7382 19.4598 16.8653 23.2114 19.6177 25.2131L 21.3823 22.7869C 18.6347 20.7887 13.5118 17.0402 9.07381 13.7899C 6.85525 12.165 4.80854 10.6651 3.31646 9.57145C 2.57042 9.02462 1.96305 8.57934 1.5422 8.27078C 1.33177 8.1165 1.16797 7.9964 1.05679 7.91487C 1.0012 7.87411 0.958756 7.84299 0.930216 7.82206C 0.915946 7.81159 0.905152 7.80368 0.897926 7.79838C 0.894313 7.79573 0.891592 7.79373 0.889775 7.7924C 0.888866 7.79174 0.888183 7.79124 0.887728 7.7909C 0.887501 7.79073 0.88733 7.79061 0.887216 7.79053C 0.887103 7.79044 0.887047 7.7904 0 9.00001Z"/>
// </defs>
// </svg>
