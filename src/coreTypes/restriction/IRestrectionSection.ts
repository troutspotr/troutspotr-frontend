import { ISection } from 'core/ISection'

export interface IRestrictionSection extends ISection {
  restriction_id: number
  stream_gid: number
  source_id?: any
  start_time?: Date
  end_time?: Date
  gid: number
}
