import { PropTypes, Component } from 'react'

const getIsOnlineStatusFromNavigator = () => {
  return window.navigator.onLine
}

class OfflineListenerComponent extends Component {
  constructor () {
    super()
    this.getOnlineStatus = this.getOnlineStatus.bind(this)
  }

  getOnlineStatus () {
    let isOffline = getIsOnlineStatusFromNavigator() === false
    this.props.setIsOffline(isOffline)
  }

  componentDidMount () {
    window.addEventListener('online', this.getOnlineStatus)
    window.addEventListener('offline', this.getOnlineStatus)
  }

  componentWillUnmount () {
    window.removeEventListener('online', this.getOnlineStatus)
    window.removeEventListener('offline', this.getOnlineStatus)
  }

  render () {
    return null
  }
}

OfflineListenerComponent.propTypes = {
  setIsOffline: PropTypes.func.isRequired
}

export default OfflineListenerComponent
