import React, { PropTypes } from 'react'
import RingAxisComponent from './RingAxis.component'
import RingSectionComponent from './RingSection.component'

import classes from '../SvgBubble.scss'
const FISH_SANCTUARY_ID = 7
// const ANIMATION_SCALE = 2.0

const RingComponent = React.createClass({
  propTypes: {
    streamPackage: React.PropTypes.shape({
      stream: PropTypes.object.isRequired,
      sections: PropTypes.array.isRequired,
      restrictions: PropTypes.array.isRequired,
      palSections: PropTypes.array.isRequired,
      accessPoints: PropTypes.array.isRequired,
      tributaries: PropTypes.array.isRequired
    }),
    timing: PropTypes.object.isRequired,
    layout: PropTypes.shape({
      width: PropTypes.number.isRequired,
      height: PropTypes.number.isRequired,
      radius: PropTypes.number.isRequired,
      arcCompressionRatio: PropTypes.number.isRequired,
      rotatePhase: PropTypes.number.isRequired
    })
  },

  componentWillUnmount () {
    // console.log('unmounting')
  },

  shouldComponentUpdate (nextProps) {
    return false
  },

  renderPalRings () {
    return this.props.streamPackage.palSections.map((pal, palIndex) => {
      let streamLength = this.props.streamPackage.stream.properties.length_mi
      let itemOffset = ((streamLength - pal.properties.stop) / streamLength) * this.props.timing.palSectionSpeed
      let offset = this.props.timing.basePalOffset + itemOffset
      return (<RingSectionComponent
        timing={{ offset, length: this.props.timing.baseStreamLength }}
        cssName={classes.pal}
        key={pal.properties.id + 'pal'}
        layout={this.props.layout}
        length={this.props.streamPackage.stream.properties.length_mi}
        start={pal.properties.start}
        stop={pal.properties.stop} />)
    })
  },

  renderSectionRings () {
    return this.props.streamPackage.sections.map((section, sectionIndex) => {
      let streamLength = this.props.streamPackage.stream.properties.length_mi
      let itemOffset = ((streamLength - section.properties.stop) / streamLength) * this.props.timing.troutSectionSpeed
      let offset = this.props.timing.baseTroutSectionOffset + itemOffset
      return (<RingSectionComponent
        timing={{ offset, length: this.props.timing.baseStreamLength }}
        cssName={classes.section}
        key={section.properties.gid}
        layout={this.props.layout}
        length={this.props.streamPackage.stream.properties.length_mi}
        start={section.properties.start}
        stop={section.properties.stop} />)
    })
  },

  renderRestrictionRings () {
    return this.props.streamPackage.restrictions.map((restriction, restrictionIndex) => {
      let streamLength = this.props.streamPackage.stream.properties.length_mi
      let positionOffset = ((streamLength - restriction.properties.stop) / streamLength)
      let itemOffset = positionOffset * this.props.timing.troutSectionSpeed
      let offset = this.props.timing.baseTroutSectionOffset + itemOffset
      let className = restriction.properties.restriction_id === FISH_SANCTUARY_ID
        ? classes.fishSanctuary
        : classes.restriction
      return (
        <g key={restriction.properties.gid}>
          <RingSectionComponent
            timing={{ offset, length: this.props.timing.baseStreamLength }}
            cssName={className}
            layout={this.props.layout}
            length={this.props.streamPackage.stream.properties.length_mi}
            start={restriction.properties.start}
            stop={restriction.properties.stop} />)
          <RingSectionComponent
            timing={{ offset, length: this.props.timing.baseStreamLength }}
            cssName={classes.restrictionBackground}
            layout={this.props.layout}
            length={this.props.streamPackage.stream.properties.length_mi}
            start={restriction.properties.start}
            stop={restriction.properties.stop} />
        </g>
      )
    })
  },

  renderStreamRing () {
    let streamLength = this.props.streamPackage.stream.properties.length_mi
    return (<RingSectionComponent
      timing={{ offset: this.props.timing.baseStreamOffset, length: this.props.timing.baseStreamLength }}
      cssName={classes.stream}
      layout={this.props.layout}
      length={streamLength}
      start={0}
      stop={streamLength} />)
  },

  renderRingAxis () {
    let length = this.props.streamPackage.stream.properties.length_mi
    let index = 0
    return (<RingAxisComponent
      length={length}
      index={index}
      layout={this.props.layout} />)
  },

  render () {
    return (
      <g id='ring'>
        <g id='ring-restrictions'>
          {
          this.renderRestrictionRings()
        }
        </g>

        <g id='ring-stream'>
          {
          this.renderStreamRing()
        }
        </g>

        <g id='ring-sections'>
          {
          this.renderSectionRings()
        }
        </g>

        <g id='ring-pal'>
          {
          this.renderPalRings()
        }
        </g>
        <g id='ring-axis'>
          {
          this.renderRingAxis()
        }
        </g>
      </g>
    )
  }
})

export default RingComponent
