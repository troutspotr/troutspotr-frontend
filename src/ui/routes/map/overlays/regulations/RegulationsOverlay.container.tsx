import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { IRegulationsOverlayStateProps, RegulationsOverlayComponent } from 'ui/routes/map/overlays/regulations/RegulationsOverlay.component'
import { selectedStreamRestrictions } from 'ui/routes/map/overlays/regulations/RegulationsOverlay.selectors'
const mapDispatchToProps = {}

export const restrictionPropsSelector = createStructuredSelector({
  restrictions: selectedStreamRestrictions,
})

const mapStateToProps = (state):IRegulationsOverlayStateProps => restrictionPropsSelector(state)

export const RegulationsOverlayContainer = connect(mapStateToProps, mapDispatchToProps)(RegulationsOverlayComponent)
