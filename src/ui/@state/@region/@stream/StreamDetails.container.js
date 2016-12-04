import { connect } from 'react-redux'
import StreamItemComponent from './StreamDetails.layout'
import { selectedStreamObjectSelector, getSelectedRoadSelector } from 'ui/@state/@region/Region.selectors'
const mapDispatchToProps = {
}

const mapStateToProps = (state) => {
  return {
    selectedStream: selectedStreamObjectSelector(state)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(StreamItemComponent)
