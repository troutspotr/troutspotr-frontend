import React, { PropTypes } from 'react'
import classes from '../SvgBubble.scss'

import SvgAnimatedPathComponent from '../SvgAnimatedPath.component'
const FISH_SANCTUARY_ID = 7
const StreamComponent = React.createClass({
  propTypes: {
    streamPackage: React.PropTypes.shape({
      stream: PropTypes.object.isRequired,
      sections: PropTypes.array.isRequired,
      restrictions: PropTypes.array.isRequired,
      palSections: PropTypes.array.isRequired,
      accessPoints: PropTypes.array.isRequired,
      tributaries: PropTypes.array.isRequired
    }),
    pathGenerator: PropTypes.func.isRequired,
    projection: PropTypes.func.isRequired,
    timing: PropTypes.object.isRequired,
    index: PropTypes.number.isRequired,
    layout: PropTypes.shape({
      width: PropTypes.number.isRequired,
      height: PropTypes.number.isRequired,
      radius: PropTypes.number.isRequired,
      arcCompressionRatio: PropTypes.number.isRequired,
      rotatePhase: PropTypes.number.isRequired
    })
  },

  // componentWillMount () {
  //   this.props.timing = this.props.timing || getTiming(this.props, ANIMATION_SCALE)
  // },

  renderPalSections () {
    let streamLength = this.props.streamPackage.stream.properties.length_mi
    return (<g id='stream-pal'>
      {
        this.props.streamPackage.palSections.map((pal, palIndex) => {
          let itemOffset = ((streamLength - pal.properties.stop) / streamLength) * this.props.timing.palSectionSpeed
          let offset = this.props.timing.basePalOffset + itemOffset
          return (<SvgAnimatedPathComponent
            offset={offset}
            length={this.props.timing.baseStreamLength}
            cssName={classes.pal}
            key={pal.properties.id}
            path={this.props.pathGenerator(pal.geometry)} />)
        })
      }
    </g>)
  },

  renderStream () {
    return <g id='stream-stream'>
      <SvgAnimatedPathComponent
        cssName={classes.stream}
        path={this.props.pathGenerator(this.props.streamPackage.stream.geometry)}
        offset={this.props.timing.baseStreamOffset}
        length={this.props.timing.baseStreamLength} />
    </g>
  },

  renderTroutStreamSections () {
    return (<g id='stream-sections'>
      {
      this.props.streamPackage.sections.map((section, sectionIndex) => {
        let path = this.props.pathGenerator(section.geometry)
        return (<SvgAnimatedPathComponent
          offset={this.props.timing.baseTroutSectionOffset + (this.props.timing.troutSectionSpeed * sectionIndex)}
          length={this.props.timing.baseStreamLength}
          cssName={classes.section}
          key={section.properties.gid}
          path={path} />)
      })
    }
    </g>)
  },

  renderRestrictions () {
    return (<g id='stream-restrictions'>
      {
      this.props.streamPackage.restrictions.map(restriction => {
        let className = restriction.properties.restriction_id === FISH_SANCTUARY_ID
          ? classes.fishSanctuary
          : classes.restriction
        return (<SvgAnimatedPathComponent
          offset={this.props.timing.baseRestrictionOffset}
          length={this.props.timing.baseStreamLength}
          cssName={className}
          key={restriction.properties.gid}
          path={this.props.pathGenerator(restriction.geometry)} />)
      })
    }
    </g>)
  },

  render () {
    return <g>
      {this.renderPalSections()}
      {this.renderStream()}
      {this.renderTroutStreamSections()}
      {this.renderRestrictions()}
    </g>
  }
})

export default StreamComponent
