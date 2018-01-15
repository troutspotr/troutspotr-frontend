import {connect} from 'react-redux'
import {withRouter} from 'react-router'
import RingWaypointAccessPointComponent from './RingWaypoint.component.accessPoint'
import {locationSelector} from 'ui/Location.selectors'
import {
  getSelectedRoadSelector,
  hoveredRoadSelector} from 'ui/@state/@region/Region.selectors'
import {setHoveredRoad, setSelectedRoad} from 'ui/@state/@region/Region.state'
import {roadTypeDictionarySelector} from 'ui/@state/State.selectors'
const mapDispatchToProps = {
  'setHoveredRoad': (accessPoint) => setHoveredRoad(accessPoint || null),
  'setSelectedRoad': (accessPoint) => setSelectedRoad(accessPoint || null),
}

const mapStateToProps = (state) => {
  const props = {
    'selectedAccessPoint': getSelectedRoadSelector(state),
    'hoveredRoad': hoveredRoadSelector(state),
    'location': locationSelector(state),
    'roadTypesDictionary': roadTypeDictionarySelector(state),
  }
  return props
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(RingWaypointAccessPointComponent))
