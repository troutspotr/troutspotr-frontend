import { ISection } from 'core/ISection'

export interface ITroutStreamSection extends ISection {
  gid: number
  length_mi: number
  centroid_latitude: number
  centroid_longitude: number
  source_id: string
  stream_gid: number
}
