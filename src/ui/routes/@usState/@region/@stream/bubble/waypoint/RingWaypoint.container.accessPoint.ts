import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { locationSelector } from 'ui/Location.selectors'
import { setHoveredRoad, setSelectedRoad } from 'ui/routes/@usState/@region/Region.redux'
import {
  getSelectedRoadSelector,
  hoveredRoadSelector,
} from 'ui/routes/@usState/@region/Region.selectors'
import { roadTypeDictionarySelector } from 'ui/routes/@usState/UsState.selectors'
import { RingWaypointAccessPointComponent } from './RingWaypoint.component.accessPoint'
const mapDispatchToProps = {
  setHoveredRoad: accessPoint => setHoveredRoad(accessPoint || null),
  setSelectedRoad: accessPoint => setSelectedRoad(accessPoint || null),
}

const mapStateToProps = state => {
  const props = {
    selectedAccessPoint: getSelectedRoadSelector(state),
    hoveredRoad: hoveredRoadSelector(state),
    location: locationSelector(state),
    roadTypesDictionary: roadTypeDictionarySelector(state),
  }
  return props
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(
  RingWaypointAccessPointComponent
) as {})
