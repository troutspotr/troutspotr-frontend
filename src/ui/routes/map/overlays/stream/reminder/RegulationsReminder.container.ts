import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { IReduxState } from 'ui/redux/Store.redux.rootReducer';
import {
	streamRegulationsUrlSelector,
	selectedstateNameSelector,
} from 'ui/routes/map/overlays/stream/reminder/RegulationsReminder.selector';
import { ReminderComponent, IReminderComponent } from 'ui/core/regulations/reminder/Reminder.component';

const mapDispatchToProps = {}

export const headerStatePropsSelector = createStructuredSelector<IReduxState, IReminderComponent>({
  url: streamRegulationsUrlSelector,
  stateName: selectedstateNameSelector,
})

export const mapStateToSteamDetailsProps = (reduxState: IReduxState) => headerStatePropsSelector(reduxState)

export const RegulationsReminderContainer = connect(mapStateToSteamDetailsProps, mapDispatchToProps)(ReminderComponent)
