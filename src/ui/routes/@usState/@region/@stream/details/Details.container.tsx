import { connect } from 'react-redux'
import DetailsComponent from './Details.component'
import {
  getSelectedRoadSelector,
  getSpecialRegulationsCurrentSeasonSelector,
  hoveredRoadSelector,
  hoveredStreamSelector,
} from 'ui/routes/@usState/@region/Region.selectors'
import { locationSelector } from 'ui/Location.selectors'
import {
  setHoveredRoad,
  setHoveredStream,
  setSelectedRoad,
} from 'ui/routes/@usState/@region/Region.redux'
const mapDispatchToProps = {
  setHoveredRoad: accessPoint => setHoveredRoad(accessPoint || null),
  setHoveredStream: stream => setHoveredStream(stream || null),
  setSelectedRoad: accessPoint => setSelectedRoad(accessPoint || null),
}
export interface IPassedDetailsProps {
  selectedStream: any
}
const mapStateToProps = state => {
  const props = {
    specialRegulationsCurrentSeason: getSpecialRegulationsCurrentSeasonSelector(state),
    selectedAccessPoint: getSelectedRoadSelector(state),
    hoveredStream: hoveredStreamSelector(state),
    hoveredRoad: hoveredRoadSelector(state),
    location: locationSelector(state),
  }
  return props
}
export default connect<{}, {}, IPassedDetailsProps>(mapStateToProps, mapDispatchToProps)(
  DetailsComponent as any
)
