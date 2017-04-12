import React, { PropTypes } from 'react'
import classes from './StreamDetails.scss'
import SvgBubbleComponent from './bubble/SvgBubble.component'
import DetailsContainer from './details/Details.container'

const StreamItemComponent = (props) => {
  return (
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
}

const renderStream = (props) => {
  let { selectedStream } = props
  if (selectedStream == null) {
    return null
  }
  return (<SvgBubbleComponent
    streamPackage={selectedStream}
    index={0}
          />)
}

const renderDetails = (props) => {
  let { selectedStream } = props
  if (selectedStream == null) {
    return null
  }
  return (<DetailsContainer selectedStream={props.selectedStream} />)
}

StreamItemComponent.propTypes = {
  selectedStream: PropTypes.object
}
export default StreamItemComponent
