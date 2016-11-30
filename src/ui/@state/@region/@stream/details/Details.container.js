import { connect } from 'react-redux'
import DetailsComponent from './Details.component'
import { getSpecialRegulationsCurrentSeasonSelector } from 'ui/@state/@region/Region.selectors'
const mapDispatchToProps = {
}

const mapStateToProps = (state) => {
  return {
    specialRegulationsCurrentSeason: getSpecialRegulationsCurrentSeasonSelector(state)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DetailsComponent)
