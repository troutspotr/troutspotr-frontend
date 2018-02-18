import * as React from 'react'
import { connect } from 'react-redux'
import { PageLayoutComponent } from 'ui/page/PageLayout.component'
import { FooterContainer } from 'ui/page/footer/Footer.container'
// import { HeaderLayout } from 'ui/page/header/Header.layout'
// import { View } from 'ui/core/Core.redux'
export const HomeComponent = props => {
  return <div>Home lol</div>
}

export class PageContainer extends React.PureComponent {
  constructor(props) {
    super(props)
  }

  renderFooter() {
    return <FooterContainer />
  }

  renderHeader() {
    return null
  }

  renderContent() {
    return this.props.children
  }

  render() {
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
