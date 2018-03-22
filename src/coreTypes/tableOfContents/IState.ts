import { Loading } from 'ui/core/LoadingConstants'
import { Selection } from 'ui/core/SelectionConstants'

export interface IUsState {
  gid: number
  statefp: string
  statefp_2: {}
  short_name: string
  name: string
  loadingStatus: Loading
  selectionStatus: Selection
}
