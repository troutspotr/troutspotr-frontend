import { connect } from 'react-redux'
import {
  PrivacyPolicyComponent,
  IPrivacyPolicyProps
} from 'ui/routes/legal/privacy-policy/PrivacyPolicy.component'
import { setHasSeenPrivacyPolicy } from 'ui/routes/legal/Legal.redux'
import { createStructuredSelector } from 'reselect'
import { IReduxState } from 'ui/redux/Store.redux.rootReducer'
const mapDispatchToProps: IPrivacyPolicyProps = {
  advance: () => setHasSeenPrivacyPolicy(),
}

export const restrictionPropsSelector = createStructuredSelector({
})

const mapStateToProps = (state: IReduxState): any => restrictionPropsSelector(state)

export const PrivacyPolicyContainer = connect(mapStateToProps, mapDispatchToProps)(PrivacyPolicyComponent)
