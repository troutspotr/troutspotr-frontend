import { connect } from 'react-redux'
import {
  RegulationsSummary,
  IRegulationsSummaryStateProps,
  IRegulationsSummaryDispatchProps,
  IRegulationsSummaryPassedProps,
} from './RegulationsSummary.component'
import { getRegulationsSummarySelector } from './RegulationsSummary.selectors'
import { IReduxState } from 'ui/redux/Store.redux.rootReducer'
const mapDispatchToProps = {}

const mapStateToProps = (state: IReduxState): IRegulationsSummaryStateProps => {
  const getSummary = getRegulationsSummarySelector(state)
  const props = { getSummary }
  return props
}

export default connect<
  IRegulationsSummaryStateProps,
  IRegulationsSummaryDispatchProps,
  IRegulationsSummaryPassedProps
>(mapStateToProps, mapDispatchToProps)(RegulationsSummary)
