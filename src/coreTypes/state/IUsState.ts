import { IPalType } from 'coreTypes/state/IPalType'
import { IRegulation } from 'coreTypes/state/IRegulation'
import { IRoadType } from 'coreTypes/state/IRoadType'
import { IStreamCentroid } from 'coreTypes/state/IStreamCentroid'
import { IWaterOpener } from 'coreTypes/state/IWaterOpener'
export interface IUsStateMetadata {
  regionIndex: {}
  streamCentroids: IStreamCentroid[]
  regulations: IRegulation[]
  roadTypes: IRoadType[]
  palTypes: IPalType[]
  waterOpeners: IWaterOpener[]
  version: string
  releaseDate: Date
}
