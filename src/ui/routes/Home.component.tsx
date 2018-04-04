import * as React from 'react'
import { connect } from 'react-redux'
import { FooterComponent } from 'ui/page/footer/Footer.component'
import { PageLayoutComponent } from 'ui/page/PageLayout.component'
import { HeaderContainer } from 'ui/page/header/Header.container'
import { MapContainer } from 'ui/routes/map/Map.container'
import { OfflineContainer } from '../page/offline/Offline.container'
import { IPageLayoutProps } from '../page/IPageLayout'
import { homeContainerMapDispatchToProps, homeComponentMapStateToProps } from './Home.container'
import ErrorBoundaryComponent from 'ui/core/errorBoundary/ErrorBoundary.component'
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
      setTimeout(() => fetchTableOfContents(), 200)
    }
  }

  public renderFooter() {
    return (
      <ErrorBoundaryComponent onError={this.props.handleError}>
        <FooterComponent />
      </ErrorBoundaryComponent>
    )
  }

  public renderHeader() {
    return (
      <ErrorBoundaryComponent onError={this.props.handleError}>
        <HeaderContainer />
      </ErrorBoundaryComponent>
    )
  }

  public renderContent() {
    return (
      <>
        <ErrorBoundaryComponent onError={this.props.handleError}>
          <OfflineContainer />
        </ErrorBoundaryComponent>
        <ErrorBoundaryComponent onError={this.props.handleError}>
          <MapContainer key="map" />
        </ErrorBoundaryComponent>
        <ErrorBoundaryComponent onError={this.props.handleError}>
          {this.props.children}
        </ErrorBoundaryComponent>
      </>
    )
  }

  public render() {
    return (
      <PageLayoutComponent
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
