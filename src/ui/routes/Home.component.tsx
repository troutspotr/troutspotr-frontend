import * as React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { FooterContainer } from 'ui/page/footer/Footer.container'
import { PageLayoutComponent } from 'ui/page/PageLayout.component'

export const HomeComponent = props => {
  return <div>Home Etc</div>
}

export class PageContainer extends React.PureComponent {
  constructor(props) {
    super(props)
  }

  public renderFooter() {
    return <FooterContainer />
  }

  public renderHeader() {
    return <Link to="/legal">Go to legal</Link>
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

const mapDispatchToProps = {}

const mapStateToProps = reduxState => {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(PageContainer)
