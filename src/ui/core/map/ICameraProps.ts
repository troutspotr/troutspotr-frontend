export interface ICameraPadding {
  readonly top: number
  readonly bottom: number
  readonly left: number
  readonly right: number
}

export interface ICameraProps {
  readonly bbox: number[][]
  readonly pitch: number
  readonly bearing: number
  readonly padding: ICameraPadding
  readonly speed: number
}
