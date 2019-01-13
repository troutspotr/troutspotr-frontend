import * as React from 'react'
const classes = require('./Reminder.scss')
const urlStyles = require('ui/routes/@usState/@region/@stream/details/Details.scss')
export interface IReminderComponent {
  stateName: string,
  url: string,
}

export const ReminderComponent = (props: IReminderComponent) => {
  const anchorTag = (<a 
    className={urlStyles.googleLink}
    href={props.url}
    target='_blank'
    rel='noopener'
    >here</a>)
  return <div className={classes.container}>Read {props.stateName}'s fishing regulations {anchorTag}.</div>
}
