import * as React from 'react'
const classes = require('./Details.scss')
import RegulationsSummaryContainer from 'ui/core/regulations/RegulationsSummary.container'
import { RestrictionComponent } from '../../../../../core/regulations/restriction/Restriction.component';
/* eslint-disable camelcase */
class SummaryComponent extends React.Component<any> {
  public renderSummary({ miles, textClass, pattern, text, heightMultiplier }) {
    const roundedMiles = 1.1
    return (
      <RestrictionComponent
        color={textClass}
        pattern={pattern}
        text={text}
        hollow={false}
        heightMultiplier={heightMultiplier}
        length={`${roundedMiles} mi`}
      />
    )
  }

  public render() {
    const { selectedStream } = this.props
    const { stream } = selectedStream
    const {
      length_mi,
      publicly_accessible_trout_stream_section_length,
      trout_stream_section_length,
    } = stream.properties
    const viewModels = [
      {
        miles: publicly_accessible_trout_stream_section_length,
        textClass: 'green',
        pattern: 'solid',
        text: 'Publicly fishable land',
        heightMultiplier: 0.4,
      },
      {
        miles: trout_stream_section_length,
        textClass: 'blue',
        pattern: 'solid',
        text: 'Trout habitat',
        heightMultiplier: 0.3,
      },
      {
        miles: length_mi,
        textClass: 'blueGray',
        pattern: 'solid',
        text: 'Total length',
        heightMultiplier: 0.1,
      },
    ]

    return (
      <div>
        <div className={classes.title}>Summary</div>
        <RegulationsSummaryContainer streamObject={this.props.selectedStream} />
        <br />
        {viewModels.map((viewModel, index) => {
          const id = `${viewModel.miles}_${viewModel.pattern}_${viewModel.text}`
          return <div key={id}>{this.renderSummary(viewModel)}</div>
        })}
      </div>
    )
  }
}

export default SummaryComponent
