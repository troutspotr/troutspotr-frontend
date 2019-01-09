import { connect } from 'react-redux'
import {
  ThankYouComponent,
  IThankYouComponentProps
} from 'ui/routes/legal/thank-you/ThankYou.component'
import { setHasAgreedToAllTerms } from 'ui/routes/legal/Legal.redux'
import { createStructuredSelector } from 'reselect'
import { IReduxState } from 'ui/redux/Store.redux.rootReducer'
const mapDispatchToProps: IThankYouComponentProps = {
  advance: () => setHasAgreedToAllTerms(),
}

export const restrictionPropsSelector = createStructuredSelector({
})

const mapStateToProps = (state: IReduxState): any => restrictionPropsSelector(state)

export const ThankYouContainer = connect(mapStateToProps, mapDispatchToProps)(ThankYouComponent)
