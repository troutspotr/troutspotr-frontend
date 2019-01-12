import { getApi } from 'api/Api.module'
import { handleActions, createAction } from 'redux-actions'
import { isBot } from 'ui/core/Core.redux'

export const HAS_AGREED_TO_TERMS = 'HAS_AGREED_TO_TERMS'
export const SET_AGREEMENT_STATE = 'SET_AGREEMENT_STATE'

const getHasAgreedToTerms = (): boolean => {
  if (isBot()) {
    return true
  }
  if (localStorage == null) {
    return false
  }
  const hasAggredInStorage = localStorage.getItem(HAS_AGREED_TO_TERMS)
  const hasAgreed = hasAggredInStorage != null && hasAggredInStorage.toString() === 'true'
  return hasAgreed
}

export const setAgreementState = createAction(SET_AGREEMENT_STATE, (view: string, time: Date) => {
  return { view, time }
})

const lookup = {
  'intro': '/legal/terms-of-service',
  'termsOfService': '/legal/privacy-policy',
  'privacyPolicy': '/legal/thank-you',
}
export const setAgrementStateAndNavigate = (view, date) => (dispatch) => {
  dispatch(setAgreementState(view, date))
  const nextUrl = lookup[view]
  if (nextUrl == null) {
    throw new Error('nope')
  }

  // browserHistory.push(nextUrl)
}

// intro
// termsOfService
// privacyPolicy
export const setHasSeenIntroScreen = () => setAgrementStateAndNavigate('intro', new Date())
export const setHasSeenTermsOfService = () => setAgrementStateAndNavigate('termsOfService', new Date())
export const setHasSeenPrivacyPolicy = () => setAgrementStateAndNavigate('privacyPolicy', new Date())

export const setHasAgreedToAllTermsInRedux = createAction(HAS_AGREED_TO_TERMS, () => {
  return { hasAgreed: true }
})

export const setHasAgreedToAllTerms = () => (dispatcher) => {
  dispatcher(setHasAgreedToAllTermsInRedux())
  // browserHistory.push('/')
}

export interface ILegalState {
  hasAgreedToTerms: boolean
  hasSeenIntroScreen: boolean
  hasSeenTermsOfService: boolean
  hasSeenPrivacyPolicy: boolean
}
const INITIAL_CORE_STATE: ILegalState = {
  hasSeenIntroScreen: false,
  hasSeenTermsOfService: false,
  hasSeenPrivacyPolicy: false,
  hasAgreedToTerms: getHasAgreedToTerms(),
}

export const ACTION_HANDLERS: {} = {
  [HAS_AGREED_TO_TERMS]: (state: ILegalState, { payload }): ILegalState => {
    if (localStorage != null && localStorage.setItem != null) {
      try {
        localStorage.setItem(HAS_AGREED_TO_TERMS, (payload != null && payload.hasAgreed === true).toString())
      } catch (e) {
        console.error('could not store token; perhaps private mode?') // eslint-disable-line
      }
    }

    const newState = {
      ...state,
      ...{
        hasAgreedToTerms: payload.hasAgreed === true,
        hasSeenIntroScreen: true,
        hasSeenPrivacyPolicy: true,
        hasSeenTermsOfService: true,
      }
    }
    return newState
  },
  [SET_AGREEMENT_STATE]: (state: ILegalState, { payload }): ILegalState => {
    const { view, time } = payload
    if (view == null || time == null) {
      throw new Error('view and time cannot be null')
    }

    if (view === 'intro') {
      const newState = { ...state, ...{ hasSeenIntroScreen: true } }
      try {
        
        getApi().then(({ AnonymousAnalyzerApi }) => {
          AnonymousAnalyzerApi.recordEvent('agreement_update', { view: view, timeEllapsed: time })
        })
      } catch (error) { console.error(error) }

      return newState
    } else if (view === 'termsOfService') {
      const newState = { ...state, ...{ hasSeenTermsOfService: true } }

      try {
        getApi().then(({ AnonymousAnalyzerApi }) => {
          AnonymousAnalyzerApi.recordEvent('agreement_update', { view: view, timeEllapsed: time })
        })
      } catch (error) { console.error(error) }
      return newState
    } else if (view === 'privacyPolicy') {
      const newState = { ...state, ...{ hasSeenPrivacyPolicy: true } }
      try {
        getApi().then(({ AnonymousAnalyzerApi }) => {
          AnonymousAnalyzerApi.recordEvent('agreement_update', { view: view, timeEllapsed: time })
        })
      } catch (error) {
        console.error(error)
      }
      return newState
    }
    return { ...state }
  },
}

export default handleActions(ACTION_HANDLERS, INITIAL_CORE_STATE)
