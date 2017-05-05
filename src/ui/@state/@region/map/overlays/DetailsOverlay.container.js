import { connect } from 'react-redux'
import DetailsOverlayComponent from './DetailsOverlay.component'
import { selectedStateIdSelector, selectedRegionIdSelector } from 'ui/core/Core.selectors'
import { visibleTroutStreams,
  selectedStreamObjectSelector,
  getSelectedRoadSelector,
  troutStreamDictionarySelector } from 'ui/@state/@region/Region.selectors'

const mapDispatchToProps = {

}

const mapStateToProps = (state) => {
  let props = {
    visibleTroutStreams: visibleTroutStreams(state),
    selectedState: selectedStateIdSelector(state),
    selectedRegion: selectedRegionIdSelector(state),
    selectedStream: selectedStreamObjectSelector(state),
    selectedAccessPoint: getSelectedRoadSelector(state),
    streamDictionary: troutStreamDictionarySelector(state)
  }
  return props
}

export default connect(mapStateToProps, mapDispatchToProps)(DetailsOverlayComponent)
