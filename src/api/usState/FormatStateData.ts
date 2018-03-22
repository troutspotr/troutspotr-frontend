import { IUsStateMetadata } from 'coreTypes/state/IUsState'
import keyBy from 'lodash-es/keyBy'
import { IOpener } from 'coreTypes/state/IWaterOpener'
import { IStateData } from 'api/usState/IStateData'

export const formatStateData = (stateMetadata: IUsStateMetadata): IStateData => {
  const regsDictionary = keyBy(stateMetadata.regulations, 'id')
  // tslint:disable-next-line:forin
  for (const prop in stateMetadata.waterOpeners) {
    const stateOpeners = stateMetadata.waterOpeners[prop].openers
    stateOpeners.forEach((opener: IOpener) => {
      opener.end_time = new Date(opener.end_time)
      opener.start_time = new Date(opener.start_time)
      opener.restriction = regsDictionary[opener.restriction_id]
    })
    stateOpeners.sort((a, b) => {
      return +a.start_time - +b.start_time
    })
  }

  const result = Object.assign(stateMetadata, {
    regulationsDictionary: regsDictionary,
    roadTypesDictionary: keyBy(stateMetadata.roadTypes, 'id'),
    palTypesDictionary: keyBy(stateMetadata.palTypes, 'id'),
  })

  return result
}
