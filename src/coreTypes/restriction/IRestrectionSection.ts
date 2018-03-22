import { ISection } from 'coreTypes/ISection'
import { IRegulation } from 'coreTypes/state/IRegulation'

export interface IRestrictionSection extends ISection {
  restriction_id: number
  stream_gid: number
  source_id?: {}
  start_time?: Date
  end_time?: Date
  gid: number
  restriction?: IRegulation
  color?: string
  colorOffset?: number
}
