import { connect } from 'react-redux'
import { LegalIntroComponent, ILegalIntroComponentProps, ILegalIntroStateProps, ILegalIntroDispatchProps } from 'ui/routes/legal/LegalIntro.component'
import { ILegalState, setHasSeenIntroScreen } from 'ui/routes/legal/Legal.redux'
import { hasSeenIntroScreenStateSelector } from 'ui/routes/legal/Legal.selectors'
import { createStructuredSelector } from 'reselect'
import { IReduxState } from 'ui/redux/Store.redux.rootReducer'
const mapDispatchToProps: ILegalIntroDispatchProps = {
  advance: () => setHasSeenIntroScreen(),
}

export const restrictionPropsSelector = createStructuredSelector({
  foo: hasSeenIntroScreenStateSelector,
})

const mapStateToProps = (state: IReduxState): ILegalIntroStateProps => restrictionPropsSelector(state)

export const LegalIntroContainer = connect(mapStateToProps, mapDispatchToProps)(LegalIntroComponent)
