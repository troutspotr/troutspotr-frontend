import * as colors from './Colors'
import { STREAM_ACTIVE_LAYER_ID, STREAM_QUITE_LAYER_ID } from '../filters/Filters.selectors'
import { STREAMS_SOURCE_ID } from '../sources/Source.selectors'
export const StreamActiveStyle = {
  'id': STREAM_ACTIVE_LAYER_ID,
  'type': 'line',
  'source': STREAMS_SOURCE_ID,
  'interactive': true,
  'layout': {
    'visibility': 'visible',
    'line-cap': 'round',
    'line-join': 'round'
  },
  'paint': {
    'line-color': colors.StreamGray,
    'line-width': 1
  }
}
export const StreamQuietStyle = {
  'id': STREAM_QUITE_LAYER_ID,
  'type': 'line',
  'source': STREAMS_SOURCE_ID,
  'interactive': true,
  'layout': {
    'visibility': 'visible',
    'line-cap': 'round',
    'line-join': 'round'
  },
  'paint': {
    'line-color': colors.StreamGray,
    'line-width': 1
  }
}
