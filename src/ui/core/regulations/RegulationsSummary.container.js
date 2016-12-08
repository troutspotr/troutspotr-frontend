import { connect } from 'react-redux'
import RegulationsSummaryComponent from './RegulationsSummary.component'
// import { isListVisible } from 'ui/core/Core.selectors'
import { getRegulationsSummarySelector } from './RegulationsSummary.selectors'
const mapDispatchToProps = {
}

const mapStateToProps = (state) => {
  let getSummary = getRegulationsSummarySelector(state)
  let props = {
    getSummary
  }
  return props
}

export default connect(mapStateToProps, mapDispatchToProps)(RegulationsSummaryComponent)
