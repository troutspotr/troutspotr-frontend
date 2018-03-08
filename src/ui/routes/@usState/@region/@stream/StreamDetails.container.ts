import { connect } from 'react-redux'
import { selectedStreamObjectSelector } from 'ui/routes/@usState/@region/Region.selectors'
import StreamItemComponent from './StreamDetails.layout'
const mapDispatchToProps = {}

const mapStateToProps = state => ({ selectedStream: selectedStreamObjectSelector(state) })

export default connect(mapStateToProps, mapDispatchToProps)(StreamItemComponent)
