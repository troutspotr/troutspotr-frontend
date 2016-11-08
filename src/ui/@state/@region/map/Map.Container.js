import { connect } from 'react-redux'
import MapComponent from './Map.component'
import { loadMapModuleAsync } from 'ui/core/MapboxModule.state'
import { mapboxModuleSelector, isMapboxModuleLoadedSelector } from 'ui/core/MapboxModule.selectors'

const mapDispatchToProps = {
  loadMapModuleAsync: () => loadMapModuleAsync()
}

const mapStateToProps = (state) => {
  let props = {
    mapboxModule: mapboxModuleSelector(state),
    mapboxModuleStatus: isMapboxModuleLoadedSelector(state)
  }
  return props
}

export default connect(mapStateToProps, mapDispatchToProps)(MapComponent)
