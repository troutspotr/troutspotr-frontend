import { IReduxState } from 'ui/redux/Store.redux.rootReducer'
import {
  ISvgMinimapStateProps,
  SvgMinimapComponent,
  ISvgMinimapPassedProps,
  ISvgMinimapDispatchProps,
} from './SvgMinimap.component'
import { connect } from 'react-redux'
import { setIsExpanded, handleRegionSelection } from '../Minimap.redux'
import { getSvgMinimapStateProps } from './SvgMinimap.selectors'

const mapStateToProps = (reduxState: IReduxState): ISvgMinimapStateProps => {
  return getSvgMinimapStateProps(reduxState)
}

const mapDispatchToProps = (dispatch): ISvgMinimapDispatchProps => ({
  handleClose: () => dispatch(setIsExpanded(false)),
  handleOpen: () => dispatch(setIsExpanded(true)),
  handleSelection: (usStateShortName: string, regionPath: string) =>
    dispatch(
      handleRegionSelection({
        usStateShortName,
        regionPathName: regionPath,
      })
    ),
})

export const SvgMinimapContainer = connect<
  ISvgMinimapStateProps,
  ISvgMinimapDispatchProps,
  ISvgMinimapPassedProps
>(mapStateToProps, mapDispatchToProps)(SvgMinimapComponent)
