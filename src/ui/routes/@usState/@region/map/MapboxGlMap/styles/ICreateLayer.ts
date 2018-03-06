import { IMapColors } from './MapColors'
export interface ILayerProperties {
  pallete: IMapColors
  isOnline: boolean
  isHighContrastEnabled: boolean
  satelliteZoomLevel: number
  satellitePrefetchZoomLevel: number
  satelliteTransitionScalar: number
  satelliteResolution: 128 | 256 | 512 | 1024
  roadTransparencyZoomLevel: number
  roadTransparency: number
}
