import keyBy from 'lodash-es/keyBy'
import { IUsState } from 'coreTypes/state/IUsState'
const formatStateData = (stateMetadata: IUsState) => {
  const regsDictionary = keyBy(stateMetadata.regulations, 'id')
  // tslint:disable-next-line:forin
  for (const prop in stateMetadata.waterOpeners) {
    stateMetadata.waterOpeners[prop].openers.forEach(opener => {
      opener.end_time = new Date(opener.end_time)
      opener.start_time = new Date(opener.start_time)
      opener.restriction = regsDictionary[opener.restriction_id]
    })
  }

  const result = Object.assign(stateMetadata, {
    regulationsDictionary: regsDictionary,
    roadTypesDictionary: keyBy(stateMetadata.roadTypes, 'id'),
    palTypesDictionary: keyBy(stateMetadata.palTypes, 'id'),
  })

  return result
}

module.exports = formatStateData
