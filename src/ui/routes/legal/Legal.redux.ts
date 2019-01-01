import { getApi } from 'api/Api.module'
import { handleActions } from 'redux-actions'
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

  return localStorage.getItem(HAS_AGREED_TO_TERMS) === 'true'
}

export interface ICoreState {
  hasAgreedToTerms: boolean
  hasSeenIntroScreen: boolean
  hasSeenTermsOfService: boolean
  hasSeenPrivacyPolicy: boolean
}
const INITIAL_CORE_STATE: ICoreState = {
  hasSeenIntroScreen: false,
  hasSeenTermsOfService: false,
  hasSeenPrivacyPolicy: false,
  hasAgreedToTerms: getHasAgreedToTerms(),
}

export const ACTION_HANDLERS: {} = {
  [HAS_AGREED_TO_TERMS]: (state: ICoreState, { payload }): ICoreState => {
    if (localStorage != null && localStorage.setItem != null) {
      try {
        localStorage.setItem(HAS_AGREED_TO_TERMS, payload)
      } catch (e) {
        console.error('could not store token; perhaps private mode?') // eslint-disable-line
      }
    }

    const newState = { ...state, ...{ hasAgreedToTerms: payload === 'true' } }
    return newState
  },
  [SET_AGREEMENT_STATE]: (state: ICoreState, { payload }): ICoreState => {
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
