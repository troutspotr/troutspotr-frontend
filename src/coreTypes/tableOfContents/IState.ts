import { ILoadable } from '../Ui'

export interface IUsState extends ILoadable {
  readonly gid: number
  readonly statefp: string
  readonly statefp_2: {}
  readonly short_name: string
  readonly name: string
}
