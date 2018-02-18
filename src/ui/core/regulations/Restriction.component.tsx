import * as React from 'react'
const classes = require('./Restriction.scss')
/* eslint no-unneeded-ternary: 0 */

export interface IRestrictionComponent {
  color: string
  pattern: string
  text: string
  length: string
  hollow: boolean
  heightMultiplier: number
}

const RestrictionComponent = (props: IRestrictionComponent) => {
  const { color, pattern, text, length } = props
  const colorClass = classes[color]
  const patternClass = classes[pattern]
  const hollow = props.hollow == null ? true : false
  const hollowClass = hollow ? classes.hollow : ''
  const heightMultiplier = props.heightMultiplier == null ? 0 : props.heightMultiplier
  const heightOverride = heightMultiplier > 0 ? { height: `${heightMultiplier}em` } : {}
  return (
    <div className={classes.container}>
      <span style={heightOverride} className={`${patternClass} ${colorClass} ${hollowClass}`} />
      <span className={classes.length}>{length}</span>
      <span className={classes.definition}>{text}</span>
    </div>
  )
}

export default RestrictionComponent
