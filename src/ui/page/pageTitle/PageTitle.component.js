import {Component} from 'react'
import PropTypes from 'prop-types'

class PageTitleComponent extends Component {
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

  render () {
    return null
  }
}

PageTitleComponent.propTypes = {
  'pageTitle': PropTypes.string.isRequired,
}

export default PageTitleComponent
