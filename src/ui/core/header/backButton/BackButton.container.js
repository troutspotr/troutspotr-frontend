import { connect } from 'react-redux'
import BackButtonComponent from './BackButton.component'
import { isEnabledSelector, previousSelector } from './BackButton.selectors'
import { isExpaned } from '../minimap/Minimap.state'
const mapDispatchToProps = {
  expandMinimap: (expand) => isExpaned(expand)
}

const mapStateToProps = (state) => {
  return {
    previous: previousSelector(state),
    isEnabled: isEnabledSelector(state)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BackButtonComponent)
