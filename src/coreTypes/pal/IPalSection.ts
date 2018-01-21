import { ISection } from '../ISection'

export interface IPalSection extends ISection {
  id: number
  publicly_accessible_land_type_id: number
  stream_gid: number
  source_id?: any
}
