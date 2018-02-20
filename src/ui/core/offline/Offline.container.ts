import { connect } from 'react-redux'
import OfflineComponent from './OfflineListener.component'
import { cachedEndpointsDictionarySelector, isOfflineSelector } from './Offline.selectors'
import { setIsOffline } from './Offline.redux'

const mapDispatchToProps = { setIsOffline: isOffline => setIsOffline(isOffline) }

const mapStateToProps = state => ({
  isOffline: isOfflineSelector(state),
  cachedEndpointsDictionary: cachedEndpointsDictionarySelector(state),
})

export default connect(mapStateToProps, mapDispatchToProps)(OfflineComponent)
