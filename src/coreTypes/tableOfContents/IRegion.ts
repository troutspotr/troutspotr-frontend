import { ILoadable } from '../Ui'

export interface IRegion extends ILoadable {
  readonly gid: number
  readonly name: string
  readonly path: string
  readonly ap_on_trout_section: number
  readonly ap_on_pal_trout_section: number
  readonly trout_length: number
  readonly trout_pal_length: number
  readonly trout_streams_count: number
  readonly area: number
  readonly long_name: string
  readonly state_gid: number
  readonly state_short_name: string
}
