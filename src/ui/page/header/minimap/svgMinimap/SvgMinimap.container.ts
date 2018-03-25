import { IReduxState } from 'ui/redux/Store.redux.rootReducer'
import {
  ISvgMinimapStateProps,
  SvgMinimapComponent,
  ISvgMinimapPassedProps,
  ISvgMinimapDispatchProps,
} from './SvgMinimap.component'
import { connect } from 'react-redux'
import { setIsExpanded } from '../Minimap.redux'
import { getSvgMinimapStateProps } from './SvgMinimap.selectors'
import { setSelectedMinimapGeometry } from '../../../../core/Core.redux'

const mapStateToProps = (reduxState: IReduxState): ISvgMinimapStateProps => {
  return getSvgMinimapStateProps(reduxState)
}

const mapDispatchToProps = (dispatch): ISvgMinimapDispatchProps => ({
  handleClose: () => dispatch(setIsExpanded(false)),
  handleSelection: (usStateShortName: string, regionPath: string) =>
    dispatch(
      setSelectedMinimapGeometry({
        usStateShortName: usStateShortName,
        regionPathName: regionPath,
      })
    ),
})

export const SvgMinimapContainer = connect<
  ISvgMinimapStateProps,
  ISvgMinimapDispatchProps,
  ISvgMinimapPassedProps
>(mapStateToProps, mapDispatchToProps)(SvgMinimapComponent)