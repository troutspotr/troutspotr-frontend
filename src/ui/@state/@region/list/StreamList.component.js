import React from 'react'
import classes from './List.scss'
// import BubbleComponent from './Bubble.component'
import StreamItemContainer from './streamItem/StreamItem.container'

const StreamListComponent = React.createClass({
  propTypes: {
    isListVisible: React.PropTypes.bool.isRequired,
    visibleTroutStreams: React.PropTypes.array.isRequired,
    selectedState: React.PropTypes.string.isRequired,
    selectedRegion: React.PropTypes.string.isRequired
  },

  componentDidMount () {
    // console.log('LIST VIEW MOUNTED')
  },

  render () {
    let { selectedRegion, selectedState, visibleTroutStreams, isListVisible } = this.props
    return (
      <div className={classes.streamList}>
        {visibleTroutStreams.map((stream, index) => {
          let realStream = stream.stream
          let fakeName = realStream.properties.name
          let url = realStream.properties.slug
          return (
            <div key={realStream.properties.slug}>
              <StreamItemContainer
                title={fakeName}
                url={`/${selectedState}/${selectedRegion}/${url}`}
                streamObject={stream} />
            </div>)
        })
        }
      </div>)
  }
})
export default StreamListComponent
