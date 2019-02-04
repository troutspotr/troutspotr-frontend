import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import {
  getSelectedRoadSelector,
  selectedStreamObjectSelector,
  visibleTroutStreams,
  regionLoadingStatusSelector,
} from 'ui/routes/@usState/@region/Region.selectors'
import { DetailsOverlayComponent, IDetailsOverlayComponent } from './DetailsOverlay.component'
import { selectedStateIdSelector } from 'ui/Location.selectors'

const mapDispatchToProps = {}

export const detailsOverlayPropSelector = createStructuredSelector({
  visibleTroutStreams: visibleTroutStreams,
  selectedState: selectedStateIdSelector,
  selectedStream: selectedStreamObjectSelector,
  selectedAccessPoint: getSelectedRoadSelector,
  loadingStatus: regionLoadingStatusSelector,
})

const mapStateToProps = (state): IDetailsOverlayComponent => detailsOverlayPropSelector(state)

export const DetailsOverlayContainer = connect(mapStateToProps, mapDispatchToProps)(DetailsOverlayComponent)
