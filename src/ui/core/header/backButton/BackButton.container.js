import { connect } from 'react-redux'
import BackButtonComponent from './BackButton.component'
// import { isExpaned } from './Minimap.state'
import { isEnabledSelector, previousSelector } from './BackButton.selectors'
import { isExpaned } from '../minimap/Minimap.state'
// import { loadingStatusSelector, savingStatusSelector } from './Profile.selectors'
const mapDispatchToProps = {
  // expand: (expanded) => isExpaned(expanded)
  expandMinimap: (expand) => isExpaned(expand)
}

const mapStateToProps = (state) => {
  return {
    previous: previousSelector(state),
    isEnabled: isEnabledSelector(state)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BackButtonComponent)
