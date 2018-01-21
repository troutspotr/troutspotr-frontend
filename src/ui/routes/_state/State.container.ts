import { connect } from 'react-redux'
import StateComponent from './State.component'
import { fetchStateData } from './State.redux'
import { selectedStateIdSelector } from 'ui/core/Core.selectors'
export const mapDispatchToProps = { fetchStateData: stateId => fetchStateData(stateId) }

export const mapStateToProps = state => {
  const props = { selectedState: selectedStateIdSelector(state) }
  return props
}

export default connect(mapStateToProps, mapDispatchToProps)(StateComponent)
