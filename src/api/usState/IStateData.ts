import { Dictionary } from 'lodash'
import { IRegulation } from 'coreTypes/state/IRegulation'
import { IRoadType } from 'coreTypes/state/IRoadType'
import { IPalType } from 'coreTypes/state/IPalType'
import { IUsStateMetadata } from 'coreTypes/state/IUsState'

export interface IStateData extends IUsStateMetadata {
  regulationsDictionary: Dictionary<IRegulation>
  roadTypesDictionary: Dictionary<IRoadType>
  palTypesDictionary: Dictionary<IPalType>
}
