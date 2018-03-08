import { connect } from 'react-redux'
import { selectedRegionIdSelector, selectedStateIdSelector } from 'ui/core/Core.selectors'
import {
  getSelectedRoadSelector,
  getSpecialRegulationsCurrentSeasonSelector,
  selectedStreamObjectSelector,
  troutStreamDictionarySelector,
} from 'ui/routes/@usState/@region/Region.selectors'
import RegulationsOverlayComponent from './RegulationsOverlay.component'

const mapDispatchToProps = {}

const mapStateToProps = state => {
  const props = {
    selectedState: selectedStateIdSelector(state),
    selectedRegion: selectedRegionIdSelector(state),
    selectedStream: selectedStreamObjectSelector(state),
    selectedAccessPoint: getSelectedRoadSelector(state),
    streamDictionary: troutStreamDictionarySelector(state),
    specialRegulationsCurrentSeason: getSpecialRegulationsCurrentSeasonSelector(state),
  }

  return props
}

export default connect(mapStateToProps, mapDispatchToProps)(RegulationsOverlayComponent)
