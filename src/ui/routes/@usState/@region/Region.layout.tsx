import * as React from 'react'
import { View } from 'ui/core/Core.redux'
import { LoadingStatus } from 'coreTypes/Ui'

export interface IRegionLayoutDispatchProps {
  fetchRegionData(selectedState: string, selectedRegion: string): any
}

export interface IRegionLayoutStateProps {
  view: View
  selectedState: string
  selectedRegion: string
  regionLoadingStatus: LoadingStatus
  hasAgreedToTerms: boolean
}

export interface IRegionLayourProps extends IRegionLayoutDispatchProps, IRegionLayoutStateProps {
  children: React.ReactNode
}
export class RegionLayout extends React.Component<IRegionLayourProps> {
  public componentDidMount() {
    console.log('here we are a brand new day!')
    const { fetchRegionData, selectedState, selectedRegion } = this.props
    if (selectedState == null || selectedRegion == null) {
      return
    }
    fetchRegionData(selectedState, selectedRegion)
  }

  public componentWillReceiveProps(nextProps) {
    console.log('gettin stuffs!')
    const { selectedState, selectedRegion } = nextProps
    if (selectedState == null || selectedRegion == null) {
      return
    }
    const nextCombo = (selectedState + selectedRegion).toLowerCase()
    const currentCombo = (this.props.selectedState + this.props.selectedRegion).toLowerCase()
    if (nextCombo !== currentCombo) {
      this.props.fetchRegionData(selectedState, selectedRegion)
    }
  }

  public renderLoading() {
    // if (this.props.regionLoadingStatus === LOADING_CONSTANTS.IS_PENDING) {
    //   return <LoadingComponent title="" subTitle={'Loading New Region'} />
    // }

    return null
  }

  public renderMap() {
    // const { view } = this.props
    // const isVisible = view === MAP
    // return <MapContainer isVisible={isVisible} />
    return null
  }

  public renderList() {
    // const { view, selectedStream } = this.props
    // const isVisible = view === LIST && isEmpty(selectedStream)
    // return <CountyListContainer isVisible={isVisible} />
    return null
  }

  public render() {
    console.log('rendering a region')
    return null
    // const { view, hasAgreedToTerms } = this.props
    // if (hasAgreedToTerms === false) {
    //   return null
    // }
    // console.log('here we are in the region')
    // return (
    //   <div className={classes.regionContainer}>
    //     {this.renderLoading()}
    //     {this.renderList()}
    //     {this.renderMap()}
    //     {view === View.list && this.props.children}
    //   </div>
    // )
  }
}
