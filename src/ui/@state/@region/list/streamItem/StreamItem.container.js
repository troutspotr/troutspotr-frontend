import { connect } from 'react-redux'
import StreamItemComponent from './StreamItem.component'
import { isListVisible } from 'ui/core/Core.selectors'
import { getWatersObjectSelector } from 'ui/@state/State.selectors'
const mapDispatchToProps = {
}

const mapStateToProps = (state) => {
  let props = {
    isVisible: isListVisible(state),
    getWaters: getWatersObjectSelector(state)
  }
  return props
}

export default connect(mapStateToProps, mapDispatchToProps)(StreamItemComponent)
