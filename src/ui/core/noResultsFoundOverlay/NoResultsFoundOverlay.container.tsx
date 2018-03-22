import { connect } from 'react-redux'
import { updateSearchText } from 'ui/core/Core.redux'
import {
  NoResultsFoundComponent,
  INoResultsFoundComponentDispatchProps,
  INoResultsFoundComponentStateProps,
} from './NoResultsFoundOverlay.component'
import * as selectors from './NoResultsFoundOverlay.selectors'

const mapDispatchToProps: INoResultsFoundComponentDispatchProps = {
  clearText: () => updateSearchText(''),
}

const mapStateToProps = (state): INoResultsFoundComponentStateProps => {
  const props = {
    totalStreams: selectors.availableStreams(state),
    isDisplayed: selectors.isDisplayed(state),
  }

  return props
}

export default connect<INoResultsFoundComponentStateProps, INoResultsFoundComponentDispatchProps>(
  mapStateToProps,
  mapDispatchToProps
)(NoResultsFoundComponent)
