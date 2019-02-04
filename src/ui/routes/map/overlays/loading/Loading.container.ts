import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import { LoadingComponent, ILoadingProps } from 'ui/core/loading/Loading.component';
import { loadingMessageTitleSelector } from 'ui/routes/map/overlays/loading/Loading.selectors';

const mapDispatchToProps = {}

export const detailsOverlayPropSelector = createStructuredSelector({
  title: loadingMessageTitleSelector,
})

const mapStateToProps = (state): ILoadingProps => detailsOverlayPropSelector(state)

export const LoadingContainer = connect(mapStateToProps, mapDispatchToProps)(LoadingComponent)
