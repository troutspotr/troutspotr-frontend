const tableOfContents = require('static/data/v3/TableOfContents.topo.json')
import { decompress } from './TableOfContentsApi'

const toc = decompress(tableOfContents)
const fakeApi = {
  getTableOfContents: () => toc,
}

export default fakeApi
