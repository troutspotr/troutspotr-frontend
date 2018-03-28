import { connect } from 'react-redux'
import {
  SwitchComponent,
  ISwitchComponentStateProps,
  ISwitchDispatchProps,
} from '../switch/Switch.component'
import { IReduxState } from 'ui/redux/Store.redux.rootReducer'
import { themePropsSelector } from './Theme.selectors'
import { Theme, setTheme } from 'ui/core/Core.redux'

export const mapStateToProps = (reduxState: IReduxState): ISwitchComponentStateProps => {
  return themePropsSelector(reduxState)
}

const mapDispatchToProps = (dispatch): ISwitchDispatchProps => ({
  startTracking: () => dispatch(setTheme(Theme.light)),
  stopTracking: () => dispatch(setTheme(Theme.dark)),
})

export const ThemeContainer = connect(mapStateToProps, mapDispatchToProps)(SwitchComponent)
