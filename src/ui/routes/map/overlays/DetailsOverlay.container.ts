import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import {
  getSelectedRoadSelector,
  selectedStreamObjectSelector,
  troutStreamDictionarySelector,
  visibleTroutStreams,
} from 'ui/routes/@usState/@region/Region.selectors'
import { DetailsOverlayComponent, IDetailsOverlayComponent } from './DetailsOverlay.component'
import { selectedStateIdSelector, selectedRegionIdSelector } from 'ui/Location.selectors'

const mapDispatchToProps = {}

export const detailsOverlayPropSelector = createStructuredSelector({
  visibleTroutStreams: visibleTroutStreams,
  selectedState: selectedStateIdSelector,
  selectedRegion: selectedRegionIdSelector,
  selectedStream: selectedStreamObjectSelector,
  selectedAccessPoint: getSelectedRoadSelector,
  streamDictionary: troutStreamDictionarySelector,
})

const mapStateToProps = (state): IDetailsOverlayComponent => detailsOverlayPropSelector(state)

export const DetailsOverlayContainer = connect(mapStateToProps, mapDispatchToProps)(DetailsOverlayComponent)
