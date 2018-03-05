import { connect } from 'react-redux'
import { SearchComponent } from './Search.component'
import { updateSearchText } from 'ui/core/Core.redux'
import { searchTextSelector } from 'ui/core/Core.selectors'
const mapDispatchToProps = { updateSearchText: text => updateSearchText(text) }

const mapStateToProps = state => ({ searchText: searchTextSelector(state) })

export default connect(mapStateToProps, mapDispatchToProps)(SearchComponent)
