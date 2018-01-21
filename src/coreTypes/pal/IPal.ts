import { ISection } from '../ISection'

export interface IPalSection extends ISection {
  gid: number
  area_name: string
  shape_area: number
  publicly_accessible_land_type_id: number
  state_gid: number
}
