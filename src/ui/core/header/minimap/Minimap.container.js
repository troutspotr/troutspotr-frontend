import { connect } from 'react-redux'
import MinimapComponent from './Minimap.component'
import { isExpaned } from './Minimap.state'
import { isExpandedSelector } from './Minimap.selectors'
import { withRouter } from 'react-router'
import { isRootPageSelector } from 'ui/Location.selectors'
// import { loadingStatusSelector, savingStatusSelector } from './Profile.selectors'
const mapDispatchToProps = {
  expand: (expanded) => isExpaned(expanded)
}

const mapStateToProps = (state) => {
  return {
    isExpanded: isExpandedSelector(state),
    isRootPage: isRootPageSelector(state)
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MinimapComponent))
