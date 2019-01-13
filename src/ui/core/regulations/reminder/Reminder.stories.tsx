import { storiesOf } from '@storybook/react'
import * as React from 'react'
import { text } from '@storybook/addon-knobs'
import { IReminderComponent, ReminderComponent } from './Reminder.component';
const stories = storiesOf('Reminder Component', module)

stories.add('basic', () => {
  const props: IReminderComponent = {
     stateName: text('stateName', 'California'),
     url: text(   'URL', 'https://www.google.com/whogivesashit')
   }
  return <ReminderComponent {...props} />
})