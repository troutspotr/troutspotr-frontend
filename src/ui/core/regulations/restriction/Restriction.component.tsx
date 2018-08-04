import * as React from 'react'
const classes = require('./Restriction.scss')
/* eslint no-unneeded-ternary: 0 */

export interface IRestrictionComponent {
  color: 'red' | 'yellow' | 'blue' | 'green' | 'white' | 'blueGray'
  pattern: 'solid' | 'stipple' | 'dot'
  text: string
  length: string
  hollow: boolean
  heightMultiplier: number
}

export const RestrictionComponent = (props: IRestrictionComponent) => {
  const { color, pattern, text, length } = props
  const colorClass = classes[color]
  const patternClass = classes[pattern]
  const hollow = props.hollow !== false ? true : false
  const hollowClass = hollow ? classes.hollow : ''
  const heightMultiplier = props.heightMultiplier == null ? 0 : props.heightMultiplier
  const heightOverride = heightMultiplier > 0 ? { height: `${heightMultiplier}em` } : {}
  return (
    <div className={classes.container}>
      <div className={classes.symbolContainer}>
        <span style={heightOverride} className={`${patternClass} ${colorClass} ${hollowClass}`} />
      </div>
      <span className={classes.length}>{length}</span>
      <span className={classes.definition}>{text}</span>
    </div>
  )
}

