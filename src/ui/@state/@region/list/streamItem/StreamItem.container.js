import { connect } from 'react-redux'
import StreamItemComponent from './StreamItem.component'
import { isListVisible } from 'ui/core/Core.selectors'
const mapDispatchToProps = {
}

const mapStateToProps = (state) => {
  let props = {
    isVisible: isListVisible(state)
  }
  return props
}

export default connect(mapStateToProps, mapDispatchToProps)(StreamItemComponent)
