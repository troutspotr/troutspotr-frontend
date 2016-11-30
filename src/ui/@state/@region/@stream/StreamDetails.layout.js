import React, { PropTypes } from 'react'
import classes from './StreamDetails.scss'
import SvgBubbleComponent from './bubble/SvgBubble.component'
import DetailsContainer from './details/Details.container'
const StreamItemComponent = React.createClass({
  propTypes: {
    selectedStream: PropTypes.object
  },

  renderStream () {
    let { selectedStream } = this.props
    if (selectedStream == null) {
      return null
    }
    return <SvgBubbleComponent
      streamPackage={selectedStream}
      index={0} />
  },

  renderDetails () {
    let { selectedStream } = this.props
    if (selectedStream == null) {
      return null
    }

    return (<DetailsContainer selectedStream={this.props.selectedStream} />)
  },

  render () {
    return (
      <div className={classes.streamDetailsContainer}>
        <div className={classes.layout}>
          <div className={classes.stream}>
            {this.renderStream()}
          </div>

          <div className={classes.details}>
            {this.renderDetails()}
          </div>
        </div>
      </div>)
  }
})
export default StreamItemComponent
