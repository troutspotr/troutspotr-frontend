export interface IWaterOpener {
  id: number
  name: string
  openers: IOpener[]
}

export interface IOpener {
  start_time: Date
  end_time?: Date
  id: number
  water_id: number
  restriction_id: number
}
