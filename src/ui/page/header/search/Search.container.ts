import { connect } from 'react-redux'
import { updateSearchText } from 'ui/core/Core.redux'
import { searchTextSelector } from 'ui/core/Core.selectors'
import { SearchComponent } from './Search.component'
const mapDispatchToProps = { updateSearchText: text => updateSearchText(text) }

const mapStateToProps = state => ({ searchText: searchTextSelector(state) })

export default connect(mapStateToProps, mapDispatchToProps)(SearchComponent)
