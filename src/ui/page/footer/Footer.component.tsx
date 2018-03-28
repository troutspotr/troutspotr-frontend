import * as React from 'react'
import { ThemeContainer } from './theme/Theme.container'
import { ViewContainer } from './view/View.container'
import { GpsContainer } from './gps/Gps.container'
import { FooterLayout } from './Footer.layout'

export class FooterComponent extends React.PureComponent {
  public render() {
    const props = {
      view: <ViewContainer />,
      theme: <ThemeContainer />,
      gps: <GpsContainer />,
    }

    return <FooterLayout {...props} />
  }
}
