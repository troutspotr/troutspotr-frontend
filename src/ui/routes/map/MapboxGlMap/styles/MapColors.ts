import { IColorSettings } from 'ui/core/micromap/Micromap.settings'
const colors = require('./MapColors.scss')
export interface IMapColors extends IColorSettings {
  waterFill: string
  waterOutline: string
  primaryRoadFill: string
  primaryRoadBorder: string
  secondaryRoadFill: string
  secondaryRoadBorder: string
  buildingFill: string
  primaryLabelBackground: string
  secondaryLabelBackground: string
  admin0BorderColor: string
  admin1BorderColor: string

  restrictionRed: string
  restrictionWhite: string
  restrictionBlue: string

  accessPointBorderColor: string
  accessPointLabelColor: string

  gpsCenterColor: string
  gpsBorderColor: string

  contourColor: string
}

const getColorPallete = (suffix: string): IMapColors => {
  const item = {
    backgroundFill: colors[`backgroundfill${suffix}`],
    waterFill: colors[`waterfill${suffix}`],
    waterOutline: colors[`wateroutline${suffix}`],
    primaryRoadFill: colors[`primaryroadfill${suffix}`],
    primaryRoadBorder: colors[`primaryroadborder${suffix}`],
    secondaryRoadFill: colors[`secondaryroadfill${suffix}`],
    secondaryRoadBorder: colors[`secondaryroadborder${suffix}`],
    buildingFill: colors[`buildingfill${suffix}`],
    primaryLabelFill: colors[`primarylabelfill${suffix}`],
    primaryLabelBackground: colors[`primarylabelbackground${suffix}`],
    secondaryLabelFill: colors[`secondarylabelfill${suffix}`],
    secondaryLabelBackground: colors[`secondarylabelbackground${suffix}`],
    admin0BorderColor: colors[`admin0bordercolor${suffix}`],
    admin1BorderColor: colors[`admin1bordercolor${suffix}`],

    streamFill: colors[`stream${suffix}`],
    troutSectionFill: colors[`troutstreamsection${suffix}`],
    palSectionFill: colors[`palsection${suffix}`],
    filteredStreamFill: colors[`stream-filtered${suffix}`],

    restrictionYellow: colors[`restrictionyellow${suffix}`],
    restrictionRed: colors[`restrictionred${suffix}`],
    restrictionWhite: colors[`restrictionwhite${suffix}`],
    restrictionBlue: colors[`restrictionblue${suffix}`],

    accessPointBorderColor: colors.black,
    accessPointLabelColor: colors.black,

    gpsCenterColor: colors[`restrictionred${suffix}`],
    gpsBorderColor: colors[`gpsborder${suffix}`],
    petriDish: colors[`buildingfill${suffix}`],
    backdropFill: 'black',
    contourColor: colors[`contourColor${suffix}`],
  }
  
  return item
}

export const LightMapColors: IMapColors = getColorPallete('-light')
export const DarkMapColors: IMapColors = getColorPallete('-dark')
