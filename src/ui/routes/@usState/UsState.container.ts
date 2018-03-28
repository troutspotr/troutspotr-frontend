import { connect } from 'react-redux'
import {
  UsStateComponent,
  IUsStateComponentDispatchProps,
  IUsStateComponentStateProps,
  IUsStateComponentPassedProps,
} from './UsState.component'
import { IReduxState } from 'ui/redux/Store.redux.rootReducer'
import { fetchStateData } from './UsState.redux'
import { usStatePropertiesSelector } from './UsState.selectors'
export const mapDispatchToProps: IUsStateComponentDispatchProps = {
  fetchStateData: (selectedState: string) => fetchStateData(selectedState),
}

export const mapStateToProps = (reduxState: IReduxState): IUsStateComponentStateProps =>
  usStatePropertiesSelector(reduxState)

export default connect<
  IUsStateComponentStateProps,
  IUsStateComponentDispatchProps,
  IUsStateComponentPassedProps
>(mapStateToProps, mapDispatchToProps)(UsStateComponent)
