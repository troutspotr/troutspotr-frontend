export const DEFAULT_STREAM_WIDTH = 3
export const DEFAULT_WIDTH = 40
export const DEFAULT_PADDING = 1
export const DEFAULT_CIRCLE_RADIUS = DEFAULT_WIDTH - DEFAULT_PADDING
export const DEFAULT_ACCESS_POINT_RADIUS = DEFAULT_WIDTH - DEFAULT_PADDING
export const DEFAULT_ARC_COMPRESSION_RATIO = 0.9
export const DEFAULT_ROTATION_PHASE = Math.PI * 0.5

export const DEFAULT_SETTINGS = {
  dimensions: {
    width: 40,
    height: 40,
    padding: 1,
  },
  settings: {
    arcCompressionRatio: DEFAULT_ARC_COMPRESSION_RATIO,
    rotationPhase: DEFAULT_ROTATION_PHASE,
    stream: {
      radius: 20,
      streamWidth: DEFAULT_STREAM_WIDTH,
      troutSectionWidth: DEFAULT_STREAM_WIDTH * 2,
      publicSectionWidth: DEFAULT_STREAM_WIDTH * 3,
      specialRegulationsWidth: DEFAULT_STREAM_WIDTH * 8,
      terminusDiameter: DEFAULT_STREAM_WIDTH * 5,
    },
    circle: {
      radius: DEFAULT_CIRCLE_RADIUS,
      streamWidth: DEFAULT_STREAM_WIDTH,
      troutSectionWidth: DEFAULT_STREAM_WIDTH * 2,
      publicSectionWidth: DEFAULT_STREAM_WIDTH * 3,
      specialRegulationsWidth: DEFAULT_STREAM_WIDTH * 8,
      terminusDiameter: DEFAULT_STREAM_WIDTH * 5,
    },
    accessPoints: {
      radius: DEFAULT_ACCESS_POINT_RADIUS,
      permissionRequiredDiameter: DEFAULT_STREAM_WIDTH * 3,
      publiclyFishableDiameter: DEFAULT_STREAM_WIDTH * 5.5,
    },
  },
}

export const createSettings = (width, height) => {

}

export const scaleDefaultSettingsBy = (scale = 1.0, settings = DEFAULT_SETTINGS) => {
  const streamSettings = settings.settings.stream
  const circleSettings = settings.settings.circle
  const accessPointsSettings = settings.settings.accessPoints
  const newSettings = {
    dimensions: {
      ...settings.dimensions,
    },
    settings: {
      ...settings.settings,
      stream: {
        ...streamSettings,
        streamWidth: streamSettings.streamWidth * scale,
        troutSectionWidth: streamSettings.troutSectionWidth * scale,
        publicSectionWidth: streamSettings.publicSectionWidth * scale,
        specialRegulationsWidth: streamSettings.specialRegulationsWidth * scale,
        terminusDiameter: streamSettings.terminusDiameter * scale,
      },
      circle: {
        ...circleSettings,
        streamWidth: circleSettings.streamWidth * scale,
        troutSectionWidth: circleSettings.troutSectionWidth * scale,
        publicSectionWidth: circleSettings.publicSectionWidth * scale,
        specialRegulationsWidth: circleSettings.specialRegulationsWidth * scale,
        terminusDiameter: circleSettings.terminusDiameter * scale,
      },
      accessPoints: {
        ...accessPointsSettings,
        permissionRequiredDiameter: accessPointsSettings.permissionRequiredDiameter * scale,
        publiclyFishableDiameter: accessPointsSettings.publiclyFishableDiameter * scale,
      },
    },
  }

  return newSettings
}
