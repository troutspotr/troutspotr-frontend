import {connect} from 'react-redux'
import RegulationsSummaryComponent from './RegulationsSummary.component'
// Import { isListVisible } from 'ui/core/Core.selectors'
import {getRegulationsSummarySelector} from './RegulationsSummary.selectors'
const mapDispatchToProps = {}

const mapStateToProps = (state) => {
  const getSummary = getRegulationsSummarySelector(state)
  const props = {getSummary}
  return props
}

export default connect(mapStateToProps, mapDispatchToProps)(RegulationsSummaryComponent)
