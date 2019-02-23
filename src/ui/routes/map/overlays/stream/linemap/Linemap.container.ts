import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { IReduxState } from 'ui/redux/Store.redux.rootReducer';
import { ILineMapComponentStateProps, LineMapComponentCanvas, ILineMapComponentPassedProps } from 'ui/core/linemap/Linemap.component'
import { selectedStreamObjectSelector } from 'ui/routes/@usState/@region/Region.selectors'
import { linemapSettingsSelector, offsetSelector } from './Linemap.selectors'
import { handleOffsetChange, handleStreamSelect } from './Linemap.redux'

const mapDispatchToProps: ILineMapComponentPassedProps = {
  onLineOffsetChange: handleOffsetChange,
  onAccessPointSelect: handleStreamSelect,
}

export const lineProps = createStructuredSelector<IReduxState, ILineMapComponentStateProps>({
  lineOffsetLength: offsetSelector,
  id: () => '123',
  settings: linemapSettingsSelector,
  streamObject: selectedStreamObjectSelector,
})

export const mapStateToSteamDetailsProps = (reduxState: IReduxState) => lineProps(reduxState)

export const LinemapContainer = connect(mapStateToSteamDetailsProps, mapDispatchToProps)(LineMapComponentCanvas)
