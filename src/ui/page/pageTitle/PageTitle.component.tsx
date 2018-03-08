import * as React from 'react'

export interface IPageTitleComponent {
  pageTitle: string
}
class PageTitleComponent extends React.PureComponent<IPageTitleComponent> {
  public shouldComponentUpdate(nextProps) {
    if (nextProps.pageTitle === this.props.pageTitle) {
      return false
    }

    return true
  }

  public componentDidMount() {
    if (this.props.pageTitle == null || this.props.pageTitle === '') {
      return
    }

    if (document != null && document.title != null) {
      document.title = this.props.pageTitle
    }
  }

  public componentWillUpdate(nextProps) {
    if (nextProps.pageTitle == null || nextProps.pageTitle === '') {
      return
    }

    if (document != null && document.title != null) {
      document.title = nextProps.pageTitle
    }
  }

  public render() {
    return null
  }
}

export default PageTitleComponent
