import { connect } from 'react-redux'
import { locationSelector } from 'ui/Location.selectors'
import {
  setHoveredRoad,
  setHoveredStream,
  setSelectedRoad,
} from 'ui/routes/@usState/@region/Region.redux'
import {
  getSelectedRoadSelector,
  getSpecialRegulationsCurrentSeasonSelector,
  hoveredRoadSelector,
  hoveredStreamSelector,
} from 'ui/routes/@usState/@region/Region.selectors'
import DetailsComponent, {
  IDetailsComponentDispatchProps,
  IDetailsComponentStateProps,
} from './Details.component'
const mapDispatchToProps: IDetailsComponentDispatchProps = {
  setHoveredRoad: accessPoint => setHoveredRoad(accessPoint || null),
  setHoveredStream: stream => setHoveredStream(stream || null),
  setSelectedRoad: accessPoint => setSelectedRoad(accessPoint || null),
}
export interface IPassedDetailsProps {
  selectedStream: {}
}

const mapStateToProps = (state): IDetailsComponentStateProps => {
  const props = {
    specialRegulationsCurrentSeason: getSpecialRegulationsCurrentSeasonSelector(state),
    selectedAccessPoint: getSelectedRoadSelector(state),
    hoveredStream: hoveredStreamSelector(state),
    hoveredRoad: hoveredRoadSelector(state),
    location: locationSelector(state),
  }
  return props
}
export default connect<
  IDetailsComponentStateProps,
  IDetailsComponentDispatchProps,
  IPassedDetailsProps
>(mapStateToProps, mapDispatchToProps)(DetailsComponent)
