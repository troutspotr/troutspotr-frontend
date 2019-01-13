import * as React from 'react'
const classes = require('./Reminder.scss')

export interface IReminderComponent {
  stateName: string,
  url: string,
}

export const ReminderComponent = (props: IReminderComponent) => {
  const anchorTag = (<a 
    href={props.url}
    target='_blank'
    rel='noopener'
    >here</a>)
  return <span className={classes.container}>Read {props.stateName}'s fishing regulations {anchorTag}.</span>
}
