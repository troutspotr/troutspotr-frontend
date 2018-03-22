import * as React from 'react'
const getIsOnlineStatusFromNavigator = () => window.navigator.onLine

export interface IOfflineListenerComponent {
  setIsOffline: ((isOffline: boolean) => void)
}

class OfflineListenerComponent extends React.PureComponent<IOfflineListenerComponent> {
  constructor(props) {
    super(props)
    this.getOnlineStatus = this.getOnlineStatus.bind(this)
  }

  public getOnlineStatus() {
    const isOffline = getIsOnlineStatusFromNavigator() === false
    this.props.setIsOffline(isOffline)
  }

  public componentDidMount() {
    window.addEventListener('online', this.getOnlineStatus)
    window.addEventListener('offline', this.getOnlineStatus)
  }

  public componentWillUnmount() {
    window.removeEventListener('online', this.getOnlineStatus)
    window.removeEventListener('offline', this.getOnlineStatus)
  }

  public render() {
    return null
  }
}

export default OfflineListenerComponent
