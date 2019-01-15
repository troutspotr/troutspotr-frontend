import Keen from 'keen-tracking'
interface IKey {
  projectId: string
  writeKey: string
}
const prodKey: IKey = {
  projectId: '585b07858db53dfda8a7dab5',
  writeKey:
    '1F8EEBBD438B4B5FCB72E95BE0C8978C43697A04352D1D8A24AD04F41F05FEEB0684889022373291B47FC3BE7C399900EFBB3C5AD3C07EB354867DE9407433B3444C726CBAC63F9E5F95A9D53EBC09E62DC7A1DC83CE2A68252048D2C993FCCE',
}

const localKey: IKey = {
  projectId: '58599e918db53dfda8a7cc28',
  writeKey:
    '2F3E05B5CDE1B50589EE501589924913487247730F14F9F45C3C1C44C720ADE1A8EC5BE7EA49A6473B6963D4724A8B2E454A07D0A4E9352266E1A98A876429D3D957C59576F298FEDBFD3A61A4A24C567F339F544824AE23CE4EE224455A97C7',
}

const getKey = (): IKey => (process.env.NODE_ENV === 'development' ? localKey : prodKey)

// tslint:disable-next-line:no-any
const createRootEvent = (): any => {
  const href = window.location.href
  const timestamp = new Date().toISOString()
  return {
    ip_address: '${keen.ip}',
    href,
    user_agent: '${keen.user_agent}',
    keen: {
      timestamp,
      addons: [
        {
          name: 'keen:ip_to_geo',
          input: { ip: 'ip_address' },
          output: 'ip_geo_info',
        },
        {
          name: 'keen:ua_parser',
          input: { ua_string: 'user_agent' },
          output: 'parsed_user_agent',
        },
        {
          name: 'keen:date_time_parser',
          input: { date_time: 'keen.timestamp' },
          output: 'timestamp_info',
        },
      ],
    },
  }
}

export interface IAnonymousAnalyzerApi {
  recordEvent<T>(key: string, data: T)
}
class AnonymousAnalyzerApi implements IAnonymousAnalyzerApi {
  // tslint:disable-next-line:no-any
  private client: { recordEvent(key: string, obj: any): void }
  constructor() {
    const client = new Keen(getKey())
    client.extendEvents(() => createRootEvent())
    this.client = client
  }

  // tslint:disable-next-line:no-any
  public recordEvent(key: string, data: any): void {
    /* eslint-disable eqeqeq */
    const doNotTrackUser = navigator != null && parseInt(navigator.doNotTrack, 10) === 1
    if (doNotTrackUser) {
      return
    }

    Keen.ready(() => {
      this.client.recordEvent(key, data)
    })
  }
}

export default new AnonymousAnalyzerApi()
