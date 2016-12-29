var keyBy = require('lodash/keyBy')

const formatStateData = (stateMetadata) => {
  var regsDictionary = keyBy(stateMetadata.regulations, 'id')
  for (var prop in stateMetadata.waterOpeners) {
    stateMetadata.waterOpeners[prop].openers.forEach(opener => {
      opener.end_time = new Date(opener.end_time)
      opener.start_time = new Date(opener.start_time)
      opener.restriction = regsDictionary[opener.restriction_id]
    })
  }

  var result = Object.assign(stateMetadata,
    {
      regulationsDictionary: regsDictionary,
      roadTypesDictionary: keyBy(stateMetadata.roadTypes, 'id'),
      palTypesDictionary: keyBy(stateMetadata.palTypes, 'id')
    }
  )

  return result
}

module.exports = formatStateData
