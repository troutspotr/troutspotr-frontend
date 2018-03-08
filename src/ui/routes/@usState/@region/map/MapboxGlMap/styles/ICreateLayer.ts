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
  accessPointSettings: {
    publiclyAccessibleRadius: number
    borderWidth: number
    permissionRequiredRadius: number
  }
}

export const defaultLayerProperties = (): ILayerProperties => {
  const streamSettings: IStreamSettings = {
    radius: 0,
    streamWidth: 1,
    troutSectionWidth: 2,
    publicSectionWidth: 3,
    specialRegulationsWidth: 4,
    terminusDiameter: 0,
  }
  return {
    pallete: null,
    isOnline: false,
    isHighContrastEnabled: false,
    satelliteZoomLevel: 14,
    satellitePrefetchZoomLevel: 13,
    satelliteTransitionScalar: 0.3,
    satelliteResolution: 256,
    roadTransparencyZoomLevel: 14,
    roadTransparency: 0.3,
    streamSettings,
    accessPointSettings: {
      publiclyAccessibleRadius: 10,
      borderWidth: 2,
      permissionRequiredRadius: 6,
    },
  }
}

export const darkModeLayerProperties = (): ILayerProperties => {
  return null
}

export const highContrastkModeLayerProperties = (): ILayerProperties => {
  return null
}
