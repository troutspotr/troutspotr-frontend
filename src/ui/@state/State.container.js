import { connect } from 'react-redux'
import StateComponent from './State.component'
import { fetchStateData } from './State.state'
import { selectedStateIdSelector } from 'ui/core/Core.selectors'
const mapDispatchToProps = {
  fetchStateData: stateId => fetchStateData(stateId)
}

const mapStateToProps = (state) => {
  let props = {
    selectedState: selectedStateIdSelector(state)
  }
  return props
}

export default connect(mapStateToProps, mapDispatchToProps)(StateComponent)
