import React from 'react'
import classes from './List.scss'
// import BubbleComponent from './Bubble.component'
import StreamItemComponent from './streamItem/StreamItem.component'
const FAKE_STREAMS = [
  'asdfasdf',
  'Trout_Run_Creek',
  'Lost_Creek',
  'Root_River_South_Branch',
  'Root_River_Middle_Branch',
  'Cold_Spring_Brook',
  'Beaver_Creek_West',
  'Trib_5_to_Crooked_Creek',
  'Tributary_10_to_Whitewater_River',
  'Gernander_Creek',
  'Rollingstone_Creek_Middle_Branch',
  'Unnamed_Creek'
]
const StreamListComponent = React.createClass({
  propTypes: {
    // children: React.PropTypes.element
    // streams: PropTypes.array.isRequired,
    // getSouthEasternStreams: PropTypes.func.isRequired
  },

  // componentDidMount () {
  //   this.props.getSouthEasternStreams()
  // },

  render () {
    return (<ul className={classes.listViewContainer}>
      {FAKE_STREAMS.map((stream, index) => {
        let url = stream.replace(' ', '_')
        return (
          <StreamItemComponent key={index}
            title={stream}
            url={`/mn/asdf/list/${url}`} />)
      })}
    </ul>)
  }
})

export default StreamListComponent
