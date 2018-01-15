const colors = require('ui/styles/_colors.scss')
import {
  TROUT_SECTIONS_ACTIVE_LAYER_ID,
  TROUT_SECTIONS_QUITE_LAYER_ID,
} from '../filters/Filters.selectors'
import { TROUT_STREAM_SECTIONS_SOURCE_ID } from '../sources/Source.selectors'
export const TroutSectionActiveStyle = {
  id: TROUT_SECTIONS_ACTIVE_LAYER_ID,
  type: 'line',
  source: TROUT_STREAM_SECTIONS_SOURCE_ID,
  interactive: false,
  layout: {
    visibility: 'visible',
    'line-join': 'round',
    'line-cap': 'round',
  },
  paint: {
    'line-color': colors.StreamBlue,
    'line-width': {
      base: 1.5,
      stops: [[8.5, 1], [10, 1.25], [16.5, 16], [18.0, 7]],
    },
  },
}

export const TroutSectionQuietStyle = {
  id: TROUT_SECTIONS_QUITE_LAYER_ID,
  type: 'line',
  source: TROUT_STREAM_SECTIONS_SOURCE_ID,
  interactive: false,
  layout: {
    visibility: 'visible',
    'line-join': 'round',
    'line-cap': 'round',
  },
  paint: {
    'line-color': colors.StreamGray,
    'line-width': {
      base: 1.5,
      stops: [[8.5, 1], [10, 1.25], [16.5, 22], [18.0, 15]],
    },
  },
}
