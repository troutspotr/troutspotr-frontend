import * as React from 'react'
import { MultiPolygon, GeoJsonObject, FeatureCollection } from 'geojson'
import bboxPolygon from '@turf/bbox-polygon'
import * as MicromapSettings from 'ui/core/micromap/Micromap.settings'
import { IState } from 'coreTypes/tableOfContents/IState'
import { IRegion } from 'coreTypes/tableOfContents/IRegion'
import { ICameraProps } from 'ui/core/map/ICameraProps'
import { select, event } from 'd3-selection'
import { zoomIdentity, zoom } from 'd3-zoom'
import { featureCollection } from '@turf/helpers'
import {
  GeoGeometryObjects,
  GeoProjection,
  GeoPath,
  GeoPermissibleObjects,
  geoPath,
  geoMercator,
} from 'd3-geo'
import { Selection } from 'ui/core/SelectionConstants'
import { Loading } from '../../../../core/LoadingConstants'
const styles = require('./SvgMinimap.scss')

type RegionGeoJson = FeatureCollection<MultiPolygon, IRegion>
type StateGeoJson = FeatureCollection<MultiPolygon, IState>
export interface IMinimapSvgProps {
  readonly usStatesGeoJson: StateGeoJson
  readonly regionsGeoJson: RegionGeoJson
  readonly width: number
  readonly height: number
  readonly camera?: ICameraProps
  readonly isOffline: boolean
  readonly isExpanded: boolean
}

export class MinimapSvgComponent extends React.Component<IMinimapSvgProps> {
  constructor(props) {
    super(props)
    this.zoomed = this.zoomed.bind(this)
    this.clicked = this.clicked.bind(this)
    this.reset = this.reset.bind(this)
    this.renderData = this.renderData.bind(this)

    this.active = select(null)
  }

  private projection: GeoProjection = null
  private zoom: any = null
  private path: GeoPath<SVGPathElement, GeoPermissibleObjects> = null
  private active: any = null
  private mapGroup: any = null
  private usStatesBackdrop: any = null
  private regionsBackdrop: any = null
  private selectedRegionsGroup: any = null
  private selectedStatesGroup: any = null
  private stateLabelsGroup: any = null
  private regionLabelsGroup: any = null
  private svg: any = null

  private containerElement: HTMLDivElement = null

  clicked(d, item) {
    if (this.active.node() === item) {
      return this.reset()
    }

    this.active.classed('active', false)
    this.active = select(item).classed('active', true)
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
      .call(this.zoom.transform, zoomIdentity.translate(translate[0], translate[1]).scale(scale))
  }

  reset() {
    this.active.classed('active', false)
    this.active = select(null)

    this.svg
      .transition()
      .duration(750)
      .call(this.zoom.transform, zoomIdentity)
  }

  zoomed() {
    this.usStatesBackdrop.style('stroke-width', 1.2 / event.transform.k + 'px')
    this.regionsBackdrop.style('stroke-width', 1.0 / event.transform.k + 'px')
    this.selectedRegionsGroup.style('stroke-width', 3 / event.transform.k + 'px')
    this.selectedStatesGroup.style('stroke-width', 2.5 / event.transform.k + 'px')
    this.stateLabelsGroup.style('font-size', 0.75 / event.transform.k + 'em')
    this.regionLabelsGroup.style('font-size', 0.6 / event.transform.k + 'em')
    this.mapGroup.attr('transform', event.transform)
  }

  stopped() {
    if (event.defaultPrevented) {
      event.stopPropagation()
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

    this.projection = geoMercator()
      .scale(1000)
      .translate([width / 2, height / 2])

    this.zoom = zoom()
      .scaleExtent([1, 8])
      .on('zoom', this.zoomed)

    this.path = geoPath().projection(this.projection)

    this.svg = select(`.${styles.container}`)
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

    const filter = this.svg
      .append('defs')
      .append('filter')
      .attr('x', '-0.05')
      .attr('y', '-0.05')
      .attr('width', '1.1')
      .attr('height', '1.1')
      .attr('id', 'solid')

    filter
      .append('feFlood')
      .attr('flood-color', 'rgba(18, 18, 18, 0.9)')
      .attr('flood-opacity', 0.8)
    filter.append('feComposite').attr('in', 'SourceGraphic')

    this.mapGroup = this.svg.append('g').attr('class', 'js-d3-map')
    this.usStatesBackdrop = this.mapGroup.append('g').attr('class', 'us-states-backdrop')
    this.regionsBackdrop = this.mapGroup.append('g').attr('class', 'regions-backdrop')
    this.selectedStatesGroup = this.mapGroup.append('g').attr('class', 'selected-states')
    this.selectedRegionsGroup = this.mapGroup.append('g').attr('class', 'selected-regions')
    this.stateLabelsGroup = this.mapGroup.append('g').attr('class', 'state-labels')
    this.regionLabelsGroup = this.mapGroup.append('g').attr('class', 'region-labels')

    this.svg.call(this.zoom) // delete this line to disable free zooming
    this.renderData()
    this.centerCameraOnCamera(this.props.camera)
  }

  renderRegionsBackdrop(svgPathGenerator: GeoPath<SVGPathElement, GeoPermissibleObjects>) {
    const { regionsGeoJson } = this.props
    const obnoxiousClosure = this.clicked
    const regionSelection = this.regionsBackdrop
      .selectAll(`path.js-d3-regions`)
      .data(regionsGeoJson.features, x => {
        return x.properties.gid
      })

    regionSelection
      .enter()
      .append('path')
      .attr('class', `js-d3-regions ${styles.regions}`)
      .attr('d', svgPathGenerator)
      .on('click', function(item) {
        obnoxiousClosure(item, this)
      })
      .style('opacity', 0)
      .transition()
      .duration(400)
      .style('opacity', 1)

    regionSelection
      .exit()
      .transition()
      .duration(400)
      .style('opacity', 0)
      .remove()
  }

  renderStateBackdrop(svgPathGenerator: GeoPath<SVGPathElement, GeoPermissibleObjects>) {
    const { usStatesGeoJson } = this.props
    const obnoxiousClosure = this.clicked
    const stateSelection = this.usStatesBackdrop
      .selectAll(`path.js-d3-states`)
      .data([...usStatesGeoJson.features], x => {
        return x.properties.gid
      })

    stateSelection.attr('class', (item, index) => {
      const isInactive = item.properties.selectionStatus === Selection.Inactive
      const className = isInactive ? styles.statesInactive : styles.states
      return `js-d3-states ${className}`
    })

    stateSelection
      .enter()
      .append('path')
      .attr('data-name', item => item.properties.short_name)
      .attr('class', (item, index) => {
        return `js-d3-states ${styles.states}`
      })
      .attr('d', svgPathGenerator)
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

  renderSelectedStates(svgPathGenerator: GeoPath<SVGPathElement, GeoPermissibleObjects>) {
    const { usStatesGeoJson } = this.props
    const selectedUsStatesFeatures =
      usStatesGeoJson == null
        ? []
        : usStatesGeoJson.features.filter(feature => {
            return feature.properties.selectionStatus === Selection.Selected
          })
    const selectedFeatureCollection = featureCollection(selectedUsStatesFeatures) as StateGeoJson

    const selectedStateSelection = this.selectedStatesGroup
      .selectAll(`path.js-d3-selected-states`)
      .data([...selectedFeatureCollection.features], x => {
        return x.properties.gid
      })

    const obnoxiousClosure = this.clicked
    selectedStateSelection
      .enter()
      .append('path')
      .attr('class', `js-d3-selected-states ${styles.selectedStates}`)
      .attr('d', svgPathGenerator)
      .on('click', function(item) {
        obnoxiousClosure(item, this)
      })

    selectedStateSelection
      .exit()
      .transition()
      .duration(300)
      .style('opacity', 0)
      .remove()
  }

  renderSelectedRegions(svgPathGenerator: GeoPath<SVGPathElement, GeoPermissibleObjects>) {
    const { regionsGeoJson } = this.props
    const selectedRegionFeatures =
      regionsGeoJson == null
        ? []
        : regionsGeoJson.features.filter(feature => {
            return feature.properties.loadingStatus === Loading.Pending
          })

    const loadingRegionsSelection = this.selectedRegionsGroup
      .selectAll(`path.js-d3-selected-regions`)
      .data([...selectedRegionFeatures], x => {
        return x.properties.gid
      })
    const obnoxiousClosure = this.clicked
    loadingRegionsSelection
      .enter()
      .append('path')
      .attr('class', `js-d3-selected-regions ${styles.loadingRegions}`)
      .attr('d', svgPathGenerator)
      .on('click', function(item) {
        obnoxiousClosure(item, this)
      })
      .style('opacity', 0)
      .transition()
      .duration(400)
      .style('opacity', 1)
    loadingRegionsSelection
      .exit()
      .transition()
      .duration(300)
      .style('opacity', 0)
      .remove()
      .duration(300)
      .style('opacity', 0)
      .remove()
  }

  renderStateLabels(svgPathGenerator: GeoPath<SVGPathElement, GeoPermissibleObjects>) {
    const { usStatesGeoJson, isExpanded } = this.props
    const nonSelectedStates = {
      ...usStatesGeoJson,
      features: isExpanded
        ? usStatesGeoJson.features.filter(x => x.properties.selectionStatus !== Selection.Selected)
        : [],
    }
    console.log(nonSelectedStates.features)
    const stateSelection = this.stateLabelsGroup
      .selectAll(`text.js-d3-states-labels`)
      .data([...nonSelectedStates.features], x => {
        return x.properties.gid
      })

    stateSelection.attr('class', (item, index) => {
      const isInactive = item.properties.selectionStatus === Selection.Inactive
      const className = isInactive ? styles.stateLabelsInactive : styles.stateLabels
      return `js-d3-states-labels ${className}`
    })

    stateSelection
      .enter()
      .append('text')
      .attr('data-name', item => item.properties.short_name)
      .text(item => item.properties.name)
      .attr('x', d => {
        return svgPathGenerator.centroid(d)[0]
      })
      .attr('y', d => {
        return svgPathGenerator.centroid(d)[1]
      })
      .attr('class', (item, index) => {
        return `js-d3-states-labels ${styles.stateLabels}`
      })
      .attr('filter', 'url(#solid)')
      .style('opacity', 0)
      .transition()
      .delay(200)
      .duration(300)
      .style('opacity', 1)

    stateSelection
      .exit()
      .transition()
      .duration(100)
      .style('opacity', 0)
      .remove()
  }

  renderRegionLabels(svgPathGenerator: GeoPath<SVGPathElement, GeoPermissibleObjects>) {
    const { regionsGeoJson, isExpanded } = this.props
    const regionsWithLabels = isExpanded
      ? regionsGeoJson.features.filter(x => x.properties.selectionStatus !== Selection.Inactive)
      : []
    const regionSelection = this.regionLabelsGroup
      .selectAll(`text.js-d3-regions-labels`)
      .data([...regionsWithLabels], x => {
        return x.properties.gid
      })

    regionSelection
      .enter()
      .append('text')
      .attr('data-name', item => item.properties.long_name)
      .text(item => item.properties.long_name)
      .attr('x', d => {
        return svgPathGenerator.centroid(d)[0]
      })
      .attr('y', d => {
        return svgPathGenerator.centroid(d)[1]
      })
      .attr('class', (item, index) => {
        return `js-d3-regions-labels ${styles.regionLabels}`
      })
      .attr('filter', 'url(#solid)')
      .style('opacity', 0)
      .transition()
      .delay(400)
      .duration(300)
      .style('opacity', 1)

    regionSelection
      .exit()
      .transition()
      .duration(100)
      .style('opacity', 0)
      .remove()
  }

  renderData() {
    const { usStatesGeoJson, width, height } = this.props
    this.projection = getProjectionFromFeature(
      usStatesGeoJson,
      { width, height },
      Math.min(width, height) * 0.5
    )
    this.path = geoPath().projection(this.projection)
    this.renderRegionsBackdrop(this.path)
    this.renderStateBackdrop(this.path)
    this.renderSelectedRegions(this.path)
    this.renderSelectedStates(this.path)
    this.renderStateLabels(this.path)
    this.renderRegionLabels(this.path)
  }

  render() {
    return <div className={styles.container} ref={element => (this.containerElement = element)} />
  }
}

export const getProjectionFromFeature = (
  feature: GeoJsonObject,
  dimmensions: MicromapSettings.IDimensionsSettings,
  radius: number
): GeoProjection => {
  const { width, height } = dimmensions
  const streamGeometry = feature as GeoGeometryObjects
  const diameter = radius * 2 * 0.9
  const lower = [(width - diameter) / 2, (height - diameter) / 2]
  const upper = [width - lower[0], height - lower[1]]
  const projection = geoMercator().fitExtent(
    [[lower[0], lower[1]], [upper[0], upper[1]]],
    streamGeometry
  )

  return projection
}
