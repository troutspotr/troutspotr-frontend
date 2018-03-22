import * as React from 'react'
const classes = require('./NoResultsFoundOverlay.scss')
import { MessageOverlayComponent } from 'ui/core/messageOverlay/MessageOverlay.component'

import isEmpty from 'lodash-es/isEmpty'

export interface INoResultsFoundComponentDispatchProps {
  clearText(): void
}

export interface INoResultsFoundComponentStateProps {
  totalStreams: any[]
  isDisplayed: boolean
}

export interface INoResultsFoundProps
  extends INoResultsFoundComponentDispatchProps,
    INoResultsFoundComponentStateProps {}

export class NoResultsFoundComponent extends React.Component<INoResultsFoundProps> {
  public renderNoStreamsFound() {
    const { totalStreams, clearText } = this.props
    const safeStreamCount = isEmpty(totalStreams) ? 0 : totalStreams.length
    return (
      <div>
        <div className={classes.clearSearchTitle}>No streams matched your search.</div>
        <div>
          <button onClick={clearText} className={classes.actionButton}>
            Clear your search
          </button>{' '}
          to see {safeStreamCount} streams.
        </div>
      </div>
    )
  }

  public render() {
    if (this.props.isDisplayed !== true) {
      return null
    }

    return (
      <MessageOverlayComponent position="top">
        {this.renderNoStreamsFound()}
      </MessageOverlayComponent>
    )
  }
}
