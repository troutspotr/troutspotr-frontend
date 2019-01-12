import { connect } from 'react-redux'
import {
  TermsOfServiceComponent,
  ITermsOfServiceProps
} from 'ui/routes/legal/terms-of-service/TermsOfService.component'
import { setHasSeenTermsOfService } from 'ui/routes/legal/Legal.redux'
import { createStructuredSelector } from 'reselect'
import { IReduxState } from 'ui/redux/Store.redux.rootReducer'
const mapDispatchToProps: ITermsOfServiceProps = {
  advance: () => setHasSeenTermsOfService(),
}

export const restrictionPropsSelector = createStructuredSelector({
})

const mapStateToProps = (state: IReduxState): any => restrictionPropsSelector(state)

export const TermsOfServiceContainer = connect(mapStateToProps, mapDispatchToProps)(TermsOfServiceComponent)
