import { IStreamCentroid } from 'core/state/IStreamCentroid'
import { IRegulation } from 'core/state/IRegulation'
import { IRoadType } from 'core/state/IRoadType'
import { IPalType } from 'core/state/IPalType'
import { IWaterOpener } from 'core/state/IWaterOpener'
export interface IState {
  regionIndex: any
  streamCentroids: IStreamCentroid[]
  regulations: IRegulation[]
  roadTypes: IRoadType[]
  palTypes: IPalType[]
  waterOpeners: IWaterOpener[]
  version: string
  releaseDate: Date
}
