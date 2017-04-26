import GeoApi from './GeoApi'
import { transformGeo } from './GeoApi.transform'

export default function () {
  self.addEventListener('message', function (ev) {
    let stateId = ev.data
    if (stateId == null) {
      throw new Error('cannot be null')
    }

    console.log('calling endpoing')
    GeoApi.getStateStreamData(ev.data)
      .then(async topojsonObject => {
        console.log('got results')
        let results = await transformGeo(topojsonObject)
        console.log('got even more results results')
        let string = JSON.stringify(results)
        self.postMessage(string)
        close()
      }).catch(error => {
        console.log(error)
        throw new Error(error)
        // close()
      })
  })
}
