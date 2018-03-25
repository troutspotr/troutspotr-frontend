import { connect } from 'react-redux'
import { setIsExpanded } from '../minimap/Minimap.redux'
import { BackButtonComponent } from './BackButton.component'
import { isEnabledSelector, previousSelector } from './BackButton.selectors'
const mapDispatchToProps = { expandMinimap: expand => setIsExpanded(expand) }

const mapStateToProps = state => ({
  previous: previousSelector(state),
  isEnabled: isEnabledSelector(state),
})

export default connect(mapStateToProps, mapDispatchToProps)(BackButtonComponent)
