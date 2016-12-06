import React, { PropTypes } from 'react'
import classes from './Details.scss'
import RestrictionComponent from 'ui/core/regulations/Restriction.component'
// import { Link } from 'react-router'
/* eslint-disable camelcase */

const SummaryComponent = React.createClass({
  propTypes: {
    selectedStream: PropTypes.object.isRequired
  },

  renderSummary ({ miles, textClass, pattern, text, heightMultiplier }) {
    let roundedMiles = parseFloat(Math.round(miles * 10) / 10).toFixed(1)
    return <RestrictionComponent
      color={textClass}
      pattern={pattern}
      text={text}
      hollow={false}
      heightMultiplier={heightMultiplier}
      length={roundedMiles + ' mi'} />
    // if (miles === 0) {
    //   return <div><mark className={markerClass} /> No {text}</div>
    // }
    // return (<div>
    //   <mark className={markerClass} /><emphasis className={textClass}>{roundedMiles} miles</emphasis>of {text}
    // </div>)
  },

  render () {
    let { selectedStream } = this.props
    let { stream } = selectedStream
    let { length_mi, publicly_accessible_trout_stream_section_length, trout_stream_section_length } = stream.properties
    let viewModels = [
      {
        miles: publicly_accessible_trout_stream_section_length,
        textClass: 'green',
        pattern: 'solid',
        text: 'Publicly fishable land',
        heightMultiplier: 0.3
      },
      {
        miles: trout_stream_section_length,
        textClass: 'blue',
        pattern: 'solid',
        text: 'Trout habitat',
        heightMultiplier: 0.3
      },
      {
        miles: length_mi,
        textClass: 'blueGray',
        pattern: 'solid',
        text: 'Total length',
        heightMultiplier: 0.1
      }
    ]

    return (<div>
      <div className={classes.title}>Summary</div>
      {viewModels.map((viewModel, index) => {
        return (<div key={index} >
          {this.renderSummary(viewModel)}
        </div>)
      })}
    </div>)
  }
})
export default SummaryComponent
