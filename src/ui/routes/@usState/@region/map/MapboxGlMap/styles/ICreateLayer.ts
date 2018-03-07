import { IMapColors } from './MapColors'
import { IStreamSettings } from 'ui/core/micromap/Micromap.settings'
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
  streamSettings: IStreamSettings
}
