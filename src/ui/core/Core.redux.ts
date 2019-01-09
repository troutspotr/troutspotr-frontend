const { getApi } = require('api/Api.module')
import keyBy from 'lodash-es/keyBy'
import { createAction, handleActions } from 'redux-actions'
import { updateCachedEndpoints } from 'ui/page/offline/Offline.redux'
import { Dictionary } from 'lodash'

import {
  UsStateFeatureCollection,
  CountyFeatureCollection,
  RegionFeatureCollection,
  UsStateFeature,
  CountyFeature,
  RegionFeature,
} from 'coreTypes/tableOfContents/ITableOfContentsGeoJSON'
import { LoadingStatus } from 'coreTypes/Ui'
import { ITableOfContentsData } from 'api/tableOfContents/ITableOfContentsData'

// ------------------------------------
// Constants
// ------------------------------------
export enum View {
  map = 'map',
  list = 'list',
}

export enum Theme {
  dark = 'dark',
  light = 'light',
}

export const CORE_SET_REGION_VIEW = 'CORE_SET_REGION_VIEW'
export const CORE_SET_HAS_AGREED_TO_TERMS = 'CORE_SET_HAS_AGREED_TO_TERMS'
export const CORE_SET_AGREEMENT_STATE = 'CORE_SET_AGREEMENT_STATE'
export const CORE_SET_THEME = 'CORE_SET_THEME'

export const isBot = (): boolean => {
  if (window == null || window.navigator == null) {
    return false
  }
  /* eslint-disable no-useless-escape */
  const botPattern =
    '(googlebot/|Googlebot-Mobile|Googlebot-Image|Google favicon|Mediapartners-Google|bingbot|slurp|java|wget|curl|Commons-HttpClient|Python-urllib|libwww|httpunit|nutch|phpcrawl|msnbot|jyxobot|FAST-WebCrawler|FAST Enterprise Crawler|biglotron|teoma|convera|seekbot|gigablast|exabot|ngbot|ia_archiver|GingerCrawler|webmon |httrack|webcrawler|grub.org|UsineNouvelleCrawler|antibot|netresearchserver|speedy|fluffy|bibnum.bnf|findlink|msrbot|panscient|yacybot|AISearchBot|IOI|ips-agent|tagoobot|MJ12bot|dotbot|woriobot|yanga|buzzbot|mlbot|yandexbot|purebot|Linguee Bot|Voyager|CyberPatrol|voilabot|baiduspider|citeseerxbot|spbot|twengabot|postrank|turnitinbot|scribdbot|page2rss|sitebot|linkdex|Adidxbot|blekkobot|ezooms|dotbot|Mail.RU_Bot|discobot|heritrix|findthatfile|europarchive.org|NerdByNature.Bot|sistrix crawler|ahrefsbot|Aboundex|domaincrawler|wbsearchbot|summify|ccbot|edisterbot|seznambot|ec2linkfinder|gslfbot|aihitbot|intelium_bot|facebookexternalhit|yeti|RetrevoPageAnalyzer|lb-spider|sogou|lssbot|careerbot|wotbox|wocbot|ichiro|DuckDuckBot|lssrocketcrawler|drupact|webcompanycrawler|acoonbot|openindexspider|gnam gnam spider|web-archive-net.com.bot|backlinkcrawler|coccoc|integromedb|content crawler spider|toplistbot|seokicks-robot|it2media-domain-crawler|ip-web-crawler.com|siteexplorer.info|elisabot|proximic|changedetection|blexbot|arabot|WeSEE:Search|niki-bot|CrystalSemanticsBot|rogerbot|360Spider|psbot|InterfaxScanBot|Lipperhey SEO Service|CC Metadata Scaper|g00g1e.net|GrapeshotCrawler|urlappendbot|brainobot|fr-crawler|binlar|SimpleCrawler|Livelapbot|Twitterbot|cXensebot|smtbot|bnf.fr_bot|A6-Indexer|ADmantX|Facebot|Twitterbot|OrangeBot|memorybot|AdvBot|MegaIndex|SemanticScholarBot|ltx71|nerdybot|xovibot|BUbiNG|Qwantify|archive.org_bot|Applebot|TweetmemeBot|crawler4j|findxbot|SemrushBot|yoozBot|lipperhey|y!j-asr|Domain Re-Animator Bot|AddThis)'
  const re = new RegExp(botPattern, 'i')
  const userAgent = navigator.userAgent
  return re.test(userAgent)
}

// ------------------------------------
// Reducer
// ------------------------------------
export interface ICoreState {
  view: View
  theme: Theme
  isMapModuleLoaded: boolean
  isMapReadyToDisplay: boolean
  searchText: string
  statesGeoJson: UsStateFeatureCollection | null
  statesDictionary: Dictionary<UsStateFeature> | null
  countiesGeoJson: CountyFeatureCollection | null
  countyDictionary: Dictionary<CountyFeature> | null
  regionsGeoJson: RegionFeatureCollection | null
  regionDictionary: Dictionary<RegionFeature> | null
  tableOfContentsLoadingStatus: LoadingStatus
  hasAgreedToTerms: boolean,
  time: Date
}

export const INITIAL_CORE_STATE: ICoreState = {
  view: isBot() ? View.list : View.map,
  theme: Theme.dark,
  isMapModuleLoaded: false,
  isMapReadyToDisplay: false,
  searchText: '',
  statesGeoJson: null,
  statesDictionary: {},
  countiesGeoJson: null,
  countyDictionary: {},
  regionsGeoJson: null,
  regionDictionary: {},
  tableOfContentsLoadingStatus: LoadingStatus.NotStarted,
  hasAgreedToTerms: false,
  time: new Date(),
}

// ------------------------------------
// Actions
// ------------------------------------
export const setViewToMap = createAction(CORE_SET_REGION_VIEW, () => View.map)
export const setViewToList = createAction(CORE_SET_REGION_VIEW, () => View.list)
export const setTheme = createAction(CORE_SET_THEME, (theme: Theme) => ({ theme: theme }))

export const GEO_SET_TABLE_OF_CONTENTS = 'GEO_SET_TABLE_OF_CONTENTS'
export const GEO_TABLE_OF_CONTENTS_LOADING = 'GEO_TABLE_OF_CONTENTS_LOADING'
export const GEO_TABLE_OF_CONTENTS_LOADING_FAILED = 'GEO_TABLE_OF_CONTENTS_LOADING_FAILED'
export const GEO_UPDATE_SEARCH_TEXT = 'GEO_UPDATE_SEARCH_TEXT'

export const setTableOfContents = createAction(GEO_SET_TABLE_OF_CONTENTS)
export const setTableOfContentsLoading = createAction(GEO_TABLE_OF_CONTENTS_LOADING)
export const setTableOfContentsFailed = createAction(GEO_TABLE_OF_CONTENTS_LOADING_FAILED)
export const setAgreeToTerms = createAction(CORE_SET_HAS_AGREED_TO_TERMS)
export const setAgreementState = createAction(CORE_SET_AGREEMENT_STATE)

const updateSearchTextAction = createAction(GEO_UPDATE_SEARCH_TEXT)
// tslint:disable-next-line:typedef
export const updateSearchText = (searchText: string) => async (dispatch: any): Promise<void> => {
  const sanitizedString = searchText == null
    ? ''
    : searchText.trim().length === 0
      ? searchText.trim()
      : searchText
  dispatch(updateSearchTextAction(sanitizedString))
}

// tslint:disable-next-line:typedef
export const agreeToTerms = (isAgreed: 'true' | 'false') => (dispatch: any): void => {
  const agreement = isAgreed ? 'true' : 'false'
  dispatch(setAgreeToTerms(agreement))
}

// tslint:disable-next-line:typedef
export const fetchTableOfContents = () => async (dispatch: any, getState: any): Promise<void> => {
  dispatch(setTableOfContentsLoading())
  try {

    const { TableOfContentsApi } = await getApi()
    const gettingTableOfContents = TableOfContentsApi.getTableOfContents() as Promise<
      ITableOfContentsData
    >
    const [tableOfContents] = await Promise.all([gettingTableOfContents])
    dispatch(updateCachedEndpoints())
    dispatch(setTableOfContents(tableOfContents))
  } catch (error) {
    dispatch(setTableOfContentsFailed()) // eslint-disable-line
  }
}

export interface IMinimapSelection {
  usStateShortName: string
  regionPathName?: string
}

// ------------------------------------
// Action Handlers
// ------------------------------------
export const CORE_REDUCERS: { [name: string]: (state: ICoreState, action: any) => ICoreState } = {
  [CORE_SET_REGION_VIEW]: (state: ICoreState, { payload }): ICoreState => {
    try {
      getApi().then(({ AnonymousAnalyzerApi }: any) => {
        AnonymousAnalyzerApi.recordEvent('view_change', { view: payload })
      })
    } catch (error) {
      console.error(error)
    }

    const view = payload || INITIAL_CORE_STATE.view
    const newState = { ...state, ...{ view: view } }
    return newState
  },

  [CORE_SET_THEME]: (state: ICoreState, { payload }): ICoreState => {
    const { theme } = payload
    const newState = { ...state, ...{ theme: theme } }
    return newState
  },

  [GEO_SET_TABLE_OF_CONTENTS]: (state: ICoreState, { payload }): ICoreState => {
    const newState = {
      ...state,

      ...{
        statesGeoJson: payload.states,
        statesDictionary: keyBy(payload.states.features, s =>
          s.properties.short_name.toLowerCase()
        ),

        countiesGeoJson: payload.counties,
        countyDictionary: keyBy(payload.counties.features, c => c.properties.gid),

        regionsGeoJson: payload.regions,
        regionDictionary: keyBy(payload.regions.features, r => r.properties.path.toLowerCase()),

        streamCentroidsGeoJson: payload.streamCentroids,
        tableOfContentsLoadingStatus: LoadingStatus.Success,
      },
    }
    return newState
  },
  [GEO_TABLE_OF_CONTENTS_LOADING]: (state: ICoreState, { payload }): ICoreState => {
    const newState = { ...state, ...{ tableOfContentsLoadingStatus: LoadingStatus.Pending } }
    return newState
  },
  [GEO_TABLE_OF_CONTENTS_LOADING_FAILED]: (state: ICoreState, { payload }): ICoreState => {
    const newState = { ...state, ...{ tableOfContentsLoadingStatus: LoadingStatus.Failed } }
    return newState
  },
  [GEO_UPDATE_SEARCH_TEXT]: (state: ICoreState, { payload }): ICoreState => {
    const newState = { ...state, ...{ searchText: payload } }
    return newState
  },
}

export default handleActions(CORE_REDUCERS, INITIAL_CORE_STATE)
