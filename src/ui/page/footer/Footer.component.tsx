import * as React from 'react'
const classes = require('./Footer.scss')
import { LIST, MAP } from 'ui/core/Core.redux'
import { isEmpty } from 'lodash'
import { FooterGpsComponent, IGpsComponentProps } from './gps/Footer.gps.component'

export interface IFooterComponent extends IGpsComponentProps {
  view: string
  setViewToMap: () => void
  setViewToList: () => void
  selectedStream: any
}

export class FooterComponent extends React.PureComponent<IFooterComponent> {
  render() {
    const { view, selectedStream } = this.props
    const listText = isEmpty(selectedStream) ? 'List' : 'Details'

    const listClass = view === LIST ? classes.selected : classes.item
    const mapClass = view === MAP ? classes.selected : classes.item
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
