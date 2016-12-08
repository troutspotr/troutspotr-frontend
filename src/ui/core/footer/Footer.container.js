import { connect } from 'react-redux'
import FooterComponent from './Footer.component'
import { setViewToMap, setViewToList } from '../Core.state'
import { viewSelector } from '../Core.selectors'
import { selectedStreamObjectSelector } from 'ui/@state/@region/Region.selectors'
const mapDispatchToProps = {
  setViewToMap,
  setViewToList
}

const mapStateToProps = (state) => {
  return {
    view: viewSelector(state),
    selectedStream: selectedStreamObjectSelector(state)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FooterComponent)
