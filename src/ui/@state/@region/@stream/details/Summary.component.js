import React, {Component} from 'react'
import PropTypes from 'prop-types'
import classes from './Details.scss'
import RestrictionComponent from 'ui/core/regulations/Restriction.component'
import RegulationsSummaryContainer from 'ui/core/regulations/RegulationsSummary.container'
// Import { Link } from 'react-router'
/* eslint-disable camelcase */

class SummaryComponent extends Component {
  renderSummary ({miles, textClass, pattern, text, heightMultiplier}) {
    const roundedMiles = parseFloat(Math.round(miles * 10) / 10).toFixed(1)
    return (<RestrictionComponent
      color={textClass}
      pattern={pattern}
      text={text}
      hollow={false}
      heightMultiplier={heightMultiplier}
      length={`${roundedMiles} mi`}
    />)
    // If (miles === 0) {
    //   Return <div><mark className={markerClass} /> No {text}</div>
    // }
    // Return (<div>
    //   <mark className={markerClass} /><emphasis className={textClass}>{roundedMiles} miles</emphasis>of {text}
    // </div>)
  }

  render () {
    const {selectedStream} = this.props
    const {stream} = selectedStream
    const {length_mi, publicly_accessible_trout_stream_section_length, trout_stream_section_length} = stream.properties
    const viewModels = [
      {
        'miles': publicly_accessible_trout_stream_section_length,
        'textClass': 'green',
        'pattern': 'solid',
        'text': 'Publicly fishable land',
        'heightMultiplier': 0.4,
      },
      {
        'miles': trout_stream_section_length,
        'textClass': 'blue',
        'pattern': 'solid',
        'text': 'Trout habitat',
        'heightMultiplier': 0.3,
      },
      {
        'miles': length_mi,
        'textClass': 'blueGray',
        'pattern': 'solid',
        'text': 'Total length',
        'heightMultiplier': 0.1,
      },
    ]

    return (<div>
      <div className={classes.title}>Summary</div>
      <RegulationsSummaryContainer streamObject={this.props.selectedStream} />
      <br />
      {viewModels.map((viewModel, index) => {
        const id = `${viewModel.miles}_${viewModel.pattern}_${viewModel.text}`
        return (<div key={id} >
          {this.renderSummary(viewModel)}
        </div>)
      })}
    </div>)
  }
}

SummaryComponent.propTypes = {'selectedStream': PropTypes.object.isRequired}

export default SummaryComponent
