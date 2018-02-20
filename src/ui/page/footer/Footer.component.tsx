import * as React from 'react'
const classes = require('./Footer.scss')
import { View } from 'ui/core/Core.redux'
import isEmpty from 'lodash-es/isEmpty'
import {
  FooterGpsComponent,
  // IGpsComponentProps,
  IGpsDispatchProps,
  IGpsComponentStateProps,
} from './gps/Footer.gps.component'

export interface IFooterDispatchProps extends IGpsDispatchProps {
  setViewToMap: () => void
  setViewToList: () => void
}
export interface IFooterStateProps extends IGpsComponentStateProps {
  view: View
  selectedStream: any
}

export interface IFooterProps extends IFooterDispatchProps, IFooterStateProps {}

export class FooterComponent extends React.PureComponent<IFooterProps> {
  render() {
    const { view, selectedStream } = this.props
    const listText = isEmpty(selectedStream) ? 'List' : 'Details'

    const listClass = view === View.list ? classes.selected : classes.item
    const mapClass = view === View.map ? classes.selected : classes.item
    return (
      <div className={classes.footer}>
        <div className={classes.menu}>
          <button onClick={this.props.setViewToList} className={listClass}>
            {listText}
          </button>
          <button onClick={this.props.setViewToMap} className={mapClass}>
            Map
          </button>
          <FooterGpsComponent {...this.props} />
        </div>
      </div>
    )
  }
}
