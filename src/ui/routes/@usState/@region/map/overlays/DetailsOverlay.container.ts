import { connect } from 'react-redux'
import { DetailsOverlayComponent, IDetailsOverlayComponent } from './DetailsOverlay.component'
import { selectedRegionIdSelector, selectedStateIdSelector } from 'ui/core/Core.selectors'
import {
  getSelectedRoadSelector,
  selectedStreamObjectSelector,
  troutStreamDictionarySelector,
  visibleTroutStreams,
} from 'ui/routes/@usState/@region/Region.selectors'

const mapDispatchToProps = {}

const mapStateToProps = (state): IDetailsOverlayComponent => {
  const props = {
    visibleTroutStreams: visibleTroutStreams(state),
    selectedState: selectedStateIdSelector(state),
    selectedRegion: selectedRegionIdSelector(state),
    selectedStream: selectedStreamObjectSelector(state),
    selectedAccessPoint: getSelectedRoadSelector(state),
    streamDictionary: troutStreamDictionarySelector(state),
  }
  return props
}

const DetailsOverlayContainer = connect(mapStateToProps, mapDispatchToProps)(
  DetailsOverlayComponent
)

export { DetailsOverlayContainer }
