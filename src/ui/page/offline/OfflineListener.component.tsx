import * as React from 'react'
const getIsOnlineStatusFromNavigator = () => window.navigator.onLine
export interface IOfflineListenerComponent {
  setIsOffline: any
}

class OfflineListenerComponent extends React.Component<IOfflineListenerComponent> {
  constructor(props) {
    super(props)
    this.getOnlineStatus = this.getOnlineStatus.bind(this)
  }

  getOnlineStatus() {
    const isOffline = getIsOnlineStatusFromNavigator() === false
    this.props.setIsOffline(isOffline)
  }

  componentDidMount() {
    window.addEventListener('online', this.getOnlineStatus)
    window.addEventListener('offline', this.getOnlineStatus)
  }

  componentWillUnmount() {
    window.removeEventListener('online', this.getOnlineStatus)
    window.removeEventListener('offline', this.getOnlineStatus)
  }

  render() {
    return null
  }
}

export default OfflineListenerComponent
