import * as React from 'react'
import { connect } from 'react-redux'
import { FooterComponent } from '../page/footer/Footer.component'
import { PageLayoutComponent } from '../page/PageLayout.component'
import { HeaderContainer } from '../page/header/Header.container'
import { MapContainer } from './map/Map.container'
import { MapLayoutComponent } from '../core/map/MapLayout.component'
import { OfflineContainer } from '../page/offline/Offline.container'
import { IPageLayoutProps } from '../page/IPageLayout'
import { homeContainerMapDispatchToProps, homeComponentMapStateToProps } from './Home.container'
import ErrorBoundaryComponent from '../core/errorBoundary/ErrorBoundary.component'
import { PageLegendContainer } from '../page/page-legend/PageLegend.layout.container'
import PageTitleContainer from 'ui/page/pageTitle/PageTitle.container'
import { DetailsOverlayContainer } from 'ui/routes/map/overlays/DetailsOverlay.container';
import { RegulationsOverlayContainer } from 'ui/routes/map/overlays/regulations/RegulationsOverlay.container'
import { LegalModalContainer } from 'ui/routes/legal/modal/Legal.modal.container';

export const HomeComponent = props => {
  return <div />
}

class PageContainerComponent extends React.PureComponent<IPageLayoutProps> {
  constructor(props) {
    super(props)
  }

  public componentWillMount() {
    const { fetchTableOfContents } = this.props
    if (fetchTableOfContents != null) {
      setTimeout(() => fetchTableOfContents(), 1000)
    }
  }

  public renderFooter() {
    return (
      <ErrorBoundaryComponent onError={this.props.handleError}>
        <FooterComponent />
      </ErrorBoundaryComponent>
    )
  }

  public renderLegend() {
    return (<ErrorBoundaryComponent onError={this.props.handleError}>
      <PageLegendContainer />
    </ErrorBoundaryComponent>)
  }

  public renderHeader() {
    return (
      <ErrorBoundaryComponent onError={this.props.handleError}>
        <HeaderContainer />
      </ErrorBoundaryComponent>
    )
  }

  public renderPageTitleComponent() {
    return <ErrorBoundaryComponent onError={this.props.handleError}>
      <PageTitleContainer />
    </ErrorBoundaryComponent>
  }

  public renderContent() {
    const detailsOverlay = <DetailsOverlayContainer />
    const restrictionsOverlay = <RegulationsOverlayContainer />
    const termsOfServiceComponent = this.props.hasAgreedToTerms === false && <LegalModalContainer />
    return (
      <>
        {this.renderPageTitleComponent()}
        <ErrorBoundaryComponent onError={this.props.handleError}>
          <OfflineContainer />
        </ErrorBoundaryComponent>
        <ErrorBoundaryComponent onError={this.props.handleError}>
          <MapLayoutComponent
            topOverlay={detailsOverlay}
            bottomOverlay={restrictionsOverlay}
            middleOverlay={null}
            map={<MapContainer key="map" />} />
        </ErrorBoundaryComponent>
        <ErrorBoundaryComponent onError={this.props.handleError}>
          {this.props.children}
        </ErrorBoundaryComponent>
        <ErrorBoundaryComponent onError={this.props.handleError}>
          {termsOfServiceComponent}
        </ErrorBoundaryComponent>
      </>
    )
  }

  public render() {
    return (
      <PageLayoutComponent
        hasAgreedToTerms={this.props.hasAgreedToTerms}
        legend={this.renderLegend()}
        header={this.renderHeader()}
        footer={this.renderFooter()}
        content={this.renderContent()}
        theme={this.props.theme}
        resetMinimap={this.props.resetMinimap}
        isExpanded={this.props.isExpanded}
        handleError={this.props.handleError}
      />
    )
  }
}

export const PageContainer = connect(homeComponentMapStateToProps, homeContainerMapDispatchToProps)(
  PageContainerComponent
)
