import { storiesOf } from '@storybook/react'
import * as React from 'react'
import { select, text } from '@storybook/addon-knobs'
// import { action } from '@storybook/addon-actions'
// import { RegulationsSummary, IRegulationsSummaryProps } from './RegulationsSummary.component'
import { RegulationsSummaryLayout, IRegulationsSummaryLayout } from './RegulationsSummary.layout'
const stories = storiesOf('Regulations Summary', module)

stories.add('Layout', () => {
  const status = select(
    'status',
    { open: 'open', closed: 'closed', openCaution: 'openCaution' },
    'open'
  )
  const statusText = text('status text', 'asdfasf')
  const untilDateText = text('until date', 'an unknown date')
  const additionalText = text('additoinal text', 'ljksdfjkl lkjs dfljk sfljksdlj k jklsd jkldfs')

  const props: IRegulationsSummaryLayout = {
    status,
    statusText,
    untilDateText,
    additionalText,
  }
  return <RegulationsSummaryLayout {...props} />
})
