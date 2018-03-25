import { ISelectable } from '../Ui'

export interface IAccessPoint {
  gid: number
  street_name: string
  stream_gid: number
  linear_offset: number
  is_over_publicly_accessible_land: boolean | number
  road_gid: number
  centroid_latitude: number
  centroid_longitude: number
  is_over_trout_stream: boolean | number
  distance_to_previous_neighbor: number
  is_previous_neighbor_same_road: boolean | number
  road_type_id: number
}

export interface IAccessPointGeoJsonProps extends IAccessPoint, ISelectable {
  isParkable: boolean
  bridgeType: 'permissionRequired' | 'publicTrout' | 'unsafe' | 'uninteresting'
  alphabetLetter: string
  slug: string
  road_shield_text?: string
}
