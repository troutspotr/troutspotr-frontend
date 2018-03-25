import { ILoadable, ISelectable } from '../Ui'

export interface IUsState extends ILoadable, ISelectable {
  gid: number
  statefp: string
  statefp_2: {}
  short_name: string
  name: string
}
