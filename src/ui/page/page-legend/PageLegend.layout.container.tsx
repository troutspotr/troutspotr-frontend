import React, { PureComponent } from 'react'
import { MessageOverlayComponent } from '../../core/messageOverlay/MessageOverlay.component';
import { createStructuredSelector } from 'reselect';
import { IReduxState } from '../../redux/Store.redux.rootReducer';
import { connect } from 'react-redux';
import { CSSTransition } from 'react-transition-group'
import { isPageLegendShownSelector, cachedRegionsTextSelector } from './PageLegend.selectors';

export interface IPageLegendDispatchProps {

}

export interface IPageLegendStateProps {
  cachedRegionsText: string,
  isPageLegendShown: boolean,
}

export interface IPageLegendPassedProps {

}

export interface IPageLegendProps extends IPageLegendDispatchProps, IPageLegendStateProps, IPageLegendPassedProps {
}

export class PageLegendLayoutComponent extends PureComponent<IPageLegendProps> {
  public render() {
    const {
      cachedRegionsText,
      isPageLegendShown,
    } = this.props


    return (<CSSTransition timeout={500} classNames='page-legend-' in={isPageLegendShown} unmountOnExit={true}>
      <MessageOverlayComponent position='top'>{cachedRegionsText}</MessageOverlayComponent>
      {/* <div style={{backgroundColor: 'yellowgreen', height: '90px'}}>hello</div> */}
    </CSSTransition>)

  }
}

export const dispatchToProps = {

}

export const pageMessageBoxPositionSelector = (state: IReduxState): string => 'top'

export const pageMessageBoxPropsSelector = createStructuredSelector<IReduxState, IPageLegendStateProps>({
  cachedRegionsText: cachedRegionsTextSelector,
  isPageLegendShown: isPageLegendShownSelector,
})

export const stateToProps = (reduxState: IReduxState) => pageMessageBoxPropsSelector(reduxState)

export const PageLegendContainer = connect<IPageLegendStateProps, IPageLegendDispatchProps, IPageLegendPassedProps>(stateToProps, dispatchToProps)(PageLegendLayoutComponent)
