import {connect} from 'react-redux'
import NoResultsFoundOverlayComponent from './NoResultsFoundOverlay.component'
import * as selectors from './NoResultsFoundOverlay.selectors'
import {updateSearchText} from 'ui/core/Core.state'

const mapDispatchToProps = {'clearText': () => updateSearchText('')}

const mapStateToProps = (state) => {
  const props = {
    'totalStreams': selectors.availableStreams(state),
    'isDisplayed': selectors.isDisplayed(state),
  }

  return props
}

export default connect(mapStateToProps, mapDispatchToProps)(NoResultsFoundOverlayComponent)
