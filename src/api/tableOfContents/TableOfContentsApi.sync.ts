const tableOfContents = require('static/data/v3/TableOfContents.topo.json')
import { decompress } from './TableOfContentsApi'
import { ITableOfContentsData } from './ITableOfContentsData'

const toc = decompress(tableOfContents)
const fakeApi = {
  getTableOfContents: (): ITableOfContentsData => toc,
}

export default fakeApi
