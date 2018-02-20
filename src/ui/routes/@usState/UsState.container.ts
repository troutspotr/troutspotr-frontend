import { connect } from 'react-redux'
import StateComponent from './UsState.component'
import { fetchStateData } from './UsState.redux'
// import { selectedStateIdSelector } from 'ui/core/Core.selectors'
export const mapDispatchToProps = {}

export const mapStateToProps = state => {
  const props = {}
  return props
}

export default connect(mapStateToProps, mapDispatchToProps)(StateComponent)
