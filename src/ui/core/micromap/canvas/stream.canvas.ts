// tslint:disable:no-object-mutation
import { IStreamObject } from 'coreTypes/IStreamObject'

import { ExtendedFeature, geoPath, GeoPath, GeoPermissibleObjects } from 'd3-geo'

import { Feature, LineString } from 'geojson'

import { renderPointOnStream } from 'ui/core/micromap/canvas/point.canvas'
import { getProjectionFromFeatureAndSettings } from 'ui/core/micromap/GetProjectionFromFeature'
import { IMicromapCanvasSettings } from 'ui/core/micromap/Micromap.settings'

export const renderStream = (
  // tslint:disable-next-line:no-any
  path: GeoPath<any, GeoPermissibleObjects>,
  context: CanvasRenderingContext2D,
  geoJson: Feature<LineString>,
  color = 'red',
  thickness = 1
) => {
  if (path == null) {
    return
  }

  if (context == null) {
    return
  }

  if (geoJson.geometry == null) {
    return
  }
  const d3Thing: ExtendedFeature<LineString, typeof geoJson.properties> = {
    ...geoJson,
    geometry: geoJson.geometry,
  }

  context.save()

  context.lineWidth = thickness
  context.lineJoin = 'round'
  context.strokeStyle = color
  context.beginPath()
  path(d3Thing)
  context.stroke()
  context.restore()
}

export const renderStreams = (
  streamObject: IStreamObject,
  canvasContext: CanvasRenderingContext2D,
  settings: IMicromapCanvasSettings
) => {
  const streamSettings = settings.settings.stream
  const projection = getProjectionFromFeatureAndSettings(streamObject.circle, settings)

  const pathGenerator = geoPath()
    .projection(projection)
    .pointRadius(streamSettings.terminusDiameter)
    .context(canvasContext)
  if (streamObject.stream.geometry == null) {
    return
  }

  const streamConfluence = streamObject.stream.geometry.coordinates[0]
  renderPointOnStream(
    projection,
    canvasContext,
    streamConfluence,
    settings.colors.secondaryLabelFill,
    streamSettings.terminusDiameter * 0.5
  )

  // render trout black backdrop:
  streamObject.sections.forEach(section => {
    renderStream(
      pathGenerator,
      canvasContext,
      section,
      settings.colors.backdropFill,
      streamSettings.troutSectionWidth + streamSettings.backdropWidth
    )
  })

  // render PAL black backdrop
  streamObject.palSections.forEach(section => {
    renderStream(
      pathGenerator,
      canvasContext,
      section,
      settings.colors.backdropFill,
      streamSettings.publicSectionWidth + streamSettings.backdropWidth
    )
  })

  renderStream(
    pathGenerator,
    canvasContext,
    streamObject.stream,
    settings.colors.streamFill,
    streamSettings.streamWidth
  )

  // render sections
  streamObject.sections.forEach(section => {
    renderStream(
      pathGenerator,
      canvasContext,
      section,
      settings.colors.troutSectionFill,
      streamSettings.troutSectionWidth
    )
  })

  // Render public sections
  streamObject.palSections.forEach(section => {
    renderStream(
      pathGenerator,
      canvasContext,
      section,
      settings.colors.palSectionFill,
      streamSettings.publicSectionWidth
    )
  })
}
