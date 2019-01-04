export const TAU = Math.PI * 2
export const DEGREES_TO_RADIANS = 0.0174533

export interface IDimensionsSettings {
  readonly width: number
  readonly height: number
  // readonly padding: number
}

export const DEFAULT_DIMENSIONS: IDimensionsSettings = {
  width: 45,
  height: 45,
}

export interface IStreamSettings {
  readonly radius: number
  readonly streamWidth: number
  readonly troutSectionWidth: number
  readonly publicSectionWidth: number
  readonly specialRegulationsWidth: number
  readonly terminusDiameter: number
  readonly backdropWidth: number
}

export const DEFAULT_STREAM_SETTINGS: IStreamSettings = {
  radius: 14.5,
  streamWidth: 0.83,
  troutSectionWidth: 1.16,
  publicSectionWidth: 1.54,
  specialRegulationsWidth: 1.3,
  terminusDiameter: 2.34,
  backdropWidth: 1,
}

export interface ICircleSettings {
  readonly radius: number
  readonly streamWidth: number
  readonly troutSectionWidth: number
  readonly publicSectionWidth: number
  readonly specialRegulationsWidth: number
  readonly terminusDiameter: number
  readonly backdropWidth: number
}

export const DEFAULT_CIRCLE_SETTINGS: ICircleSettings = {
  radius: 18.0,
  streamWidth: 0.83,
  troutSectionWidth: 1.16,
  publicSectionWidth: 1.54,
  specialRegulationsWidth: 1.3,
  terminusDiameter: 2.34,
  backdropWidth: 1,
}

export interface IAccessPointsSettings {
  readonly radius: number
  readonly permissionRequiredDiameter: number
  readonly publiclyFishableDiameter: number
  readonly backdropWidth: number
}

export const DEFAULT_ACCESS_POINT_SETTINGS: IAccessPointsSettings = {
  radius: 21.0,
  permissionRequiredDiameter: 2.0,
  publiclyFishableDiameter: 2.5,
  backdropWidth: 0.5,
}

export interface IContentSettings {
  readonly arcCompressionRatio: number
  readonly rotationPhase: number
  readonly stream: IStreamSettings
  readonly circle: ICircleSettings
  readonly accessPoints: IAccessPointsSettings
}

export interface IColorSettings {
  readonly backgroundFill: string
  readonly petriDish: string
  readonly streamFill: string

  readonly filteredStreamFill: string
  readonly troutSectionFill: string
  readonly restrictionYellow: string
  readonly palSectionFill: string
  readonly primaryLabelFill: string
  readonly secondaryLabelFill: string
  readonly backdropFill: string
}

export const DEFAULT_COLOR_SETTINGS: IColorSettings = {
  backgroundFill: '#121212',
  troutSectionFill: '#57b5e0',
  restrictionYellow: '#fbcd13',
  palSectionFill: '#bce90c',
  primaryLabelFill: 'white',
  secondaryLabelFill: '#bcbcbc',
  petriDish: '#212121',
  streamFill: '#fff',
  backdropFill: 'black',
  filteredStreamFill: 'black',
}

export interface IMicromapSettings {
  readonly dimensions: IDimensionsSettings
  readonly settings: IContentSettings
}

export interface IMicromapCanvasSettings extends IMicromapSettings {
  readonly colors: IColorSettings
}

export const DEFAULT_MICROMAP_CANVAS_SETTINGS: IMicromapCanvasSettings = {
  colors: DEFAULT_COLOR_SETTINGS,
  dimensions: DEFAULT_DIMENSIONS,
  settings: {
    arcCompressionRatio: 0.9,
    rotationPhase: Math.PI * 0.5,
    stream: DEFAULT_STREAM_SETTINGS,
    circle: DEFAULT_CIRCLE_SETTINGS,
    accessPoints: DEFAULT_ACCESS_POINT_SETTINGS,
  },
}
