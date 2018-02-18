import { connect } from 'react-redux'
import StreamItemComponent from './StreamDetails.layout'
import { selectedStreamObjectSelector } from 'ui/routes/@usState/@region/Region.selectors'
const mapDispatchToProps = {}

const mapStateToProps = state => ({ selectedStream: selectedStreamObjectSelector(state) })

export default connect(mapStateToProps, mapDispatchToProps)(StreamItemComponent)
