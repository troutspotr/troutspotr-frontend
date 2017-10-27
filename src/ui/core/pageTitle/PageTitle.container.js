import {connect} from 'react-redux'
import PageTitle from './PageTitle.component'
import { getPageTitleSelector } from './PageTitle.selectors'

const mapDispatchToProps = {

}

const mapStateToProps = (state) => ({
  pageTitle: getPageTitleSelector(state),
})

export default connect(mapStateToProps, mapDispatchToProps)(PageTitle)
