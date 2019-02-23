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
import { zoom as zoomBehavior, zoomIdentity } from 'd3-zoom'
import { GeoJsonObject, MultiPolygon, Feature, Point, FeatureCollection } from 'geojson'
import * as React from 'react'
import { ICameraProps } from 'ui/core/map/ICameraProps'
import * as MicromapSettings from 'ui/core/micromap/Micromap.settings'
import { SelectionStatus } from 'coreTypes/Ui'
import { IUsState } from 'coreTypes/tableOfContents/IState'
import { IRegion } from 'coreTypes/tableOfContents/IRegion'
import {
  RegionFeatureCollection,
  UsStateFeatureCollection,
} from 'coreTypes/tableOfContents/ITableOfContentsGeoJSON'
import { IStreamCentroid } from 'coreTypes/state/IStreamCentroid';
const styles = require('./SvgMinimap.scss')

const sizeOfDevice = (): number => {
  if (window != null && window.innerWidth != null) {
    const minSize = Math.min(window.innerWidth, window.innerHeight)
    return minSize
  }

  return 600
}

export const getProjectionFromFeature = (
  feature: GeoJsonObject,
  dimensions: MicromapSettings.IDimensionsSettings,
  diameter: number
): GeoProjection => {
  const { width, height } = dimensions
  const streamGeometry = feature as GeoGeometryObjects

  const lower = [(width - diameter) / 2, (height - diameter) / 2]
  const upper = [width - lower[0], height - lower[1]]
  const projection = geoMercator()
    .fitExtent([[lower[0], lower[1]], [upper[0], upper[1]]], streamGeometry)
    .translate([width, height])

  return projection
}

export interface ISvgMinimapStateProps {
  readonly usStatesGeoJson: UsStateFeatureCollection | null
  readonly displayedUsStatesGeoJson: UsStateFeatureCollection | null
  readonly displayedRegionsGeoJson: RegionFeatureCollection | null
  readonly selectedUsStatesGeoJson: UsStateFeatureCollection | null
  readonly selectedRegionGeoJson: RegionFeatureCollection | null

  readonly gpsGeoJson: FeatureCollection<any, any> | null
  readonly camera?: ICameraProps | null
  readonly isOffline: boolean | null
  readonly isExpanded: boolean | null
  readonly displayedStreams: FeatureCollection<Point, IStreamCentroid> | null
}

export interface ISvgMinimapPassedProps {}

export interface ISvgMinimapDispatchProps {
  handleClose(): any
  handleOpen(): any
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
  }

  private projection: GeoProjection = null
  private path: GeoPath<SVGPathElement, GeoPermissibleObjects> = null
  private mapGroup: any
  private usStatesBackdrop: any
  private regionsBackdrop: any
  private selectedRegionsGroup: any
  private displayedStreamCentroidsGroup: any
  private selectedStatesGroup: any
  private stateLabelsGroup: any
  private regionLabelsGroup: any

  private gpsGroup: any
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
    const { handleSelection, isExpanded, handleOpen } = this.props
    if (isExpanded !== true && handleOpen != null) {
      handleOpen()
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
    const { handleSelection, isExpanded, handleOpen } = this.props
    if (isExpanded !== true && handleOpen != null) {
      handleOpen()
      return
    }

    if (handleSelection == null) {
      return
    }

    window.requestAnimationFrame(() => handleSelection(d.properties.short_name.toLowerCase(), null))
  }

  public setCameraToItem(d) {
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
      .duration(700)
      .call(this.zoom.transform, zoomIdentity.translate(translate[0], translate[1]).scale(scale))
  }

  public reset() {
    event.stopPropagation()
    if (this.props.isExpanded === false) {
      this.props.handleOpen()
      return
    }

    this.props.handleClose()
  }

  public zoomed() {
    const sw = 'stroke-width'
    this.usStatesBackdrop.style(sw, this.strokeWidthEm * 1.2 / event.transform.k + 'em')
    this.regionsBackdrop.style(sw, this.strokeWidthEm * 1.0 / event.transform.k + 'em')
    this.selectedRegionsGroup.style(sw, this.strokeWidthEm * 3.3 / event.transform.k + 'em')
    this.selectedStatesGroup.style(sw, this.strokeWidthEm * 3 / event.transform.k + 'em')

    this.displayedStreamCentroidsGroup.style('font-size', this.fontSizeEm * (this.props.isExpanded ? 10 : 7) / event.transform.k + 'em')
    this.gpsGroup.style('font-size', this.fontSizeEm * (this.props.isExpanded ? 10 : 7) / event.transform.k + 'em')
    this.stateLabelsGroup.style('font-size', this.fontSizeEm * 1 / event.transform.k + 'em')
    this.regionLabelsGroup.style('font-size', this.fontSizeEm * 0.87 / event.transform.k + 'em')

    this.mapGroup.attr('transform', event.transform)
  }

  public stopped() {
    if (event.defaultPrevented) {
      event.stopPropagation()
    }
  }

  public componentDidUpdate(prevProps: ISvgMinimapStateProps) {
    const { camera, isExpanded } = this.props

    // de-activate zoom if its collapsed. This disabled interactivity.
    if (isExpanded === false) {
      this.svg.on('.zoom', null)
    } else {
      this.svg.call(this.zoom)
    }

    this.renderData(prevProps)

    const previousCamera = prevProps.camera
    if (
      previousCamera !== camera &&
      camera != null
      // bboxesAreEqual(previousCamera, camera) === false
    ) {
      this.centerCameraOnCamera(camera)
    }
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
    this.strokeWidthEm = 0.1
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
    const defs = this.svg.append('defs')

    const filter = defs
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
    this.displayedStreamCentroidsGroup = this.mapGroup.append('g').attr('class', 'displayed-stream-centroids')
    this.gpsGroup = this.mapGroup.append('g').attr('class', 'displayed-gps-centroids')
    this.stateLabelsGroup = this.mapGroup.append('g').attr('class', 'state-labels')
    this.regionLabelsGroup = this.mapGroup.append('g').attr('class', 'region-labels')
  }

  public componentDidMount() {
    this.projection = geoMercator()

    this.zoom = zoomBehavior()
      .scaleExtent([1, 18])
      .extent([[0, 0], [this.worldHeight, this.worldWidth]])
      .on('zoom', this.zoomed)

    this.path = geoPath().projection(this.projection).pointRadius(1)

    this.initializeElements()

    this.svg.call(this.zoom) // delete this line to disable free zooming
    this.renderData(null)
    this.centerCameraOnCamera(this.props.camera)
  }

  public renderRegionsBackdrop(
    svgPathGenerator: GeoPath<SVGPathElement, GeoPermissibleObjects>,
    regions: RegionFeatureCollection
  ) {
    const obnoxiousClosure = this.clickedRegion
    const regionSelection = this.regionsBackdrop
      .selectAll(`path.js-d3-regions`)
      .data(regions.features, x => {
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

  public renderStateBackdrop(
    svgPathGenerator: GeoPath<SVGPathElement, GeoPermissibleObjects>,
    usStatesGeoJson: UsStateFeatureCollection
  ) {
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

  public renderSelectedStates(
    svgPathGenerator: GeoPath<SVGPathElement, GeoPermissibleObjects>,
    usStatesGeoJson: UsStateFeatureCollection
  ) {
    const selectedUsStatesFeatures = usStatesGeoJson == null ? [] : usStatesGeoJson.features
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

  public renderSelectedRegions(
    svgPathGenerator: GeoPath<SVGPathElement, GeoPermissibleObjects>,
    regionsGeoJson: RegionFeatureCollection
  ) {
    const selectedRegionFeatures = regionsGeoJson == null ? [] : regionsGeoJson.features
    const selectedRegionSelection = this.selectedRegionsGroup
      .selectAll(`path.js-d3-selected-regions`)
      .data([...selectedRegionFeatures], x => {
        return x.properties.gid
      })
    const obnoxiousClosure = this.clickedRegion
    selectedRegionSelection
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
    selectedRegionSelection
      .exit()
      .transition()
      .duration(300)
      .style('opacity', 0)
      .remove()
      .duration(300)
      .style('opacity', 0)
      .remove()
  }

// tslint:disable-next-line: cognitive-complexity
  public renderStateLabels(
    svgPathGenerator: GeoPath<SVGPathElement, GeoPermissibleObjects>,
    usStatesGeoJson: UsStateFeatureCollection
  ) {
    const { isExpanded } = this.props
    const hasSelectedState = (this.props.selectedUsStatesGeoJson.features == null || this.props.selectedUsStatesGeoJson.features.length === 0) === false
    const nonSelectedStates = {
      ...usStatesGeoJson,
      features: isExpanded ? usStatesGeoJson.features : [],
    }
    const stateSelection = this.stateLabelsGroup
      .selectAll(`text.js-d3-states-labels`)
      .data([...nonSelectedStates.features.filter(item => {
        const isThisStateSelected = hasSelectedState && this.props.selectedUsStatesGeoJson.features.find(x => x.properties.short_name === item.properties.short_name) != null
        return isThisStateSelected === false
      })], x => {
        return x.properties.gid
      })

    const obnoxiousClosure = this.clickedState

    stateSelection.attr('class', (item, index) => {
      const isInactive = item.properties.selectionStatus === SelectionStatus.Inactive
      const className = isInactive ? styles.stateLabelsInactive : styles.stateLabels
      return `js-d3-states-labels ${className}`
    })
    
    
    stateSelection
      .enter()
      .append('text')
      .attr('data-name', item => item.properties.short_name)
      .text(item => {
        const isThisStateSelected = hasSelectedState && this.props.selectedUsStatesGeoJson.features.find(x => x.properties.short_name === item.properties.short_name) != null
        if (isThisStateSelected === true) {
          return ''
        }

        if (hasSelectedState) {
          return item.properties.name.toUpperCase()
        }

        return item.properties.short_name.toUpperCase()
      })
      .attr('x', d => {
        return svgPathGenerator.centroid(d)[0]
      })
      .attr('y', d => {
        return svgPathGenerator.centroid(d)[1]
      })
      .attr('class', (item, index) => {
        return `js-d3-states-labels ${styles.stateLabels}`
      })
      .on('click', function(item) {
        obnoxiousClosure(item, this)
      })
      .attr('filter', 'url(#solid)')
      .style('opacity', 0)
      .transition()
      .delay(200)
      .duration(300)
      .style('opacity', 1)
    
    stateSelection
      .text(item => {
        const isThisStateSelected = hasSelectedState && this.props.selectedUsStatesGeoJson.features.find(x => x.properties.short_name === item.properties.short_name) != null
        if (isThisStateSelected === true) {
          return ''
        }

        if (hasSelectedState) {
          return item.properties.name.toUpperCase()
        }

        return item.properties.short_name.toUpperCase()
      })
    stateSelection
      .exit()
      .transition()
      .duration(100)
      .style('opacity', 0)
      .remove()
  }

  public renderRegionLabels(
    svgPathGenerator: GeoPath<SVGPathElement, GeoPermissibleObjects>,
    regionsGeoJson: RegionFeatureCollection
  ) {
    const { isExpanded } = this.props
    const regionsWithLabels = isExpanded ? regionsGeoJson.features : []
    const regionSelection = this.regionLabelsGroup
      .selectAll(`text.js-d3-regions-labels`)
      .data([...regionsWithLabels], item => {
        return item.properties.gid
      })
    const obnoxiousClosure = this.clickedRegion

    regionSelection.text(item => {
      return `${item.properties.isCached === true ? '✅   ' : ''}${item.properties.long_name}`
    })
    regionSelection
      .enter()
      .append('text')
      .attr('data-name', item => item.properties.long_name)
      .text(item => {
        return `${item.properties.isCached === true ? '✅   ' : ''}${item.properties.long_name}`
      })
      .attr('x', d => {
        return svgPathGenerator.centroid(d)[0]
      })
      .attr('y', d => {
        return svgPathGenerator.centroid(d)[1]
      })
      .attr('class', (item, index) => {
        return `js-d3-regions-labels ${styles.regionLabels}`
      })
      .on('click', function(item) {
        obnoxiousClosure(item, this)
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

  public renderData(prevProps: ISvgMinimapStateProps) {
    const {
      usStatesGeoJson,
      displayedUsStatesGeoJson,
      displayedRegionsGeoJson,
      displayedStreams,
      selectedRegionGeoJson,
      selectedUsStatesGeoJson,
    } = this.props
    if (
      displayedUsStatesGeoJson == null ||
      displayedRegionsGeoJson == null ||
      usStatesGeoJson == null
    ) {
      return
    }

    const diameter = Math.min(this.worldWidth, this.worldHeight) * 0.5
    this.projection = getProjectionFromFeature(
      usStatesGeoJson,
      { width: this.worldWidth, height: this.worldHeight },
      diameter
    )
    this.path = geoPath().projection(this.projection).pointRadius(1)
    this.renderRegionsBackdrop(this.path, displayedRegionsGeoJson)
    this.renderStateBackdrop(this.path, displayedUsStatesGeoJson)
    this.renderSelectedRegions(this.path, selectedRegionGeoJson)
    this.renderDisplayedStreamCentroids(this.path, displayedStreams)
    this.renderSelectedStates(this.path, selectedUsStatesGeoJson)
    this.renderStateLabels(this.path, displayedUsStatesGeoJson)
    this.renderRegionLabels(this.path, displayedRegionsGeoJson)
    this.renderGpsCentroid(this.path, this.props.gpsGeoJson)
  }
  private renderGpsCentroid(svgPathGenerator: GeoPath<SVGPathElement, GeoPermissibleObjects>, gpsGeoJson: FeatureCollection<any, any>): any {
    const displayedGpsCentroids = gpsGeoJson == null ? [] : gpsGeoJson.features
    const displayedGpsCentroidSelection = this.gpsGroup
      .selectAll(`circle.js-d3-displayed-gps-centroids`)
      .data(displayedGpsCentroids, x => {
        return x.properties.gid
      })
    displayedGpsCentroidSelection
      .enter()
      .append('circle')
      .attr('class', `js-d3-displayed-gps-centroids ${styles.gpsCentroids}`)
      .attr('cx', (d: Feature<Point, IStreamCentroid>) => {
        return this.projection(d.geometry.coordinates  as [number, number])[0]
      })
      .attr('cy', d => this.projection(d.geometry.coordinates  as [number, number])[1])
      .attr('r', '0.05em')
      .style('opacity', 0)
      .transition()
      .duration(400)
      .style('opacity', 0.9)
    displayedGpsCentroidSelection
      .exit()
      .transition()
      .duration(300)
      .style('opacity', 0)
      .remove()
      .duration(300)
      .style('opacity', 0)
      .remove()
  }

  private renderDisplayedStreamCentroids(
    svgPathGenerator: GeoPath<SVGPathElement, GeoPermissibleObjects>,
    displayedStreams: FeatureCollection<Point, IStreamCentroid>): any {
      const selectedStreamCentroids = displayedStreams == null ? [] : displayedStreams.features
      const selectedStreamCentroidsSelection = this.displayedStreamCentroidsGroup
        .selectAll(`circle.js-d3-displayed-stream-centroids`)
        .data(selectedStreamCentroids, x => {
          return x.properties.gid
        })
      selectedStreamCentroidsSelection
        .enter()
        .append('circle')
        .attr('class', d => {
          return d.properties.selectionStatus === 'selected'
            ? `js-d3-displayed-stream-centroids ${styles.selectedStreamCentroids}`
            : `js-d3-displayed-stream-centroids ${styles.streamCentroids}`
        })
        .attr('cx', (d: Feature<Point, IStreamCentroid>) => {
          return this.projection(d.geometry.coordinates  as [number, number])[0]
        })
        .attr('cy', d => this.projection(d.geometry.coordinates  as [number, number])[1])
        .attr('r', d => {
          return d.properties.selectionStatus === 'selected'
            ? '0.07em'
            : '0.05em'
        })
        .style('opacity', 0)
        .transition()
        .duration(400)
        .style('opacity', 0.9)
      selectedStreamCentroidsSelection
        .exit()
        .transition()
        .duration(300)
        .style('opacity', 0)
        .remove()
        .duration(300)
        .style('opacity', 0)
        .remove()
  }

  public render() {
    const containerClass = this.props.isExpanded ? styles.container : styles.containerExpanded
    return <div className={containerClass} ref={element => (this.containerElement = element)} />
  }
}
