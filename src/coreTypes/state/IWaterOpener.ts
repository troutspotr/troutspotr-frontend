import { IRegulation } from 'coreTypes/state/IRegulation'
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
  restriction?: IRegulation
}


export type WaterbodyStatus = 'open' | 'closed' | 'openCaution' | 'unknown'
