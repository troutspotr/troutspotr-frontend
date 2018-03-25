import * as React from 'react'
import { connect } from 'react-redux'
import { FooterContainer } from 'ui/page/footer/Footer.container'
import { PageLayoutComponent } from 'ui/page/PageLayout.component'
import { HeaderContainer } from 'ui/page/header/Header.container'
import { fetchTableOfContents } from 'ui/core/Core.redux'

export const HomeComponent = props => {
  return <div />
}

export interface IPageLayoutDispatchProps {
  fetchTableOfContents?(): any
}

export interface IPageLayoutProps extends IPageLayoutDispatchProps {}

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
    return <FooterContainer />
  }

  public renderHeader() {
    return <HeaderContainer />
  }

  public renderContent() {
    return this.props.children
  }

  public render() {
    return (
      <PageLayoutComponent
        header={this.renderHeader()}
        footer={this.renderFooter()}
        content={this.renderContent()}
        theme={'dark'}
      />
    )
  }
}

const mapDispatchToProps: IPageLayoutDispatchProps = {
  fetchTableOfContents: () => fetchTableOfContents(),
}

const mapStateToProps = reduxState => {
  return {}
}

export const PageContainer = connect(mapStateToProps, mapDispatchToProps)(PageContainerComponent)
