// Justification for turning off rule:
// Originally, I tried creating like, 4 different files
// to support regions, counties, etc. When I went
// fully over to D3 instead of smaller react components,
// that forced me to use one big file.
// Also, D3 wants single lines for each attribute,
// so it's needlessly long without adding too much
// complexity.

// I could see myself breaking this down into smaller
// chunks if I wanted to hash it out into
// A. Administrative Geometry (states, counties, etc)
// B. Label
// C. Stream Centroids (?)
// D. Parent class that zooms and selects, etc.
// tslint:disable:max-file-line-count

import bboxPolygon from '@turf/bbox-polygon'
import { featureCollection } from '@turf/helpers'
import {
  GeoGeometryObjects,
  geoMercator,
  GeoPath,
  geoPath,
  GeoPermissibleObjects,
  GeoProjection,
} from 'd3-geo'
import { event, select } from 'd3-selection'
import { zoom, zoomIdentity } from 'd3-zoom'
import { GeoJsonObject, MultiPolygon, Feature } from 'geojson'
import * as React from 'react'
import { ICameraProps } from 'ui/core/map/ICameraProps'
import * as MicromapSettings from 'ui/core/micromap/Micromap.settings'
import { SelectionStatus, LoadingStatus } from '../../../../../coreTypes/Ui'
import { IUsState } from 'coreTypes/tableOfContents/IState'
import { IRegion } from 'coreTypes/tableOfContents/IRegion'
import {
  RegionFeatureCollection,
  UsStateFeatureCollection,
} from 'coreTypes/tableOfContents/ITableOfContentsGeoJSON'
const styles = require('./SvgMinimap.scss')

const sizeOfDevice = (): number => {
  if (window != null && window.innerWidth != null) {
    const minSize = Math.min(window.innerWidth, window.innerHeight)
    return minSize
  }

  return 600
}
// type RegionGeoJson = FeatureCollection<MultiPolygon, IRegion>
// type StateGeoJson = FeatureCollection<MultiPolygon, IUsState>
export interface ISvgMinimapStateProps {
  readonly usStatesGeoJson: UsStateFeatureCollection
  readonly regionsGeoJson: RegionFeatureCollection
  readonly camera?: ICameraProps
  readonly isOffline: boolean
  readonly isExpanded: boolean
}

export interface ISvgMinimapPassedProps {}

export interface ISvgMinimapDispatchProps {
  handleClose(): any
  handleSelection(usStateShortName: string, regionPath: string): any
}

export interface IMinimapSvgProps
  extends ISvgMinimapStateProps,
    ISvgMinimapDispatchProps,
    ISvgMinimapPassedProps {}

export class SvgMinimapComponent extends React.Component<IMinimapSvgProps> {
  constructor(props) {
    super(props)
    this.zoomed = this.zoomed.bind(this)
    this.clickedRegion = this.clickedRegion.bind(this)
    this.clickedState = this.clickedState.bind(this)
    this.reset = this.reset.bind(this)
    this.renderData = this.renderData.bind(this)
    this.worldWidth = 500
    this.worldHeight = 500
    this.active = select(null)
  }

  private projection: GeoProjection = null
  private path: GeoPath<SVGPathElement, GeoPermissibleObjects> = null
  // tslint:disable:no-any
  private active: any
  private mapGroup: any
  private usStatesBackdrop: any
  private regionsBackdrop: any
  private selectedRegionsGroup: any
  private selectedStatesGroup: any
  private stateLabelsGroup: any
  private regionLabelsGroup: any
  private svg: any
  // private rect: any
  private zoom: any
  private strokeWidthEm: number
  private fontSizeEm: number
  private worldWidth: number
  private worldHeight: number

  // tslint:enable:no-any
  private containerElement: HTMLDivElement = null

  protected clickedRegion(d: Feature<MultiPolygon, IRegion>, item) {
    console.log('region', d)
    const { handleSelection, isExpanded } = this.props
    if (isExpanded !== true) {
      return
    }

    if (handleSelection == null) {
      return
    }

    window.requestAnimationFrame(() =>
      handleSelection(d.properties.state_short_name.toLowerCase(), d.properties.path)
    )
  }

  protected clickedState(d: Feature<MultiPolygon, IUsState>, item) {
    console.log('state', d)
    const { handleSelection, isExpanded } = this.props
    if (isExpanded !== true) {
      return
    }

    if (handleSelection == null) {
      return
    }

    window.requestAnimationFrame(() => handleSelection(d.properties.short_name.toLowerCase(), null))
  }

  public setCameraToItem(d) {
    // const { width, height } = this.props
    const width = this.worldWidth
    const height = this.worldHeight

    const bounds = this.path.bounds(d)
    const dx = bounds[1][0] - bounds[0][0]
    const dy = bounds[1][1] - bounds[0][1]
    const x = (bounds[0][0] + bounds[1][0]) / 2
    const y = (bounds[0][1] + bounds[1][1]) / 2
    const scale = Math.max(1, Math.min(8, 0.9 / Math.max(dx / width, dy / height)))
    const translate = [width / 2 - scale * x, height / 2 - scale * y]
    this.svg
      .transition()
      .duration(1000)
      .call(this.zoom.transform, zoomIdentity.translate(translate[0], translate[1]).scale(scale))
  }

  public reset() {
    this.active.classed('active', false)
    this.active = select(null)

    this.svg
      .transition()
      .duration(1000)
      .call(this.zoom.transform, zoomIdentity)
  }

  public zoomed() {
    const sw = 'stroke-width'
    this.usStatesBackdrop.style(sw, this.strokeWidthEm * 1.2 / event.transform.k + 'px')
    this.regionsBackdrop.style(sw, this.strokeWidthEm * 1.0 / event.transform.k + 'px')
    this.selectedRegionsGroup.style(sw, this.strokeWidthEm * 3 / event.transform.k + 'px')
    this.selectedStatesGroup.style(sw, this.strokeWidthEm * 2.5 / event.transform.k + 'px')
    this.stateLabelsGroup.style('font-size', this.fontSizeEm * 1 / event.transform.k + 'em')
    this.regionLabelsGroup.style('font-size', this.fontSizeEm * 0.87 / event.transform.k + 'em')
    this.mapGroup.attr('transform', event.transform)
  }

  public stopped() {
    if (event.defaultPrevented) {
      event.stopPropagation()
    }
  }

  public componentDidUpdate() {
    const { camera } = this.props
    this.renderData()
    this.centerCameraOnCamera(camera)
  }

  public centerCameraOnCamera(camera: ICameraProps) {
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

  // use D3 to set up our SVG container and its initial elements.
  private initializeElements() {
    this.strokeWidthEm = 1.2
    this.fontSizeEm = sizeOfDevice() < 500 ? 1.8 : 1
    this.svg = select(`.${styles.container}`)
      .append('svg')
      .attr('viewBox', `${0} ${0} ${this.worldWidth} ${this.worldHeight}`)
      .attr('preserveAspectRatio', 'xMidYMid meet')
      .on('click', this.stopped, true)

    this.svg
      .append('rect')
      .attr('class', styles.sneezeGuard)
      .attr('width', this.worldWidth)
      .attr('height', this.worldHeight)
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
  }

  public componentDidMount() {
    this.projection = geoMercator()
    // .scale(1000)
    // .translate([70 / 2, 70 / 2])

    this.zoom = zoom()
      .scaleExtent([1, 10])
      .extent([[0, 0], [this.worldHeight, this.worldWidth]])
      .on('zoom', this.zoomed)

    this.path = geoPath().projection(this.projection)

    this.initializeElements()

    this.svg.call(this.zoom) // delete this line to disable free zooming
    this.renderData()
    this.centerCameraOnCamera(this.props.camera)
  }

  public renderRegionsBackdrop(svgPathGenerator: GeoPath<SVGPathElement, GeoPermissibleObjects>) {
    const { regionsGeoJson } = this.props
    const obnoxiousClosure = this.clickedRegion
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

  public renderStateBackdrop(svgPathGenerator: GeoPath<SVGPathElement, GeoPermissibleObjects>) {
    const { usStatesGeoJson } = this.props
    const obnoxiousClosure = this.clickedState
    const stateSelection = this.usStatesBackdrop
      .selectAll(`path.js-d3-states`)
      .data([...usStatesGeoJson.features], x => {
        return x.properties.gid
      })

    stateSelection.attr('class', (item, index) => {
      const isInactive = item.properties.selectionStatus === SelectionStatus.Inactive
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

  public renderSelectedStates(svgPathGenerator: GeoPath<SVGPathElement, GeoPermissibleObjects>) {
    const { usStatesGeoJson } = this.props
    const selectedUsStatesFeatures =
      usStatesGeoJson == null
        ? []
        : usStatesGeoJson.features.filter(feature => {
            return feature.properties.selectionStatus === SelectionStatus.Selected
          })
    const selectedFeatureCollection = featureCollection(
      selectedUsStatesFeatures
    ) as UsStateFeatureCollection

    const selectedStateSelection = this.selectedStatesGroup
      .selectAll(`path.js-d3-selected-states`)
      .data([...selectedFeatureCollection.features], x => {
        return x.properties.gid
      })

    const obnoxiousClosure = this.clickedState
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

  public renderSelectedRegions(svgPathGenerator: GeoPath<SVGPathElement, GeoPermissibleObjects>) {
    const { regionsGeoJson } = this.props
    const selectedRegionFeatures =
      regionsGeoJson == null
        ? []
        : regionsGeoJson.features.filter(feature => {
            return feature.properties.loadingStatus === LoadingStatus.Pending
          })

    const loadingRegionsSelection = this.selectedRegionsGroup
      .selectAll(`path.js-d3-selected-regions`)
      .data([...selectedRegionFeatures], x => {
        return x.properties.gid
      })
    const obnoxiousClosure = this.clickedRegion
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

  public renderStateLabels(svgPathGenerator: GeoPath<SVGPathElement, GeoPermissibleObjects>) {
    const { usStatesGeoJson, isExpanded } = this.props
    const nonSelectedStates = {
      ...usStatesGeoJson,
      features: isExpanded
        ? usStatesGeoJson.features.filter(
            x => x.properties.selectionStatus !== SelectionStatus.Selected
          )
        : [],
    }
    const stateSelection = this.stateLabelsGroup
      .selectAll(`text.js-d3-states-labels`)
      .data([...nonSelectedStates.features], x => {
        return x.properties.gid
      })

    stateSelection.attr('class', (item, index) => {
      const isInactive = item.properties.selectionStatus === SelectionStatus.Inactive
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

  public renderRegionLabels(svgPathGenerator: GeoPath<SVGPathElement, GeoPermissibleObjects>) {
    const { regionsGeoJson, isExpanded } = this.props
    const regionsWithLabels = isExpanded
      ? regionsGeoJson.features.filter(
          x => x.properties.selectionStatus !== SelectionStatus.Inactive
        )
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

  public renderData() {
    const { usStatesGeoJson, regionsGeoJson } = this.props
    if (usStatesGeoJson == null || regionsGeoJson == null) {
      return
    }

    this.projection = getProjectionFromFeature(
      usStatesGeoJson,
      { width: this.worldWidth, height: this.worldHeight },
      Math.min(this.worldWidth, this.worldHeight) * 0.5
    )
    this.path = geoPath().projection(this.projection)
    this.renderRegionsBackdrop(this.path)
    this.renderStateBackdrop(this.path)
    this.renderSelectedRegions(this.path)
    this.renderSelectedStates(this.path)
    this.renderStateLabels(this.path)
    this.renderRegionLabels(this.path)
  }

  public render() {
    return <div className={styles.container} ref={element => (this.containerElement = element)} />
  }
}

export const getProjectionFromFeature = (
  feature: GeoJsonObject,
  dimensions: MicromapSettings.IDimensionsSettings,
  radius: number
): GeoProjection => {
  const { width, height } = dimensions
  const streamGeometry = feature as GeoGeometryObjects
  const diameter = radius * 2 * 0.9
  const lower = [(width - diameter) / 2, (height - diameter) / 2]
  const upper = [width - lower[0], height - lower[1]]
  const projection = geoMercator()
    .fitExtent([[lower[0], lower[1]], [upper[0], upper[1]]], streamGeometry)
    .translate([width, height])

  return projection
}
