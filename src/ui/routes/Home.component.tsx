import * as React from 'react'
import { connect } from 'react-redux'
import { FooterComponent } from 'ui/page/footer/Footer.component'
import { PageLayoutComponent } from 'ui/page/PageLayout.component'
import { HeaderContainer } from 'ui/page/header/Header.container'
import { fetchTableOfContents, Theme } from 'ui/core/Core.redux'
import { createStructuredSelector } from 'reselect'
import { IReduxState } from '../redux/Store.redux.rootReducer'
import { themeSelector } from '../core/Core.selectors'
import { MapContainer } from 'ui/routes/map/Map.container'
import { isExpandedSelector } from '../page/header/minimap/Minimap.selectors'
import { setIsExpanded } from '../page/header/minimap/Minimap.redux'
export const HomeComponent = props => {
  return <div />
}

export interface IPageLayoutDispatchProps {
  fetchTableOfContents?(): any
  resetMinimap(): void
}

export interface IPageLayoutStateProps {
  theme: Theme
  readonly isExpanded: boolean
}

export interface IPageLayoutProps extends IPageLayoutStateProps, IPageLayoutDispatchProps {}

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
    return <FooterComponent />
  }

  public renderHeader() {
    return <HeaderContainer />
  }

  public renderContent() {
    return (
      <>
        <MapContainer key="map" />
        {this.props.children}
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
      />
    )
  }
}

const mapDispatchToProps: IPageLayoutDispatchProps = {
  fetchTableOfContents: () => fetchTableOfContents(),
  resetMinimap: () => setIsExpanded(false),
}

export const pageLayoutProps = createStructuredSelector<IReduxState, IPageLayoutStateProps>({
  theme: themeSelector,
  isExpanded: isExpandedSelector,
})

const mapStateToProps = (reduxState: IReduxState): IPageLayoutStateProps =>
  pageLayoutProps(reduxState)

export const PageContainer = connect(mapStateToProps, mapDispatchToProps)(PageContainerComponent)
