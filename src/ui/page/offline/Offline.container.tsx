import { connect } from 'react-redux'
import { setIsOffline } from './Offline.redux'
import { cachedEndpointsDictionarySelector, isOfflineSelector } from './Offline.selectors'
import { OfflineListenerComponent } from './OfflineListener.component'

const mapDispatchToProps = { setIsOffline: isOffline => setIsOffline(isOffline) }

const mapStateToProps = state => ({
  isOffline: isOfflineSelector(state),
  cachedEndpointsDictionary: cachedEndpointsDictionarySelector(state),
})

export const OfflineContainer = connect(mapStateToProps, mapDispatchToProps)(
  OfflineListenerComponent
)
