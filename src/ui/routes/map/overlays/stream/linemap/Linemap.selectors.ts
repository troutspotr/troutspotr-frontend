import { createSelector } from 'reselect'
import {
  IMicromapCanvasSettings,
} from 'ui/core/micromap/Micromap.settings'
import { IReduxState } from 'ui/redux/Store.redux.rootReducer';

const settings: IMicromapCanvasSettings = {
  "dimensions": {
    "width": 300,
    "height": 32
  },
  "settings": {
    "arcCompressionRatio": 0.5235987755982988,
    "rotationPhase": 1.5707963267948966,
    "stream": {
      "radius": 135,
      "streamWidth": 1.16,
      "troutSectionWidth": 2.14,
      "publicSectionWidth": 3.21,
      "specialRegulationsWidth": 1.3,
      "terminusDiameter": 1,
      "backdropWidth": 1.63
    },
    "circle": {
      "radius": 30,
      "streamWidth": 1.16,
      "troutSectionWidth": 2.14,
      "publicSectionWidth": 3.21,
      "specialRegulationsWidth": 1.3,
      "terminusDiameter": 1,
      "backdropWidth": 1.63
    },
    "accessPoints": {
      "radius": 7,
      "permissionRequiredDiameter": 6.5,
      "publiclyFishableDiameter": 6.5,
      "backdropWidth": 1
    }
  },
  "colors": {
    "backgroundFill": "#121212",
    "streamFill": "#435760",
    "troutSectionFill": "#57b5e0",
    "restrictionYellow": "#fbcd13",
    "palSectionFill": "#bce90c",
    "primaryLabelFill": "white",
    "secondaryLabelFill": "#bcbcbc",
    "petriDish": "#212121",
    "backdropFill": "black",
    "filteredStreamFill": "green"
  }
}

export const offsetSelector = (state: IReduxState) => state.region.offset
export const linemapSettingsSelector = (): IMicromapCanvasSettings => settings
