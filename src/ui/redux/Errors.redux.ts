import { createAction, handleActions } from 'redux-actions'

export interface IErrorsState {
  errorsLog: any[]
}

export const INITIAL_ERRORS_STATE: IErrorsState = {
  errorsLog: [],
}

const ERRORS_ON_ERROR = 'ERRORS_ON_ERROR'

export const addError = createAction(ERRORS_ON_ERROR, ({ error }) => {
  return { error: error || '' }
})

const ERRORS_REDUCER: {
  [name: string]: (state: IErrorsState, action: any) => IErrorsState
} = {
  [ERRORS_ON_ERROR]: (state: IErrorsState, { payload }): IErrorsState => {
    const newErrorLog = [
      ...(state.errorsLog || []),
      {
        error: payload.error.toString(),
        timestamp: new Date(),
      },
    ]
    return {
      ...state,
      errorsLog: newErrorLog,
    }
  },
}

export default handleActions(ERRORS_REDUCER, INITIAL_ERRORS_STATE)
