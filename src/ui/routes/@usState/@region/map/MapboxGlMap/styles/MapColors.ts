const colors = require('./MapColors.scss')
export interface IMapColors {
  backgroundFill: string
  waterFill: string
  primaryRoadFill: string
  primaryRoadBorder: string
  secondaryRoadFill: string
  secondaryRoadBorder: string
  buildingFill: string
  primaryLabelFill: string
  primaryLabelBackground: string
  secondaryLabelFill: string
  secondaryLabelBackground: string
  admin0BorderColor: string
  admin1BorderColor: string
}

const getColorPallete = (suffix: string): IMapColors => {
  const item = {
    backgroundFill: colors[`backgroundfill${suffix}`],
    waterFill: colors[`waterfill${suffix}`],
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
  }
  return item
}

export const LightMapColors: IMapColors = getColorPallete('-light')
export const DarkMapColors: IMapColors = getColorPallete('-dark')
