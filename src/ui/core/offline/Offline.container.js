import { connect } from 'react-redux'
import OfflineComponent from './OfflineListener.component'
import { isOfflineSelector, cachedEndpointsDictionarySelector } from './Offline.selectors'
import { setIsOffline } from './Offline.state'

const mapDispatchToProps = {
  setIsOffline: isOffline => setIsOffline(isOffline)
}

const mapStateToProps = (state) => {
  return {
    isOffline: isOfflineSelector(state),
    cachedEndpointsDictionary: cachedEndpointsDictionarySelector(state)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(OfflineComponent)
