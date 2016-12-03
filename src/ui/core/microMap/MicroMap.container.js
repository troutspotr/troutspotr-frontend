import { connect } from 'react-redux'
import MicroMapComponet from './MicroMap.component'
import { isListVisible } from 'ui/core/Core.selectors'
const mapDispatchToProps = {
}

const mapStateToProps = (state) => {
  let props = {
    isVisible: isListVisible(state)
  }
  return props
}

export default connect(mapStateToProps, mapDispatchToProps)(MicroMapComponet)
