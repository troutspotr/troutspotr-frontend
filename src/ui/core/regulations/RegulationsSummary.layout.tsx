import * as React from 'react'
import { WaterbodyStatus } from 'coreTypes/state/IWaterOpener';
const classes = require('./RegulationsSummary.scss')

export interface IRegulationsSummaryLayout {
  status: WaterbodyStatus
  statusText: string
  untilDateText: string | null
  additionalText: string
}

export const RegulationsSummaryLayout: React.SFC<IRegulationsSummaryLayout> = props => {
  const { status, statusText, untilDateText, additionalText } = props
  const statusClass = classes[status]
  return (
    <div className={classes.container}>
      <span className={statusClass}>
        {statusText} until {untilDateText}.
      </span>
      {additionalText != null && additionalText !== '' && <span> {additionalText}</span>}
    </div>
  )
}
