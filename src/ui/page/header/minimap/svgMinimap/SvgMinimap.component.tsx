import * as React from 'react'
import {
  // Feature,
  MultiPolygon,
  // Point,
  FeatureCollection,
} from 'geojson'
import bboxPolygon from '@turf/bbox-polygon'
// import { ICounty } from 'coreTypes/tableOfContents/ICounty'
import { IState } from 'coreTypes/tableOfContents/IState'
import { getProjectionFromFeature } from 'ui/core/micromap/GetProjectionFromFeature'
// import { IRegion } from 'coreTypes/tableOfContents/IRegion'
import { ICameraProps } from 'ui/core/map/ICameraProps'

import * as d3Selection from 'd3-selection'
import * as d3Zoom from 'd3-zoom'
import * as d3Geo from 'd3-geo'

const styles = require('./SvgMinimap.scss')

export interface IMinimapSvgProps {
  // readonly isExpanded: boolean
  readonly usStatesGeojson: FeatureCollection<MultiPolygon, IState>
  // readonly regionsGeojson: ReadonlyArray<Feature<MultiPolygon, IRegion>>
  // readonly countiesGeojson: ReadonlyArray<Feature<MultiPolygon, ICounty>>
  // readonly cachedRegionsGeojson: ReadonlyArray<Feature<MultiPolygon, IRegion>>
  // readonly gpsFeature: Feature<Point>

  readonly width: number
  readonly height: number

  readonly camera?: ICameraProps
  // readonly handleFeatureSelected: any
  // readonly handleExpand: any
}

export class MinimapSvgComponent extends React.Component<IMinimapSvgProps> {
  constructor(props) {
    super(props)
    this.zoomed = this.zoomed.bind(this)
    this.clicked = this.clicked.bind(this)
    this.reset = this.reset.bind(this)
    this.active = d3Selection.select(null)
  }

  private projection: d3Geo.GeoProjection = null
  private zoom: any = null
  private path: d3Geo.GeoPath<any, d3Geo.GeoPermissibleObjects> = null
  private active: any = null
  private g: any = null
  private svg: any = null

  private containerElement: HTMLDivElement = null

  clicked(d, item) {
    if (this.active.node() === item) {
      return this.reset()
    }

    this.active.classed('active', false)
    this.active = d3Selection.select(item).classed('active', true)

    this.setCameraToItem(d)
  }

  setCameraToItem(d) {
    const { width, height } = this.props
    const bounds = this.path.bounds(d)
    console.log(bounds)
    const dx = bounds[1][0] - bounds[0][0]
    const dy = bounds[1][1] - bounds[0][1]
    const x = (bounds[0][0] + bounds[1][0]) / 2
    const y = (bounds[0][1] + bounds[1][1]) / 2
    const scale = Math.max(1, Math.min(8, 0.9 / Math.max(dx / width, dy / height)))
    const translate = [width / 2 - scale * x, height / 2 - scale * y]

    this.svg
      .transition()
      .duration(750)
      .call(
        this.zoom.transform,
        d3Zoom.zoomIdentity.translate(translate[0], translate[1]).scale(scale)
      ) // updated for d3 v4
  }

  reset() {
    this.active.classed('active', false)
    this.active = d3Selection.select(null)

    this.svg
      .transition()
      .duration(750)
      .call(this.zoom.transform, d3Zoom.zoomIdentity) // updated for d3 v4
  }

  zoomed() {
    this.g.style('stroke-width', 1.5 / d3Selection.event.transform.k + 'px')
    this.g.attr('transform', d3Selection.event.transform) // updated for d3 v4
  }

  stopped() {
    if (d3Selection.event.defaultPrevented) {
      d3Selection.event.stopPropagation()
    }
  }

  componentWillUpdate(nextProps) {
    const { camera } = nextProps
    this.centerCameraOnCamera(camera)
  }

  centerCameraOnCamera(camera: ICameraProps) {
    if (camera == null) {
      return
    }

    const { bbox } = camera

    // BEWARE! d3 requires clockwise, yet turf does anti-clockwise!
    // https://bl.ocks.org/mbostock/a7bdfeb041e850799a8d3dce4d8c50c8
    // https://stackoverflow.com/questions/47234805/d3-v4-geo-draws-boundary-inverted
    // https://macwright.org/2015/03/23/geojson-second-bite.html#winding
    // no one is right; everyone is wrong.
    const bboxFeature = bboxPolygon([bbox[0][0], bbox[0][1], bbox[1][0], bbox[1][1]])
    bboxFeature.geometry.coordinates[0].reverse()
    this.setCameraToItem(bboxFeature)
  }

  componentDidMount() {
    const { width, height } = this.props

    this.projection = d3Geo
      .geoAlbersUsa() // updated for d3 v4
      .scale(1000)
      .translate([width / 2, height / 2])

    this.zoom = d3Zoom
      .zoom()
      .scaleExtent([1, 8])
      .on('zoom', this.zoomed)

    this.path = d3Geo
      .geoPath() // updated for d3 v4se
      .projection(this.projection)

    this.svg = d3Selection
      .select(`.${styles.container}`)
      .append('svg')
      .attr('width', width)
      .attr('height', height)
      .on('click', this.stopped, true)

    this.svg
      .append('rect')
      .attr('class', styles.sneezeGuard)
      .attr('width', width)
      .attr('height', height)
      .on('click', this.reset)

    this.g = this.svg.append('g')

    this.svg.call(this.zoom) // delete this line to disable free zooming
    this.renderData()
    this.centerCameraOnCamera(this.props.camera)
  }

  renderData() {
    const { usStatesGeojson, width, height } = this.props

    this.projection = getProjectionFromFeature(
      usStatesGeojson,
      { width, height },
      Math.min(width, height) * 0.5
    )
    this.path = d3Geo
      .geoPath() // updated for d3 v4
      .projection(this.projection)

    const obnoxiousClosure = this.clicked
    this.g
      .selectAll('path')
      .data(usStatesGeojson.features)
      .enter()
      .append('path')
      .attr('d', this.path)
      .attr('class', styles.states)
      .on('click', function(asdf) {
        obnoxiousClosure(asdf, this)
      })

    this.g
      .append('path')
      .datum(usStatesGeojson.features)
      .attr('class', 'mesh')
      .attr('d', this.path)
  }

  render() {
    return <div className={styles.container} ref={element => (this.containerElement = element)} />
  }
}
