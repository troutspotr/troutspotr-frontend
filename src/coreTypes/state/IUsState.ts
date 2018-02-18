import { IStreamCentroid } from 'coreTypes/state/IStreamCentroid'
import { IRegulation } from 'coreTypes/state/IRegulation'
import { IRoadType } from 'coreTypes/state/IRoadType'
import { IPalType } from 'coreTypes/state/IPalType'
import { IWaterOpener } from 'coreTypes/state/IWaterOpener'
export interface IUsState {
  regionIndex: any
  streamCentroids: IStreamCentroid[]
  regulations: IRegulation[]
  roadTypes: IRoadType[]
  palTypes: IPalType[]
  waterOpeners: IWaterOpener[]
  version: string
  releaseDate: Date
}
