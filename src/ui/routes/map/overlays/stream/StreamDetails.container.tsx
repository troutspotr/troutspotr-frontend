import { connect } from 'react-redux'
import { IReduxState } from 'ui/redux/Store.redux.rootReducer';
import { StreamDetailsPropsSelector } from './StreamDetails.selectors';
import { StreamDetailsComponent } from './StreamDetails.component';

const mapDispatchToProps = {}

export const mapStateToSteamDetailsProps = (reduxState: IReduxState) => StreamDetailsPropsSelector(reduxState)

export const StreamDetailsContainer = connect(mapStateToSteamDetailsProps, mapDispatchToProps)(StreamDetailsComponent)

