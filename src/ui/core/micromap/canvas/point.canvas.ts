// tslint:disable:no-object-mutation
import { GeoProjection } from 'd3-geo'
import { Position } from 'geojson'
import { TAU } from 'ui/core/micromap/Micromap.settings'

export const renderPointOnStream = (
  projection: GeoProjection,
  context: CanvasRenderingContext2D,
  coordinates: Position,
  color = 'red',
  radius = 1
) => {
  if (projection == null) {
    return
  }

  if (context == null) {
    return
  }
  const canvasCoordiantes = projection([coordinates[0], coordinates[1]])

  if (canvasCoordiantes == null) {
    return
  }
  context.save()
  context.beginPath()
  context.fillStyle = color
  context.lineWidth = 1
  context.strokeStyle = color
  context.arc(canvasCoordiantes[0], canvasCoordiantes[1], radius, 0, TAU, false)
  context.fill()
  context.stroke()
  context.restore()
}
