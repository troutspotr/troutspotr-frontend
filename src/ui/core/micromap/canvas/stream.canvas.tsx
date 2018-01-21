// tslint:disable:no-object-mutation
import { IStreamObject } from 'coreTypes/IStreamObject'

import { ExtendedFeature, geoPath, GeoPath, GeoPermissibleObjects } from 'd3-geo'

import { Feature, LineString } from 'geojson'

const colors = require('ui/styles/_colors.scss')
import { getProjectionFromFeature } from '../GetProjectionFromFeature'
import { IMicromapSettings } from '../Micromap.settings'
import { renderPointOnStream } from './point.canvas'

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
  settings: IMicromapSettings
) => {
  const streamSettings = settings.settings.stream
  const projection = getProjectionFromFeature(
    streamObject.circle,
    settings.dimensions,
    settings.settings.circle
  )

  const pathGenerator = geoPath()
    .projection(projection)
    .pointRadius(streamSettings.terminusDiameter)
    .context(canvasContext)

  // Render stream
  renderStream(
    pathGenerator,
    canvasContext,
    streamObject.stream,
    colors.gray,
    streamSettings.streamWidth
  )

  // render sections
  streamObject.troutSections.forEach(section => {
    renderStream(
      pathGenerator,
      canvasContext,
      section,
      colors.blue,
      streamSettings.troutSectionWidth
    )
  })

  // Render public sections
  streamObject.palSections.forEach(section => {
    renderStream(
      pathGenerator,
      canvasContext,
      section,
      colors.green,
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
    colors.offWhite,
    streamSettings.terminusDiameter * 0.5
  )
}
