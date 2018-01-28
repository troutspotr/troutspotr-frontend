// tslint:disable:no-object-mutation
import { IStreamObject } from 'coreTypes/IStreamObject'

import { ExtendedFeature, geoPath, GeoPath, GeoPermissibleObjects } from 'd3-geo'

import { Feature, LineString } from 'geojson'

import { getProjectionFromFeature } from 'ui/core/micromap/GetProjectionFromFeature'
import { IMicromapCanvasSettings } from 'ui/core/micromap/Micromap.settings'
import { renderPointOnStream } from 'ui/core/micromap/canvas/point.canvas'

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
  context.lineWidth = thickness
  context.lineJoin = 'round'
  context.strokeStyle = color
  context.beginPath()
  if (geoJson.geometry == null) {
    return
  }

  const d3Thing: ExtendedFeature<LineString, typeof geoJson.properties> = {
    ...geoJson,
    geometry: geoJson.geometry,
  }

  path(d3Thing)
  context.stroke()
}

export const renderStreams = (
  streamObject: IStreamObject,
  canvasContext: CanvasRenderingContext2D,
  settings: IMicromapCanvasSettings
) => {
  const streamSettings = settings.settings.stream
  const projection = getProjectionFromFeature(streamObject.circle, settings)

  const pathGenerator = geoPath()
    .projection(projection)
    .pointRadius(streamSettings.terminusDiameter)
    .context(canvasContext)

  // Render stream
  renderStream(
    pathGenerator,
    canvasContext,
    streamObject.stream,
    settings.colors.stream,
    streamSettings.streamWidth
  )

  // render sections
  streamObject.sections.forEach(section => {
    renderStream(
      pathGenerator,
      canvasContext,
      section,
      settings.colors.troutStreamSection,
      streamSettings.troutSectionWidth
    )
  })

  // Render public sections
  streamObject.palSections.forEach(section => {
    renderStream(
      pathGenerator,
      canvasContext,
      section,
      settings.colors.palSection,
      streamSettings.publicSectionWidth
    )
  })

  if (streamObject.stream.geometry == null) {
    return
  }

  const streamConfluence = streamObject.stream.geometry.coordinates[0]
  renderPointOnStream(
    projection,
    canvasContext,
    streamConfluence,
    settings.colors.secondaryText,
    streamSettings.terminusDiameter * 0.5
  )
}
