import * as React from 'react'
import { StreamItemComponent } from './streamItem/StreamItem.component'
import { IStreamObject } from 'coreTypes/IStreamObject'

export interface IStreamListComponent {
  readonly visibleTroutStreams: IStreamObject[]
  readonly selectedState: string
  readonly selectedRegion: string
  readonly isListVisible: boolean
}

class StreamListComponent extends React.Component<IStreamListComponent> {
  public render() {
    const { selectedRegion, selectedState, visibleTroutStreams } = this.props
    return (
      <>
        {visibleTroutStreams.map((stream, index) => {
          const realStream = stream.stream
          const url = realStream.properties.slug
          return (
            <div key={realStream.properties.slug}>
              <StreamItemComponent
                url={`/${selectedState}/${selectedRegion}/${url}`}
                stream={stream}
                isVisible={true}
              />
            </div>
          )
        })}
      </>
    )
  }
}

export default StreamListComponent
