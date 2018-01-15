import React from 'react'
import PropTypes from 'prop-types'
import classes from './StreamDetails.scss'
import SvgBubbleComponent from './bubble/SvgBubble.component'
import DetailsContainer from './details/Details.container'

const StreamItemComponent = (props) => (
  <div className={classes.streamDetailsContainer}>
    <div className={classes.layout}>
      <div className={classes.stream}>
        {renderStream(props)}
      </div>
      <div className={classes.details}>
        {renderDetails(props)}
      </div>
    </div>
  </div>)
/* eslint-disable react/prop-types */
const renderStream = (props) => {
  const {selectedStream} = props
  if (selectedStream == null) {
    return null
  }
  return (<SvgBubbleComponent
    streamPackage={selectedStream}
    index={0}
  />)
}

const renderDetails = (props) => {
  const {selectedStream} = props
  if (selectedStream == null) {
    return null
  }
  return (<DetailsContainer selectedStream={props.selectedStream} />)
}
/* eslint-enable react/prop-types */
StreamItemComponent.propTypes = {
  selectedStream: PropTypes.object,
}
export default StreamItemComponent
