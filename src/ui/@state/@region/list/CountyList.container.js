import { connect } from 'react-redux'
import CountyListComponent from './CountyList.component'
import { selectedStateIdSelector, selectedRegionIdSelector, isListVisible } from 'ui/core/Core.selectors'
import { getCountyListSelector } from '../Region.selectors'

const mapDispatchToProps = {
  
}

const mapStateToProps = (state) => {
  let props = {
    visibleCounties: getCountyListSelector(state),
    selectedState: selectedStateIdSelector(state),
    selectedRegion: selectedRegionIdSelector(state),
    isListVisible: isListVisible(state)
  }

  return props
}

export default connect(mapStateToProps, mapDispatchToProps)(CountyListComponent)
