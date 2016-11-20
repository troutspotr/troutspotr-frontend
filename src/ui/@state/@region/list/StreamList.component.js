import React from 'react'
import classes from './List.scss'
// import BubbleComponent from './Bubble.component'
import StreamItemComponent from './streamItem/StreamItem.component'

const StreamListComponent = React.createClass({
  propTypes: {
    isVisible: React.PropTypes.bool.isRequired,
    visibleTroutStreams: React.PropTypes.array.isRequired,
    selectedState: React.PropTypes.string.isRequired,
    selectedRegion: React.PropTypes.string.isRequired
  },

  componentDidMount () {
    // console.log('LIST VIEW MOUNTED')
  },

  render () {
    let { selectedRegion, selectedState, visibleTroutStreams, isVisible } = this.props
    return (
      <div className={isVisible ? classes.listViewContainer : classes.invisible}>
        <ul className={classes.list}>
          {visibleTroutStreams.map((stream, index) => {
            let realStream = stream.stream
            let fakeName = realStream.properties.name
            let url = realStream.properties.slug
            return (
              <li key={index}>
                <StreamItemComponent
                  title={fakeName}
                  url={`/${selectedState}/${selectedRegion}/${url}`} />
              </li>)
          })
          }
        </ul>
      </div>)
  }
})
export default StreamListComponent
