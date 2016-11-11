import { connect } from 'react-redux'
import FooterComponent from './Footer.component'
import { setViewToMap, setViewToList } from '../Core.state'
import { viewSelector } from '../Core.selectors'
const mapDispatchToProps = {
  setViewToMap,
  setViewToList
}

const mapStateToProps = (state) => {
  return {
    view: viewSelector(state)
    // subtitle: subtitleSelector(state),
    // title: titleSelector(state),
    // isTitleVisible: isTitleVisibleSelector(state),
    // isSearchVisible: isSearchVisibleSelector(state)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FooterComponent)
