export const TAU = Math.PI * 2
export const DEGREES_TO_RADIANS = 0.0174533

export interface IDimensionsSettings {
  readonly width: number,
  readonly height: number,
  readonly padding: number,
}

export interface IStreamSettings {
  readonly radius: number,
  readonly streamWidth: number,
  readonly troutSectionWidth: number,
  readonly publicSectionWidth: number,
  readonly specialRegulationsWidth: number,
  readonly terminusDiameter: number,
}

export interface ICircleSettings {
  readonly radius: number,
  readonly streamWidth: number,
  readonly troutSectionWidth: number,
  readonly publicSectionWidth: number,
  readonly specialRegulationsWidth: number,
  readonly terminusDiameter: number,
}

export interface IAccessPointsSettings {
  readonly radius: number,
  readonly permissionRequiredDiameter: number,
  readonly publiclyFishableDiameter: number,
}

export interface IContentSettings {
  readonly arcCompressionRatio: number,
  readonly rotationPhase: number,
  readonly stream: IStreamSettings,
  readonly circle: ICircleSettings,
  readonly accessPoints: IAccessPointsSettings,
}

export interface IMicromapSettings {
  readonly dimensions: IDimensionsSettings,
  readonly settings: IContentSettings,
}
