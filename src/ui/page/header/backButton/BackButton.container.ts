import { connect } from 'react-redux'
import { isExpaned } from '../minimap/Minimap.redux'
import { BackButtonComponent } from './BackButton.component'
import { isEnabledSelector, previousSelector } from './BackButton.selectors'
const mapDispatchToProps = { expandMinimap: expand => isExpaned(expand) }

const mapStateToProps = state => ({
  previous: previousSelector(state),
  isEnabled: isEnabledSelector(state),
})

export default connect(mapStateToProps, mapDispatchToProps)(BackButtonComponent)
