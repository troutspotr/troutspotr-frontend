import { connect } from 'react-redux'

import { RegulationsOverlayComponent } from './RegulationsOverlay.component'
import { selectedStateIdSelector, selectedRegionIdSelector } from '../../../../Location.selectors';
import { selectedStreamObjectSelector, getSelectedRoadSelector, troutStreamDictionarySelector, getSpecialRegulationsCurrentSeasonSelector } from '../../../@usState/@region/Region.selectors';

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
