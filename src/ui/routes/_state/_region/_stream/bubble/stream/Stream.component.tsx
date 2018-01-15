import * as React from 'react'
// import PropTypes from 'prop-types'
const classes = require('../SvgBubble.scss')
import SvgAnimatedPathComponent from '../SvgAnimatedPath.component'

class StreamComponent extends React.Component<any> {
  renderPalSections() {
    const streamLength = this.props.streamPackage.stream.properties.length_mi
    return (
      <g id="stream-pal">
        {this.props.streamPackage.palSections.map((pal, palIndex) => {
          const itemOffset =
            (streamLength - pal.properties.stop) / streamLength * this.props.timing.palSectionSpeed
          const offset = this.props.timing.basePalOffset + itemOffset
          return (
            <SvgAnimatedPathComponent
              offset={offset}
              length={this.props.timing.baseStreamLength}
              cssName={classes.pal}
              key={pal.properties.id}
              path={this.props.pathGenerator(pal.geometry)}
            />
          )
        })}
      </g>
    )
  }

  renderStream() {
    return (
      <g id="stream-stream">
        <SvgAnimatedPathComponent
          cssName={classes.stream}
          offset={0}
          length={0}
          path={this.props.pathGenerator(this.props.streamPackage.stream.geometry)}
        />
      </g>
    )
  }

  renderTroutStreamSections() {
    return (
      <g id="stream-sections">
        {this.props.streamPackage.sections.map((section, sectionIndex) => {
          const path = this.props.pathGenerator(section.geometry)
          return (
            <SvgAnimatedPathComponent
              offset={
                this.props.timing.baseTroutSectionOffset +
                this.props.timing.troutSectionSpeed * sectionIndex
              }
              length={this.props.timing.baseStreamLength}
              cssName={classes.section}
              key={section.properties.gid}
              path={path}
            />
          )
        })}
      </g>
    )
  }

  renderRestrictions() {
    return (
      <g id="stream-restrictions">
        {this.props.streamPackage.restrictions.map(restriction => {
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
          const thePath = this.props.pathGenerator(restriction.geometry)
          return (
            <g key={restriction.properties.gid}>
              <SvgAnimatedPathComponent
                offset={this.props.timing.baseRestrictionOffset}
                length={this.props.timing.baseStreamLength}
                cssName={className}
                path={thePath}
              />
              <SvgAnimatedPathComponent
                offset={this.props.timing.baseRestrictionOffset}
                length={this.props.timing.baseStreamLength}
                cssName={classes.restrictionBackground}
                path={thePath}
              />
            </g>
          )
        })}
      </g>
    )
  }

  render() {
    return (
      <g>
        {this.renderRestrictions()}
        {this.renderStream()}
        {this.renderTroutStreamSections()}
        {this.renderPalSections()}
      </g>
    )
  }
}

// StreamComponent.propTypes = {
//   'streamPackage': PropTypes.shape({
//     'stream': PropTypes.object.isRequired,
//     'sections': PropTypes.array.isRequired,
//     'restrictions': PropTypes.array.isRequired,
//     'palSections': PropTypes.array.isRequired,
//     'accessPoints': PropTypes.array.isRequired,
//     'tributaries': PropTypes.array.isRequired,
//   }),
//   'pathGenerator': PropTypes.func.isRequired,
//   'timing': PropTypes.object.isRequired,
// }

export default StreamComponent
