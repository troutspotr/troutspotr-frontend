import * as React from 'react'
// import PropTypes from 'prop-types'
import RingAxisComponent from './RingAxis.component'
import RingSectionComponent from './RingSection.component'

const classes = require('../SvgBubble.scss')
// Const ANIMATION_SCALE = 2.0
class RingComponent extends React.Component<any> {
  shouldComponentUpdate(nextProps) {
    return true
  }

  renderPalRings() {
    return this.props.streamPackage.palSections.map((pal, palIndex) => {
      const streamLength = this.props.streamPackage.stream.properties.length_mi
      const itemOffset =
        (streamLength - pal.properties.stop) / streamLength * this.props.timing.palSectionSpeed
      const offset = this.props.timing.basePalOffset + itemOffset
      return (
        <RingSectionComponent
          timing={{ offset, length: this.props.timing.baseStreamLength }}
          cssName={classes.pal}
          key={`${pal.properties.id}pal`}
          layout={this.props.layout}
          length={this.props.streamPackage.stream.properties.length_mi}
          start={pal.properties.start}
          stop={pal.properties.stop}
        />
      )
    })
  }

  renderSectionRings() {
    return this.props.streamPackage.sections.map((section, sectionIndex) => {
      const streamLength = this.props.streamPackage.stream.properties.length_mi
      const itemOffset =
        (streamLength - section.properties.stop) /
        streamLength *
        this.props.timing.troutSectionSpeed
      const offset = this.props.timing.baseTroutSectionOffset + itemOffset
      return (
        <RingSectionComponent
          timing={{ offset, length: this.props.timing.baseStreamLength }}
          cssName={classes.section}
          key={section.properties.gid}
          layout={this.props.layout}
          length={this.props.streamPackage.stream.properties.length_mi}
          start={section.properties.start}
          stop={section.properties.stop}
        />
      )
    })
  }

  renderRestrictionRings() {
    return this.props.streamPackage.restrictions.map((restriction, restrictionIndex) => {
      const streamLength = this.props.streamPackage.stream.properties.length_mi
      const positionOffset = (streamLength - restriction.properties.stop) / streamLength
      const itemOffset = positionOffset * this.props.timing.troutSectionSpeed
      const offset = this.props.timing.baseTroutSectionOffset + itemOffset
      let className
      if (restriction.properties.color === 'yellow') {
        className = classes.restriction
      } else if (restriction.properties.color === 'blue') {
        className = classes.restrictionAlt
      } else if (restriction.properties.color === 'white') {
        className = classes.restrictionAltAlt
      } else {
        className = classes.fishSanctuary
      }
      return (
        <g key={restriction.properties.gid}>
          <RingSectionComponent
            timing={{ offset, length: this.props.timing.baseStreamLength }}
            cssName={className}
            layout={this.props.layout}
            length={this.props.streamPackage.stream.properties.length_mi}
            start={restriction.properties.start}
            stop={restriction.properties.stop}
          />)
          <RingSectionComponent
            timing={{ offset, length: this.props.timing.baseStreamLength }}
            cssName={classes.restrictionBackground}
            layout={this.props.layout}
            length={this.props.streamPackage.stream.properties.length_mi}
            start={restriction.properties.start}
            stop={restriction.properties.stop}
          />
        </g>
      )
    })
  }

  renderStreamRing() {
    const streamLength = this.props.streamPackage.stream.properties.length_mi
    return (
      <RingSectionComponent
        timing={{
          offset: this.props.timing.baseStreamOffset,
          length: this.props.timing.baseStreamLength,
        }}
        cssName={classes.stream}
        layout={this.props.layout}
        length={streamLength}
        start={0}
        stop={streamLength}
      />
    )
  }

  renderRingAxis() {
    const length = this.props.streamPackage.stream.properties.length_mi
    const index = 0
    return <RingAxisComponent length={length} index={index} layout={this.props.layout} />
  }

  render() {
    return (
      <g id="ring">
        <g id="ring-restrictions">{this.renderRestrictionRings()}</g>

        <g id="ring-stream">{this.renderStreamRing()}</g>

        <g id="ring-sections">{this.renderSectionRings()}</g>

        <g id="ring-pal">{this.renderPalRings()}</g>
        <g id="ring-axis">{this.renderRingAxis()}</g>
      </g>
    )
  }
}

// RingComponent.propTypes = {
//   'streamPackage': PropTypes.shape({
//     'stream': PropTypes.object.isRequired,
//     'sections': PropTypes.array.isRequired,
//     'restrictions': PropTypes.array.isRequired,
//     'palSections': PropTypes.array.isRequired,
//     'accessPoints': PropTypes.array.isRequired,
//     'tributaries': PropTypes.array.isRequired,
//   }),
//   'timing': PropTypes.object.isRequired,
//   'layout': PropTypes.shape({
//     'width': PropTypes.number.isRequired,
//     'height': PropTypes.number.isRequired,
//     'radius': PropTypes.number.isRequired,
//     'arcCompressionRatio': PropTypes.number.isRequired,
//     'rotatePhase': PropTypes.number.isRequired,
//   }),
// }

export default RingComponent
