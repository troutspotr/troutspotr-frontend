import BaseApi from './BaseApi'
export const buildGeoEndpoint = () => {
  return `data/tableOfContents.json`
}
export class TableOfContentsApi extends BaseApi {
  getTableOfContents () {
    console.log('calling endpoint')
    let endpoint = buildGeoEndpoint()
    return this.get(endpoint)
  }
}

export default new TableOfContentsApi()
