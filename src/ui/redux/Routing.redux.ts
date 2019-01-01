import { routeParamsReducer, UPDATE_LOCATION_WITH_PARAMS } from 'react-router-redux-params'

export interface ILocation {
  pathname: string
  search: string
  hash: string
  action: string
  key: string
  query: {}
}
export interface IRoutingState {
  location: ILocation
  params: {}
  previousRouting: {
    location: ILocation
    params: {}
  }
}
export const INITIAL_ROUTING_STATE: IRoutingState = {
  location: undefined,
  params: {},
  previousRouting: {
    location: undefined,
    params: {},
  },
}

// This function rides on the coat-tails of `react-router-redux-params`
// to add `previousRouting` history to redux.
// This, in conjuction with `*isLoading` propertis in redux stores,
// allows us to determine what should and should not yet be displayed.
// tslint:disable-next-line: cognitive-complexity
export function routingWithHistoryReducer(reduxState, action) {
  // this line was pretty much copied over from `routeParamsReducer`
  const previousState =
    arguments.length > 0 && reduxState !== undefined ? reduxState : INITIAL_ROUTING_STATE
  if (action == null || action.type !== UPDATE_LOCATION_WITH_PARAMS) {
    // if this isn't about us, just return the state.
    return previousState
  }

  const nextState = routeParamsReducer(reduxState, action)
  nextState.previousRouting = {
    location: previousState.location || null,
    params: previousState.params || null,
  }

  return nextState
}
