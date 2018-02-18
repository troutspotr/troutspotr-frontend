export interface IStream {
  gid: number
  name: string
  local_name: string
  length_mi: number
  centroid_latitude: number
  centroid_longitude: number
  status_message: string
  source: string
  state_gid: number
  slug: string
  water_id: number
  has_brown_trout: boolean
  has_brook_trout: boolean
  has_rainbow_trout: boolean
  is_brown_trout_stocked: boolean
  is_brook_trout_stocked: boolean
  is_rainbow_trout_stocked: boolean
  circular_box_xmin: number
  circular_box_ymin: number
  circular_box_ymax: number
  circular_box_xmax: number
  trout_stream_section_length: number
  publicly_accessible_trout_stream_section_length: number
  linear_offset: number
}
