import { connect } from 'react-redux'
import CountyListComponent from './CountyList.component'
import { selectedRegionIdSelector, selectedStateIdSelector } from 'ui/core/Core.selectors'
import { getCountyListSelector } from '../Region.selectors'
import { isListViewed } from './List.selectors'
import { getRegulationsSummarySelector } from 'ui/core/regulations/RegulationsSummary.selectors'
const mapDispatchToProps = {}

const mapStateToProps = state => {
  const props = {
    visibleCounties: getCountyListSelector(state),
    selectedState: selectedStateIdSelector(state),
    selectedRegion: selectedRegionIdSelector(state),
    isListVisible: isListViewed(state),
    getSummary: getRegulationsSummarySelector(state),
  }

  return props
}

export default connect(mapStateToProps, mapDispatchToProps)(CountyListComponent) as any
