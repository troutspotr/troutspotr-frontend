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
import { LoadingStatus, SelectionStatus } from '../../coreTypes/Ui'
import { IUsState } from 'coreTypes/tableOfContents/IState'
import { IRegion } from '../../coreTypes/tableOfContents/IRegion'

// ------------------------------------
// Constants
// ------------------------------------
export enum View {
  map,
  list,
}

export const REGION_SET_VIEW = 'REGION_SET_VIEW'
export const HAS_AGREED_TO_TERMS = 'HAS_AGREED_TO_TERMS'
export const SET_AGREEMENT_STATE = 'SET_AGREEMENT_STATE'

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

// const getHasAgreedToTerms = (): boolean => {
//   if (isBot()) {
//     return true
//   }
//   if (localStorage == null) {
//     return false
//   }

//   return true
//   // return localStorage.getItem(HAS_AGREED_TO_TERMS) === 'true'
// }

// ------------------------------------
// Reducer
// ------------------------------------
export interface ICoreState {
  view: View
  isMapModuleLoaded: boolean
  isMapReadyToDisplay: boolean
  searchText: string
  statesGeoJson: UsStateFeatureCollection
  statesDictionary: Dictionary<UsStateFeature>
  countiesGeoJson: CountyFeatureCollection
  countyDictionary: Dictionary<CountyFeature>
  regionsGeoJson: RegionFeatureCollection
  regionDictionary: Dictionary<RegionFeature>
  tableOfContentsLoadingStatus: LoadingStatus
  hasAgreedToTerms: boolean
}
export const INITIAL_CORE_STATE: ICoreState = {
  view: isBot() ? View.list : View.map,
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
  hasAgreedToTerms: true,
}

// ------------------------------------
// Actions
// ------------------------------------
export const setViewToMap = createAction(REGION_SET_VIEW, x => View.map)
export const setViewToList = createAction(REGION_SET_VIEW, x => View.list)

export const GEO_SET_TABLE_OF_CONTENTS = 'GEO_SET_TABLE_OF_CONTENTS'
export const GEO_TABLE_OF_CONTENTS_LOADING = 'GEO_TABLE_OF_CONTENTS_LOADING'
export const GEO_TABLE_OF_CONTENTS_LOADING_FAILED = 'GEO_TABLE_OF_CONTENTS_LOADING_FAILED'
export const GEO_UPDATE_SEARCH_TEXT = 'GEO_UPDATE_SEARCH_TEXT'
export const GEO_SET_SELECTION = 'GEO_SET_SELECTION'

export const setTableOfContents = createAction(GEO_SET_TABLE_OF_CONTENTS, x => x)
export const setTableOfContentsLoading = createAction(GEO_TABLE_OF_CONTENTS_LOADING)
export const setTableOfContentsFailed = createAction(GEO_TABLE_OF_CONTENTS_LOADING_FAILED)
export const setAgreeToTerms = createAction(HAS_AGREED_TO_TERMS, x => x)
export const setAgreementState = createAction(SET_AGREEMENT_STATE)

const updateSearchTextAction = createAction(GEO_UPDATE_SEARCH_TEXT, item => item)
// tslint:disable-next-line:typedef
export const updateSearchText = (searchText: string) => async (dispatch): Promise<void> => {
  const sanitizedString = searchText == null ? '' : searchText.trim()
  dispatch(updateSearchTextAction(sanitizedString))
}

// tslint:disable-next-line:typedef
export const agreeToTerms = (isAgreed: 'true' | 'false') => (dispatch): void => {
  const agreement = isAgreed ? 'true' : 'false'
  dispatch(setAgreeToTerms(agreement))
}

// tslint:disable-next-line:typedef
export const fetchTableOfContents = () => async (dispatch): Promise<void> => {
  dispatch(setTableOfContentsLoading())
  try {
    const { TableOfContentsApi } = await getApi()
    const gettingTableOfContents = TableOfContentsApi.getTableOfContents()
    const [tableOfContents] = await Promise.all([gettingTableOfContents])
    dispatch(setTableOfContents(tableOfContents))
    dispatch(updateCachedEndpoints())
  } catch (error) {
    dispatch(setTableOfContentsFailed()) // eslint-disable-line
  }
}

interface IMinimapSelection {
  usStateShortName: string
  regionPathName?: string
}
export const setSelectedMinimapGeometry = createAction(
  GEO_SET_SELECTION,
  (args: IMinimapSelection) => ({
    usStateShortName: args.usStateShortName == null ? null : args.usStateShortName.toLowerCase(),
    regionPathName: args.regionPathName == null ? null : args.regionPathName,
  })
)

// ------------------------------------
// Action Handlers
// ------------------------------------
export const CORE_REDUCERS: { [name: string]: (state: ICoreState, action: any) => ICoreState } = {
  [REGION_SET_VIEW]: (state: ICoreState, { payload }): ICoreState => {
    try {
      getApi().then(({ AnonymousAnalyzerApi }) => {
        AnonymousAnalyzerApi.recordEvent('view_change', { view: payload })
      })
    } catch (error) {
      console.error(error)
    }

    const view = payload || INITIAL_CORE_STATE.view
    const newState = { ...state, ...{ view } }
    return newState
  },

  [GEO_SET_TABLE_OF_CONTENTS]: (state: ICoreState, { payload }): ICoreState => {
    payload.states.features.forEach((s: IUsState) => {
      s.selectionStatus = SelectionStatus.Inactive
      s.loadingStatus = LoadingStatus.Success
    })
    payload.regions.features.forEach((s: IRegion) => {
      s.selectionStatus = SelectionStatus.Inactive
      s.loadingStatus = LoadingStatus.Success
    })
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
  [GEO_SET_SELECTION]: (state: ICoreState, { payload }): ICoreState => {
    const { statesGeoJson, statesDictionary, regionsGeoJson, regionDictionary } = state

    if (
      statesGeoJson == null ||
      statesDictionary == null ||
      regionsGeoJson == null ||
      regionDictionary == null
    ) {
      return state
    }
    const { usStateShortName, regionPathName } = payload

    if (usStateShortName == null) {
      return state
    }

    const stateItem = statesDictionary[usStateShortName]
    if (stateItem == null) {
      return state
    }

    // If they've selected nothing (denoted by '')
    // then that's a national level view and they should
    // all be actie.
    // If there is a selection, then non-selected items
    // should be inactive.
    const stateLevelNonSelectedStatus =
      usStateShortName === '' ? SelectionStatus.Active : SelectionStatus.Inactive

    statesGeoJson.features = statesGeoJson.features.map(f => {
      f.properties.selectionStatus =
        f.properties.short_name === usStateShortName
          ? SelectionStatus.Selected
          : stateLevelNonSelectedStatus
      return f
    })

    const regionLevelNonSelectedStatus =
      regionPathName === '' ? SelectionStatus.Active : SelectionStatus.Inactive

    regionsGeoJson.features = regionsGeoJson.features.map(f => {
      const isInSelectedState = f.properties.state_short_name.toLowerCase() === usStateShortName

      // if we're in the selected us state (eg mn/driftless is in MN)
      // then set the fallback to active. It may not be SELECTED, but at least
      // it's active.
      const fallbackSelectionStatus = isInSelectedState
        ? SelectionStatus.Active
        : regionLevelNonSelectedStatus
      f.properties.selectionStatus =
        f.properties.path === regionPathName ? SelectionStatus.Selected : fallbackSelectionStatus
      return f
    })
    return {
      ...state,
      statesGeoJson: {
        ...statesGeoJson,
      },
      regionsGeoJson: {
        ...regionsGeoJson,
      },
    }
  },
}

export default handleActions(CORE_REDUCERS, INITIAL_CORE_STATE)
