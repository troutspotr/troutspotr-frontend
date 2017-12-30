import GeoApi from './GeoApi'
import {transformGeo} from './GeoApi.transform'

export default function () {
  self.addEventListener('message', (ev) => {
    const stateId = ev.data
    if (stateId == null) {
      throw new Error('cannot be null')
    }

    GeoApi.getStateStreamData(ev.data)
      .then(async (topojsonObject) => {
        const results = await transformGeo(topojsonObject)
        const string = JSON.stringify(results)
        self.postMessage(string)
        close()
      }).catch((error) => {
        throw new Error(error)
      })
  })
}
