import { connect } from 'react-redux'
import { RegionLayout, IRegionLayoutDispatchProps, IRegionLayoutStateProps } from './Region.layout'
import { fetchRegionData } from './Region.redux'
import { getSvgMinimapStateProps } from './Region.selectors'
import { IReduxState } from 'ui/redux/Store.redux.rootReducer'

const mapDispatchToProps: IRegionLayoutDispatchProps = {
  fetchRegionData: (stateId: string, regionId: string) => fetchRegionData(stateId, regionId),
}

const mapStateToProps = (state: IReduxState): IRegionLayoutStateProps => {
  const props = getSvgMinimapStateProps(state)
  return props
}

export default connect(mapStateToProps, mapDispatchToProps)(RegionLayout)
