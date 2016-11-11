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
    isVisible: React.PropTypes.bool.isRequired
    // children: React.PropTypes.element
    // streams: PropTypes.array.isRequired,
    // getSouthEasternStreams: PropTypes.func.isRequired
  },

  componentDidMount () {
    console.log('LIST VIEW MOUNTED')
  },

  renderNonsenseContent () {
    return (
      <div>
        <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean at mi nec sem euismod tincidunt. Donec consequat quis leo eu viverra. Morbi sagittis iaculis magna, nec semper velit viverra a. Morbi ut hendrerit mauris. Phasellus vel est metus. Sed feugiat vehicula augue, non commodo ligula finibus eu. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Morbi volutpat velit nec placerat tristique. Phasellus elementum, eros convallis tincidunt convallis, felis eros imperdiet tortor, non molestie lorem tortor scelerisque est.
      </p>

        <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean at mi nec sem euismod tincidunt. Donec consequat quis leo eu viverra. Morbi sagittis iaculis magna, nec semper velit viverra a. Morbi ut hendrerit mauris. Phasellus vel est metus. Sed feugiat vehicula augue, non commodo ligula finibus eu. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Morbi volutpat velit nec placerat tristique. Phasellus elementum, eros convallis tincidunt convallis, felis eros imperdiet tortor, non molestie lorem tortor scelerisque est.
      </p>
        <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean at mi nec sem euismod tincidunt. Donec consequat quis leo eu viverra. Morbi sagittis iaculis magna, nec semper velit viverra a. Morbi ut hendrerit mauris. Phasellus vel est metus. Sed feugiat vehicula augue, non commodo ligula finibus eu. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Morbi volutpat velit nec placerat tristique. Phasellus elementum, eros convallis tincidunt convallis, felis eros imperdiet tortor, non molestie lorem tortor scelerisque est.
      </p>
        <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean at mi nec sem euismod tincidunt. Donec consequat quis leo eu viverra. Morbi sagittis iaculis magna, nec semper velit viverra a. Morbi ut hendrerit mauris. Phasellus vel est metus. Sed feugiat vehicula augue, non commodo ligula finibus eu. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Morbi volutpat velit nec placerat tristique. Phasellus elementum, eros convallis tincidunt convallis, felis eros imperdiet tortor, non molestie lorem tortor scelerisque est.
      </p>

        <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean at mi nec sem euismod tincidunt. Donec consequat quis leo eu viverra. Morbi sagittis iaculis magna, nec semper velit viverra a. Morbi ut hendrerit mauris. Phasellus vel est metus. Sed feugiat vehicula augue, non commodo ligula finibus eu. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Morbi volutpat velit nec placerat tristique. Phasellus elementum, eros convallis tincidunt convallis, felis eros imperdiet tortor, non molestie lorem tortor scelerisque est.
      </p>
        <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean at mi nec sem euismod tincidunt. Donec consequat quis leo eu viverra. Morbi sagittis iaculis magna, nec semper velit viverra a. Morbi ut hendrerit mauris. Phasellus vel est metus. Sed feugiat vehicula augue, non commodo ligula finibus eu. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Morbi volutpat velit nec placerat tristique. Phasellus elementum, eros convallis tincidunt convallis, felis eros imperdiet tortor, non molestie lorem tortor scelerisque est.
      </p>
        <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean at mi nec sem euismod tincidunt. Donec consequat quis leo eu viverra. Morbi sagittis iaculis magna, nec semper velit viverra a. Morbi ut hendrerit mauris. Phasellus vel est metus. Sed feugiat vehicula augue, non commodo ligula finibus eu. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Morbi volutpat velit nec placerat tristique. Phasellus elementum, eros convallis tincidunt convallis, felis eros imperdiet tortor, non molestie lorem tortor scelerisque est.
      </p><p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean at mi nec sem euismod tincidunt. Donec consequat quis leo eu viverra. Morbi sagittis iaculis magna, nec semper velit viverra a. Morbi ut hendrerit mauris. Phasellus vel est metus. Sed feugiat vehicula augue, non commodo ligula finibus eu. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Morbi volutpat velit nec placerat tristique. Phasellus elementum, eros convallis tincidunt convallis, felis eros imperdiet tortor, non molestie lorem tortor scelerisque est.
      </p>

        <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean at mi nec sem euismod tincidunt. Donec consequat quis leo eu viverra. Morbi sagittis iaculis magna, nec semper velit viverra a. Morbi ut hendrerit mauris. Phasellus vel est metus. Sed feugiat vehicula augue, non commodo ligula finibus eu. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Morbi volutpat velit nec placerat tristique. Phasellus elementum, eros convallis tincidunt convallis, felis eros imperdiet tortor, non molestie lorem tortor scelerisque est.
      </p>
        <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean at mi nec sem euismod tincidunt. Donec consequat quis leo eu viverra. Morbi sagittis iaculis magna, nec semper velit viverra a. Morbi ut hendrerit mauris. Phasellus vel est metus. Sed feugiat vehicula augue, non commodo ligula finibus eu. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Morbi volutpat velit nec placerat tristique. Phasellus elementum, eros convallis tincidunt convallis, felis eros imperdiet tortor, non molestie lorem tortor scelerisque est.
      </p>
        <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean at mi nec sem euismod tincidunt. Donec consequat quis leo eu viverra. Morbi sagittis iaculis magna, nec semper velit viverra a. Morbi ut hendrerit mauris. Phasellus vel est metus. Sed feugiat vehicula augue, non commodo ligula finibus eu. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Morbi volutpat velit nec placerat tristique. Phasellus elementum, eros convallis tincidunt convallis, felis eros imperdiet tortor, non molestie lorem tortor scelerisque est.
      </p>
      </div>)
  },

  render () {
    console.log('visiblility of stream list is', this.props.isVisible)
    return (
      <div className={this.props.isVisible ? classes.listViewContainer : classes.invisible}>
        <ul className={classes.list}>
          {FAKE_STREAMS.map((stream, index) => {
            let url = stream.replace(' ', '_')
            return (
              <li key={index}>
                <StreamItemComponent
                  title={stream}
                  url={`/mn/asdf/${url}`} />
              </li>)
          })
          }
        </ul>
      </div>)
  }
})
export default StreamListComponent
