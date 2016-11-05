import {
  REGION_PARAM_NAME,
  STATE_PARAM_NAME,
  STREAM_PARAM_NAME
} from 'ui/core/RouteConstants.js'

// will swap
export const swapView = (params, view) => {
  let selectedRegion = params[REGION_PARAM_NAME]
  let selectedState = params[STATE_PARAM_NAME]
  let selectedStreamId = params[STREAM_PARAM_NAME]

  let rootUrl = `/${selectedState}/${selectedRegion}/${view}`

  if (selectedStreamId == null) {
    return rootUrl
  }

  let urlWithStreamId = `${rootUrl}/${selectedStreamId}`
  return urlWithStreamId
}

const REGION_INDEX = 2
export const swapRegion = (location, newRegion) => {
  if (location == null) {

  }

  let tokens = location.split('/')
  tokens[REGION_INDEX] = newRegion
  let newUrl = `${tokens.join('/')}`
  return newUrl
}
