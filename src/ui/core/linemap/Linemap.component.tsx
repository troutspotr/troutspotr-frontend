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
import Measure from 'react-measure'
import debounce from 'lodash-es/debounce'
import { IStream } from 'coreTypes/stream/IStream';
import { StreamFeature } from 'api/region/IRegionGeoJSON';

const styles = require('./Linemap.scss')

const margin = {
  left: 5,
  right: 5,
  top: 5,
  bottom: 5,
}

export interface ILineMapComponentStateProps extends IMicromapCanvasProps {
  lineOffsetLength: number | null,
}

export interface ILineMapComponentPassedProps {
  onLineOffsetChange(offset: number, radius: number, stream: StreamFeature): void
  onAccessPointSelect(selectedStream: IStream, ap: IAccessPointGeoJsonProps)
}

export interface ILineMapComponentProps extends ILineMapComponentStateProps, ILineMapComponentPassedProps {

}

export interface IRizisableState {
  bottom: number,
  height: number,
  left: number,
  right: number,
  top: number,
  width: number,
  priorDragEvent: Partial<React.Touch> | null,
}

export class LineMapComponentCanvas extends React.Component<
ILineMapComponentProps,
  IRizisableState
> {
  private rootElement: React.Ref<SVGSVGElement>;
  private debouncedResize: any;
  constructor(props) {
    super(props)
    this.rootElement = React.createRef()
    // this.onTouchMove = debounce(this.onTouchMove, 60)
    this.onTouchMove = this.onTouchMove.bind(this)
    this.onTouchEnd = this.onTouchEnd.bind(this)
    const debouncedResize = debounce(this.resizeEvent, 60, { leading: true, maxWait: 60 })
    this.debouncedResize = debouncedResize.bind(this)
    this.state = {
      width: 100,
      height: 24,
      bottom: 0,
      left: 0,
      right: 0,
      top: 0,
      priorDragEvent: null,
    }
  }

  private resizeEvent(contentRect) {
    // eslint-disable-next-line react/no-set-state
    this.setState((state) => {
      return {
        ...state,
        margin,
        width: contentRect.bounds.width,
        height: contentRect.bounds.height,
        bottom: contentRect.bounds.bottom,
        left: contentRect.bounds.left,
        right: contentRect.bounds.right,
        top: contentRect.bounds.top,
      }
    })
  }

  private getXScale(): d3Scale.ScaleLinear<number, number> {
    const {
      width,
    } = this.state

    const length = this.props.streamObject.stream.properties.length_mi

    return d3Scale.scaleLinear()
      .domain([0, length])
      .range([width - margin.right, margin.left])
  }

  private getYScale(): d3Scale.ScaleLinear<number, number> {
    const {
      height,
    } = this.state

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

  public onAccessPointClick(event: any, ap: IAccessPointGeoJsonProps) {
    event.preventDefault()
    if (this.props.onAccessPointSelect == null) {
      return
    }

    this.props.onAccessPointSelect(this.props.streamObject.stream.properties, ap)
  } 

  private renderFilledAccessPoint(xScale: d3Scale.ScaleLinear<number, number>, yScale: d3Scale.ScaleLinear<number, number>, ap: IAccessPointGeoJsonProps, diameter: number, color: string) {
    const length = this.props.streamObject.stream.properties.length_mi
    const x = xScale(ap.linear_offset * length)
    const y = yScale(this.props.settings.settings.accessPoints.radius)
// tslint:disable-next-line: jsx-no-lambda
    return <a className={styles.accessPoint} key={ap.gid} href={ap.slug} onClick={(e) => this.onAccessPointClick(e, ap)}>
      <circle
        cx={x}
        className={styles.accessPointHitbox}
        cy={y}
        r={diameter * 1.5}/>
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
    const unselectedAccessPoints = accessPoints.filter(x => x.properties.selectionStatus === SelectionStatus.Inactive)
    const selectedAccessPoints = accessPoints.filter(
      x => x.properties.selectionStatus === SelectionStatus.Selected
      || x.properties.selectionStatus === SelectionStatus.Active)

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

// tslint:disable-next-line: cognitive-complexity
  private renderXAxis() {
    const length =this.props.streamObject.stream.properties.length_mi
    const tickGuide = findTick(length)
    const xAxis = group => group
      .attr('transform', `translate(0,${this.state.height})`)
      .attr('class', `js-tick-x-axis ${styles.xAxis}`)
      .call(d3Axis.axisBottom(this.getXScale())
        .ticks(Math.floor(this.state.width / 50 || 1))
        .tickSizeInner(-this.state.height)
        .tickSizeOuter(120)
      ).call(g => g.select('.domain').remove())
      .call(g => {
        g.selectAll(`.tick text`)
          .attr('style', (d, index) => index % (tickGuide.lessThan / tickGuide.primary) !== 0 ? 'display: display' : '')
          .attr('class', (d, index) => index % (tickGuide.lessThan / tickGuide.primary) !== 0 ? 'secondaryTick' : 'primaryTick')
          .attr('dy', (d, index) => '0px')
          .attr('y', (d, index) => '0px')
          .attr('dx', (d, index) => '-2px')
      })
      .call(g => {
        g.selectAll(`.tick line`)
          .attr('y2', '-9')
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
    const clampedX = clamp(xPosition, 0 + (margin.left * 2), this.state.width - (margin.right * 2))
    return <g className={styles.lineOffset}>
      <line x1={xPosition} y1="0" x2={xPosition} y2={this.state.height - 8} />
      <text filter="url(#solidBackdrop)" x={clampedX} y={this.state.height - 2}>{displayOffset}</text>
    </g>
  }

  private renderStream(xScale: d3Scale.ScaleLinear<number, number>, yScale: d3Scale.ScaleLinear<number, number>) {
    const pathGenerator = this.getPath(xScale, yScale)
    const x0 = this.props.streamObject.stream.properties.length_mi
    const x1 = 0
    const y = (Math.floor(this.state.height * 0.63))

    const path = pathGenerator([
      [x0, y],
      [x1, y],
    ])

    return <path d={path}/>
  }

  private renderPalSections(xScale: d3Scale.ScaleLinear<number, number>, yScale: d3Scale.ScaleLinear<number, number>) {
    const pathGenerator = this.getPath(xScale, yScale)
    const y = (Math.floor(this.state.height * 0.63))
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
    const y = (Math.floor(this.state.height * 0.63))
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

  private onTouchEnd(e: React.TouchEvent<SVGSVGElement>) {
    this.props.onLineOffsetChange(null, 0, this.props.streamObject.stream)
    this.setState((state) => {
      return {
        ...state,
        priorDragEvent: null,
      }
    })
  }

  private onTouchMove(e: React.TouchEvent<SVGSVGElement>) {
    try {
      e.preventDefault()
    } catch (error) {
      console.error(error)
    }
    const firstTouch = e.targetTouches[0]
    const { clientX, clientY } = firstTouch

    const xDelta = this.state.priorDragEvent == null ? null : this.state.priorDragEvent.clientX - clientX
    const yDelta = this.state.priorDragEvent == null ? null : this.state.priorDragEvent.clientY - clientY

    // const slope = xDelta == null ? null : 
    const isAssumedToBeMovingVertically = xDelta === 0 && yDelta !== 0 || Math.abs(yDelta / xDelta) > 1.8
    const leftOffset = ((this.rootElement as any).current as SVGElement).getBoundingClientRect().left
    const relativeOffset = clientX - leftOffset
    const scale = d3Scale.scaleLinear()
      .domain([0, margin.left, this.state.width - margin.right, this.state.width])
      .range([this.props.streamObject.stream.properties.length_mi, this.props.streamObject.stream.properties.length_mi, 0, 0])
      .clamp(true)
    const usePriorScale = isAssumedToBeMovingVertically && this.props.lineOffsetLength != null
    const newOffsetInMiles = usePriorScale ? this.props.lineOffsetLength : scale(relativeOffset)

    const scaleRadius = d3Scale.scalePow()
      .exponent(0.3)
      .domain([0, window.innerHeight * 0.75, window.innerHeight])
      .range([this.props.streamObject.stream.properties.length_mi * 0.2, 0.1, 0.03])
    
    const radius = scaleRadius(clientY)
    if (this.props.onLineOffsetChange != null) {
      this.props.onLineOffsetChange(newOffsetInMiles, radius, this.props.streamObject.stream)
      this.setState((state) => {
        return {
          ...state,
          priorDragEvent: { clientX: firstTouch.clientX, clientY: firstTouch.clientY },
        }
      })
    }
  }

  private renderContent() {
    const {
      width,
      height,
    } = this.state
    const xScale = this.getXScale()
    const yScale = this.getYScale()
    return (<svg
        ref={this.rootElement}
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        onTouchMove={this.onTouchMove}
        onTouchEnd={this.onTouchEnd}
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
      </svg>)
  }

  public render() {
    // if you plan to re-use this container,
    // then try to pre-calculate just one bounds,
    // and share those dimensions with the rest of the team.
    const content = this.renderContent()

    return (<Measure
      bounds={true}
      onResize={this.debouncedResize}
    >
      {({ measureRef }) => (
        <div className={styles.container} ref={measureRef}>
          {content}
        </div>
      )}
    </Measure>)
  }
}
