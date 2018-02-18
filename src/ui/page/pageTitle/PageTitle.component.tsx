import * as React from 'react'

export interface IPageTitleComponent {
  pageTitle: string
}
class PageTitleComponent extends React.PureComponent<IPageTitleComponent> {
  shouldComponentUpdate(nextProps) {
    if (nextProps.pageTitle === this.props.pageTitle) {
      return false
    }

    return true
  }

  componentDidMount() {
    if (this.props.pageTitle == null || this.props.pageTitle === '') {
      return
    }

    if (document != null && document.title != null) {
      document.title = this.props.pageTitle
    }
  }

  componentWillUpdate(nextProps) {
    if (nextProps.pageTitle == null || nextProps.pageTitle === '') {
      return
    }

    if (document != null && document.title != null) {
      document.title = nextProps.pageTitle
    }
  }

  render() {
    return null
  }
}

export default PageTitleComponent
