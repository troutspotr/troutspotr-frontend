import {connect} from 'react-redux'
import DetailsOverlayComponent from './DetailsOverlay.component'
import {selectedRegionIdSelector, selectedStateIdSelector} from 'ui/core/Core.selectors'
import {getSelectedRoadSelector,
  selectedStreamObjectSelector,
  troutStreamDictionarySelector,
  visibleTroutStreams} from 'ui/@state/@region/Region.selectors'

const mapDispatchToProps = {}

const mapStateToProps = (state) => {
  const props = {
    'visibleTroutStreams': visibleTroutStreams(state),
    'selectedState': selectedStateIdSelector(state),
    'selectedRegion': selectedRegionIdSelector(state),
    'selectedStream': selectedStreamObjectSelector(state),
    'selectedAccessPoint': getSelectedRoadSelector(state),
    'streamDictionary': troutStreamDictionarySelector(state),
  }
  return props
}

export default connect(mapStateToProps, mapDispatchToProps)(DetailsOverlayComponent)
