import { Loading } from 'ui/core/LoadingConstants'
import { Selection } from 'ui/core/SelectionConstants'

export interface IRegion {
  gid: number
  name: string
  path: string
  ap_on_trout_section: number
  ap_on_pal_trout_section: number
  trout_length: number
  trout_pal_length: number
  trout_streams_count: number
  area: number
  long_name: string
  state_gid: number
  state_short_name: string
  loadingStatus: Loading
  selectionStatus: Selection
}
