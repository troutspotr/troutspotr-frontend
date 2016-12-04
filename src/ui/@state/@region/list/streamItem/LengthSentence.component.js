import React from 'react'
import classes from './StreamItem.scss'
import { find } from 'lodash'
const VERY_SHORT = 'very short'
const SHORT = 'short'
const LONG = 'long'
const VERY_LONG = 'very long'

const LENGTHS = [
  {
    name: VERY_SHORT,
    className: classes.emphasis,
    length: 1.5
  },
  {
    name: SHORT,
    className: classes.emphasis,
    length: 5
  },
  {
    name: LONG,
    className: classes.emphasis,
    length: 10
  },
  {
    name: VERY_LONG,
    className: classes.emphasis,
    length: 1000000
  }
]

const LengthSentenceComponent = React.createClass({
  propTypes: {
    streamLength: React.PropTypes.number.isRequired,
    troutLength: React.PropTypes.number.isRequired,
    publicLength: React.PropTypes.number.isRequired
  },

  componentDidMount () {
    // console.log('LIST VIEW MOUNTED')
  },

  getStreamSize (streamLength) {
    let lengthObject = find(LENGTHS, x => streamLength < x.length)
    return lengthObject
  },

  render () {
    let { streamLength, troutLength, publicLength } = this.props
    let streamSummary = this.getStreamSize(streamLength)

    return (
      <span>
        This is a <span className={streamSummary.className}>{streamSummary.name}</span>river. It has <span className={classes.openEmphasis}>{troutLength} miles of trout habitat</span>with <span className={classes.openGreen}>{publicLength} miles of public water.</span>
      </span>)
  }
})
export default LengthSentenceComponent
