import { connect } from 'react-redux'
import SearchComponent from './Search.component'
import { updateSearchText } from 'ui/core/Core.state'
import { searchTextSelector } from 'ui/core/Core.selectors'
const mapDispatchToProps = {
  updateSearchText: (text) => updateSearchText(text)
}

const mapStateToProps = (state) => {
  return {
    searchText: searchTextSelector(state)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchComponent)
