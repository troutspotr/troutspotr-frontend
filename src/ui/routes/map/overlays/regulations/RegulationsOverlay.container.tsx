import { connect } from 'react-redux'
import {
  getSelectedRoadSelector,
  getSpecialRegulationsCurrentSeasonSelector,
  selectedStreamObjectSelector,
  troutStreamDictionarySelector,
} from '../../@usState/@region/Region.selectors'
import RegulationsOverlayComponent from './RegulationsOverlay.component'
import { selectedStateIdSelector, selectedRegionIdSelector } from '../../../Location.selectors'

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
