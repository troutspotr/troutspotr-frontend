import * as React from 'react'
const classes = require('./NoResultsFoundOverlay.scss')
import { MessageOverlayComponent } from 'ui/core/messageOverlay/MessageOverlay.component'

import isEmpty from 'lodash-es/isEmpty'

export interface IRegionLayout {
  clearText: {}
  totalStreams: {}
  isDisplayed: {}
}

class RegionLayout extends React.Component<IRegionLayout> {
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
    if (this.props.isDisplayed === false) {
      return null
    }

    return (
      <MessageOverlayComponent position="top">
        {this.renderNoStreamsFound()}
      </MessageOverlayComponent>
    )
  }
}

export default RegionLayout
