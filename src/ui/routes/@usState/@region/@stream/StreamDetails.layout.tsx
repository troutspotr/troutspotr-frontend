import * as React from 'react'
const classes = require('./StreamDetails.scss')
import { IStreamObject } from 'coreTypes/IStreamObject'
import DetailsContainer from './details/Details.container'

export interface IStreamItemComponent {
  selectedStream: IStreamObject
}

const renderStream = props => {
  const { selectedStream } = props
  if (selectedStream == null) {
    return null
  }
  return null // <SvgBubbleComponent streamPackage={selectedStream} index={0} />
}
const renderDetails = props => {
  const { selectedStream } = props
  if (selectedStream == null) {
    return null
  }
  return <DetailsContainer selectedStream={props.selectedStream} />
}

const StreamItemComponent = (props: IStreamItemComponent) => (
  <div className={classes.streamDetailsContainer}>
    <div className={classes.layout}>
      <div className={classes.stream}>{renderStream(props)}</div>
      <div className={classes.details}>{renderDetails(props)}</div>
    </div>
  </div>
)

/* eslint-enable react/prop-types */

export default StreamItemComponent
