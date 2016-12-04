import { connect } from 'react-redux'
import RingWaypointAccessPointComponent from './RingWaypoint.component.accessPoint'
import { 
  getSelectedRoadSelector,
  hoveredRoadSelector } from 'ui/@state/@region/Region.selectors'
import { setHoveredRoad, setSelectedRoad } from 'ui/@state/@region/Region.state'
const mapDispatchToProps = {
  setHoveredRoad: (accessPoint) => setHoveredRoad(accessPoint || null),
  setSelectedRoad: (accessPoint) => setSelectedRoad(accessPoint || null)
}

const mapStateToProps = (state) => {
  let props = {
    selectedAccessPoint: getSelectedRoadSelector(state),
    hoveredRoad: hoveredRoadSelector(state)
  }
  return props
}
export default connect(mapStateToProps, mapDispatchToProps)(RingWaypointAccessPointComponent)
