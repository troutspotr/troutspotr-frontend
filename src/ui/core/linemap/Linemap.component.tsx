import React from 'react'
import { IMicromapCanvasProps, IMicromapCanvasState } from 'ui/core/micromap/canvas/Micromap.component.canvas';
import * as d3Scale from 'd3-scale'
import * as d3Shape from 'd3-shape'
import * as d3Select from 'd3-selection'
import * as d3Axis from 'd3-axis'
import { IAccessPointGeoJsonProps } from 'coreTypes/accessPoint/IAccessPoint';
import { SelectionStatus } from 'coreTypes/Ui';
import { findTick } from './TickGuide'
import clamp from 'lodash-es/clamp'
import { AccessPointFeature } from 'api/region/IRegionGeoJSON';

const styles = require('./Linemap.scss')

const margin = {
  left: 5,
  right: 5,
  top: 5,
  bottom: 5,
}

export interface ILineMapComponentProps extends IMicromapCanvasProps {
  lineOffsetLength: number,
  onLineOffsetChange(offset: number): void,
  onAccessPointClick(ap: AccessPointFeature): void
}

export class LineMapComponentCanvas extends React.PureComponent<
ILineMapComponentProps,
  IMicromapCanvasState
> {
  private rootElement: React.Ref<SVGSVGElement>;
  constructor(props) {
    super(props)
    this.rootElement = React.createRef()
    this.onTouchMove = this.onTouchMove.bind(this)
  }
  private getXScale(): d3Scale.ScaleLinear<number, number> {
    const {
      width,
    } = this.props.settings.dimensions

    const length = this.props.streamObject.stream.properties.length_mi

    return d3Scale.scaleLinear()
      .domain([0, length])
      .range([width - margin.right, margin.left])
  }

  private getYScale(): d3Scale.ScaleLinear<number, number> {
    const {
      height,
    } = this.props.settings.dimensions

    return d3Scale.scaleLinear()
      .domain([0, height])
      .range([0, height])
  }

  private getPath(xScale: d3Scale.ScaleLinear<number, number>, yScale: d3Scale.ScaleLinear<number, number>) {
    return d3Shape.line()
      .x(d => xScale(d[0]))
      .y(d => yScale(d[1]))
  }

  public componentDidMount() {
    this.renderXAxis()
  }

  public componentDidUpdate() {
    this.renderXAxis()
  }

  private renderFilledAccessPoint(xScale: d3Scale.ScaleLinear<number, number>, yScale: d3Scale.ScaleLinear<number, number>, ap: IAccessPointGeoJsonProps, diameter: number, color: string) {
    const length = this.props.streamObject.stream.properties.length_mi
    const x = xScale(ap.linear_offset * length)
    const y = yScale(this.props.settings.settings.accessPoints.radius)
    return <a className={styles.accessPoint} href={ap.slug}>
      <circle
        cx={x}
        cy={y}
        fill={color}
        r={diameter}/>
      <text
        className={styles.accessPointText}
        dominantBaseline='central'
        x={x}
        y={y}>
          {ap.alphabetLetter}
      </text>
    </a>
  }

  private renderAccessPoints(xScale: d3Scale.ScaleLinear<number, number>, yScale: d3Scale.ScaleLinear<number, number>) {
    const {
      accessPoints
    } = this.props.streamObject
    const unselectedAccessPoints = accessPoints.filter(x => x.properties.selectionStatus !== SelectionStatus.Selected)
    const selectedAccessPoints = accessPoints.filter(x => x.properties.selectionStatus === SelectionStatus.Selected)

    const unselectedPalAccessPoints = unselectedAccessPoints.filter(ap => ap.properties.bridgeType === 'publicTrout')
    const unselectedPrivateAccessPoints = unselectedAccessPoints.filter(ap => ap.properties.bridgeType === 'permissionRequired')

    const selectedPalAccessPoints = selectedAccessPoints.filter(ap => ap.properties.bridgeType === 'publicTrout')
    const selectedPrivateAccessPoints = selectedAccessPoints.filter(ap => ap.properties.bridgeType === 'permissionRequired')

    return <React.Fragment>
      <g className={styles.deselectedAccessPoints}>
        <g fontSize={this.props.settings.settings.accessPoints.publiclyFishableDiameter * 1.2}>
          {unselectedPalAccessPoints.map(ap => this.renderFilledAccessPoint(xScale, yScale, ap.properties, this.props.settings.settings.accessPoints.publiclyFishableDiameter, this.props.settings.colors.palSectionFill))}
        </g>
        <g fontSize={this.props.settings.settings.accessPoints.permissionRequiredDiameter * 1.2}>
          {unselectedPrivateAccessPoints.map(ap => this.renderFilledAccessPoint(xScale, yScale, ap.properties, this.props.settings.settings.accessPoints.permissionRequiredDiameter, this.props.settings.colors.troutSectionFill))}
        </g>
      </g>
      <g className={styles.selectedAccessPoints}>
        <g fontSize={this.props.settings.settings.accessPoints.publiclyFishableDiameter * 1.2}>
          {selectedPalAccessPoints.map(ap => this.renderFilledAccessPoint(xScale, yScale, ap.properties, this.props.settings.settings.accessPoints.publiclyFishableDiameter, this.props.settings.colors.palSectionFill))}
        </g>
        <g fontSize={this.props.settings.settings.accessPoints.permissionRequiredDiameter * 1.2}>
          {selectedPrivateAccessPoints.map(ap => this.renderFilledAccessPoint(xScale, yScale, ap.properties, this.props.settings.settings.accessPoints.permissionRequiredDiameter, this.props.settings.colors.troutSectionFill))}
        </g>
      </g>
    </React.Fragment>
  }

  private renderXAxis() {
    const length =this.props.streamObject.stream.properties.length_mi
    const tickGuide = findTick(length)
    const xAxis = g => g
      .attr('transform', `translate(0,${this.props.settings.dimensions.height})`)
      .attr('class', `js-tick-x-axis ${styles.xAxis}`)
      .call(d3Axis.axisBottom(this.getXScale())
        .ticks(Math.floor(length / tickGuide.secondary || 1))
        .tickSizeInner(-this.props.settings.dimensions.height)
        .tickSizeOuter(120)
      ).call(g => g.select('.domain').remove())
      .call(g => {
        g.selectAll(`.tick text`)
          .attr('style', (d, index) => index % (tickGuide.lessThan / tickGuide.primary) !== 0 ? 'display: none' : '')
          .attr('dy', (d, index) => '0px')
          .attr('y', (d, index) => '0px')
          .attr('dx', (d, index) => '-2px')
      })
      .call(g => {
        g.selectAll(`.tick line`)
          .attr('y2', (d, index) => index % (tickGuide.lessThan / tickGuide.primary) !== 0 ? '-3' : '-9')
          .attr('class', (d, index) => index % (tickGuide.lessThan / tickGuide.primary) !== 0 ? 'secondaryTick' : 'primaryTick')
      })

    
    const svgRoot = d3Select.select((this.rootElement as any).current)
    svgRoot.selectAll('g.js-tick-x-axis').remove()
    svgRoot.insert('g', ':first-child')
      .call(xAxis)

    return null
  }

  private renderLineOffset(xScale: d3Scale.ScaleLinear<number, number>, yScale: d3Scale.ScaleLinear<number, number>) {
    const {
      lineOffsetLength = null,
    } = this.props

    if (lineOffsetLength == null) {
      return null
    }

    const displayOffset = lineOffsetLength.toFixed(2)
    const xPosition = xScale(lineOffsetLength)
    const clampedX = clamp(xPosition, 0 + (margin.left * 2), this.props.settings.dimensions.width - (margin.right * 2))
    return <g className={styles.lineOffset}>
      <line x1={xPosition} y1="0" x2={xPosition} y2={this.props.settings.dimensions.height - 8} />
      <text filter="url(#solidBackdrop)" x={clampedX} y={this.props.settings.dimensions.height - 2}>{displayOffset}</text>
    </g>
  }

  private renderStream(xScale: d3Scale.ScaleLinear<number, number>, yScale: d3Scale.ScaleLinear<number, number>) {
    const pathGenerator = this.getPath(xScale, yScale)
    const x0 = this.props.streamObject.stream.properties.length_mi
    const x1 = 0
    const y = (this.props.settings.dimensions.height * 0.5)

    const path = pathGenerator([
      [x0, y],
      [x1, y],
    ])

    return <path d={path}/>
  }

  private renderPalSections(xScale: d3Scale.ScaleLinear<number, number>, yScale: d3Scale.ScaleLinear<number, number>) {
    const pathGenerator = this.getPath(xScale, yScale)
    const y = (this.props.settings.dimensions.height * 0.5)
    const {
      palSections,
    } = this.props.streamObject

    return palSections.map((section, index) => {
      const x0 = section.properties.start
      const x1 = section.properties.stop
      const path = pathGenerator([
        [x0, y],
        [x1, y],
      ])
  
      return <path key={section.properties.id} d={path}/>
    })
  }

  private renderBackdropSections(xScale: d3Scale.ScaleLinear<number, number>, yScale: d3Scale.ScaleLinear<number, number>) {
    const troutSectionBackdrop = this.renderTroutSections(xScale, yScale)
    const palSectionsBackdrop = this.renderPalSections(xScale, yScale)
    const {
      backdropWidth,
      publicSectionWidth,
      troutSectionWidth,
    } = this.props.settings.settings.stream

    return <React.Fragment>
      <g strokeWidth={backdropWidth + troutSectionWidth} stroke={this.props.settings.colors.backdropFill}>
        {troutSectionBackdrop}
      </g>
      <g strokeWidth={backdropWidth + publicSectionWidth} stroke={this.props.settings.colors.backdropFill}>
        {palSectionsBackdrop}
      </g>
    </React.Fragment>
  }

  private renderTroutSections(xScale: d3Scale.ScaleLinear<number, number>, yScale: d3Scale.ScaleLinear<number, number>) {
    const pathGenerator = this.getPath(xScale, yScale)
    const y = (this.props.settings.dimensions.height * 0.5)
    const {
      sections,
    } = this.props.streamObject

    return sections.map((section, index) => {
      const x0 = section.properties.start
      const x1 = section.properties.stop
      const path = pathGenerator([
        [x0, y],
        [x1, y],
      ])
  
      return <path key={section.properties.gid} d={path}/>
    })
  }
  public componentWillUpdate() {
    return
  }

  private onTouchMove(e: React.TouchEvent<SVGSVGElement>) {
    e.preventDefault()
    const leftOffset = ((this.rootElement as any).current as SVGElement).getBoundingClientRect().left
    const relativeOffset = e.targetTouches[0].clientX - leftOffset
    const scale = d3Scale.scaleLinear()
      .domain([0, margin.left, this.props.settings.dimensions.width - margin.right, this.props.settings.dimensions.width])
      .range([this.props.streamObject.stream.properties.length_mi, this.props.streamObject.stream.properties.length_mi, 0, 0])
      .clamp(true)
    const newOffsetInMiles = scale(relativeOffset)
    if (this.props.onLineOffsetChange != null) {
      this.props.onLineOffsetChange(newOffsetInMiles)
    }
  }

  public render() {
    const {
      width,
      height,
    } = this.props.settings.dimensions

    const xScale = this.getXScale()
    const yScale = this.getYScale()

    return <div className={styles.container}>
      <svg
        ref={this.rootElement}
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        onTouchMove={this.onTouchMove}
        className={styles.svgContainer}>
        <filter x="-0.05" y="-0.05" width="1.1" height="1.1" id="solidBackdrop">
          <feFlood floodColor={this.props.settings.colors.primaryLabelFill} floodOpacity="0.8"/>
          <feComposite in="SourceGraphic"/>
        </filter>
        <g className={'js-tick-x-axis'}>
          {this.renderXAxis()}
        </g>
        {this.renderLineOffset(xScale, yScale)}
        <g
          className={styles.accessPoints}
          strokeWidth={this.props.settings.settings.accessPoints.backdropWidth}
          stroke={this.props.settings.colors.backdropFill}>
          {this.renderAccessPoints(xScale, yScale)}
        </g>
        <g className={styles.backdrop} strokeWidth={this.props.settings.settings.stream.backdropWidth}>
          {this.renderBackdropSections(xScale, yScale)}
        </g>
        <g className={styles.streamGroup} stroke={this.props.settings.colors.streamFill} strokeWidth={1}>
          {this.renderStream(xScale, yScale)}
        </g>
        <g className={styles.troutSectionGroup} stroke={this.props.settings.colors.troutSectionFill} strokeWidth={this.props.settings.settings.stream.troutSectionWidth}>
          {this.renderTroutSections(xScale, yScale)}
        </g>
        <g className={styles.palSectionGroup}  stroke={this.props.settings.colors.palSectionFill} strokeWidth={this.props.settings.settings.stream.publicSectionWidth}>
          {this.renderPalSections(xScale, yScale)}
        </g>
      </svg>
    </div>
  }
}
