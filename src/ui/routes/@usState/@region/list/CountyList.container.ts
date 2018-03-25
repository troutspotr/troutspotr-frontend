import { connect } from 'react-redux'
import { getRegulationsSummarySelector } from 'ui/core/regulations/RegulationsSummary.selectors'
import { getCountyListSelector } from '../Region.selectors'
import { CountyListComponent } from './CountyList.component'
import { isListViewed } from './List.selectors'
import { IReduxState } from 'ui/redux/Store.redux.rootReducer'
import { selectedStateIdSelector, selectedRegionIdSelector } from '../../../../Location.selectors'
const mapDispatchToProps = {}

const mapStateToProps = (state: IReduxState) => {
  const props = {
    visibleCounties: getCountyListSelector(state),
    selectedState: selectedStateIdSelector(state),
    selectedRegion: selectedRegionIdSelector(state),
    isListVisible: isListViewed(state),
    getSummary: getRegulationsSummarySelector(state),
  }

  return props
}

export default connect(mapStateToProps, mapDispatchToProps)(CountyListComponent)
