import { connect } from 'react-redux'
import RegulationsOverlayComponent from './RegulationsOverlay.component'
import { selectedStateIdSelector, selectedRegionIdSelector } from 'ui/core/Core.selectors'
import {
  getSpecialRegulationsCurrentSeasonSelector,
  selectedStreamObjectSelector,
  getSelectedRoadSelector,
  troutStreamDictionarySelector } from 'ui/@state/@region/Region.selectors'

const mapDispatchToProps = {

}

const mapStateToProps = (state) => {
  let props = {
    selectedState: selectedStateIdSelector(state),
    selectedRegion: selectedRegionIdSelector(state),
    selectedStream: selectedStreamObjectSelector(state),
    selectedAccessPoint: getSelectedRoadSelector(state),
    streamDictionary: troutStreamDictionarySelector(state),
    specialRegulationsCurrentSeason: getSpecialRegulationsCurrentSeasonSelector(state)
  }

  return props
}

export default connect(mapStateToProps, mapDispatchToProps)(RegulationsOverlayComponent)
