import isEmpty from 'lodash-es/isEmpty'
import * as React from 'react'
import { RestrictionComponent, IRestrictionComponent } from 'ui/core/regulations/restriction/Restriction.component'
export interface IRegulationsOverlayStateProps {
  restrictions: ReadonlyArray<IRestrictionComponent>,
}

export class RegulationsOverlayComponent extends React.Component<IRegulationsOverlayStateProps> {
  public render() {
    if (this.props.restrictions == null || this.props.restrictions.length === 0) {
      return null
    }

    return this.props.restrictions.map((r, index) => <RestrictionComponent { ...r } key={index + r.text} />)
  }
}
