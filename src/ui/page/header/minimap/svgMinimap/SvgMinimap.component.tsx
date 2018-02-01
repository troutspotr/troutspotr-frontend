import * as React from 'react'
import {
  MultiPolygon,
  // Point,
  FeatureCollection,
} from 'geojson'
import bboxPolygon from '@turf/bbox-polygon'
// import { ICounty } from 'coreTypes/tableOfContents/ICounty'
import { IState } from 'coreTypes/tableOfContents/IState'
import { getProjectionFromFeature } from 'ui/core/micromap/GetProjectionFromFeature'
import { IRegion } from 'coreTypes/tableOfContents/IRegion'
import { ICameraProps } from 'ui/core/map/ICameraProps'

import * as d3Selection from 'd3-selection'
import * as d3Zoom from 'd3-zoom'
import * as d3Geo from 'd3-geo'
// import { multiPolygon } from '@turf/helpers'

const styles = require('./SvgMinimap.scss')

export interface IMinimapSvgProps {
  // readonly isExpanded: boolean
  readonly usStatesGeojson: FeatureCollection<MultiPolygon, IState>
  readonly regionsGeojson: FeatureCollection<MultiPolygon, IRegion>
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
    this.renderData = this.renderData.bind(this)

    this.active = d3Selection.select(null)
  }

  private projection: d3Geo.GeoProjection = null
  private zoom: any = null
  private path: d3Geo.GeoPath<SVGPathElement, d3Geo.GeoPermissibleObjects> = null
  private active: any = null
  private mapGroup: any = null
  private stateGroup: any = null
  private regionGroup: any = null
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
      )
  }

  reset() {
    this.active.classed('active', false)
    this.active = d3Selection.select(null)

    this.svg
      .transition()
      .duration(750)
      .call(this.zoom.transform, d3Zoom.zoomIdentity)
  }

  zoomed() {
    this.stateGroup.style('stroke-width', 2.2 / d3Selection.event.transform.k + 'px')
    this.regionGroup.style('stroke-width', 1.5 / d3Selection.event.transform.k + 'px')
    this.mapGroup.attr('transform', d3Selection.event.transform)
  }

  stopped() {
    if (d3Selection.event.defaultPrevented) {
      d3Selection.event.stopPropagation()
    }
  }

  componentDidUpdate() {
    const { camera } = this.props
    this.renderData()
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
      .geoAlbersUsa()
      .scale(1000)
      .translate([width / 2, height / 2])

    this.zoom = d3Zoom
      .zoom()
      .scaleExtent([1, 8])
      .on('zoom', this.zoomed)

    this.path = d3Geo.geoPath().projection(this.projection)

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

    this.mapGroup = this.svg.append('g').attr('class', 'js-d3-map')
    this.stateGroup = this.mapGroup.append('g').attr('class', 'states')
    this.regionGroup = this.mapGroup.append('g').attr('class', 'regions')

    this.svg.call(this.zoom) // delete this line to disable free zooming
    this.renderData()
    this.centerCameraOnCamera(this.props.camera)
  }

  renderData() {
    const { usStatesGeojson, regionsGeojson, width, height } = this.props
    this.projection = getProjectionFromFeature(
      usStatesGeojson,
      { width, height },
      Math.min(width, height) * 0.5
    )
    this.path = d3Geo.geoPath().projection(this.projection)

    const obnoxiousClosure = this.clicked

    const regionSelection = this.regionGroup
      .selectAll(`path.js-d3-regions`)
      .data(regionsGeojson.features, x => {
        return x.properties.gid
      })

    regionSelection
      .enter()
      .append('path')
      .attr('class', `js-d3-regions ${styles.regions}`)
      .attr('d', this.path)
      .on('click', function(item) {
        obnoxiousClosure(item, this)
      })
      .style('opacity', 0)
      .transition()
      .duration(300)
      .style('opacity', 1)

    regionSelection
      .exit()
      .transition()
      .duration(300)
      .style('opacity', 0)
      .remove()

    const stateSelection = this.stateGroup
      .selectAll(`path.js-d3-states`)
      .data([...usStatesGeojson.features], x => {
        return x.properties.gid
      })

    stateSelection
      .enter()
      .append('path')
      .attr('class', `js-d3-states ${styles.states}`)
      .attr('d', this.path)
      .on('click', function(item) {
        obnoxiousClosure(item, this)
      })

    stateSelection
      .exit()
      .transition()
      .duration(300)
      .style('opacity', 0)
      .remove()
  }

  render() {
    return <div className={styles.container} ref={element => (this.containerElement = element)} />
  }
}
