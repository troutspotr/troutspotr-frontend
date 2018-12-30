import { createSelector } from 'reselect'
import { selectedStreamObjectSelector } from 'ui/routes/@usState/@region/Region.selectors'
import { RestrictionFeature } from 'api/region/IRegionGeoJSON';
import { IRestrictionComponent } from 'ui/core/regulations/restriction/Restriction.component';

export const isRegulationsShownSelector = createSelector(
  selectedStreamObjectSelector,
  (selectedStream):boolean => {
    return selectedStream != null && selectedStream.restrictions != null && selectedStream.restrictions.length > 0
  }
)

export const selectedStreamRestrictions = createSelector(
  isRegulationsShownSelector,
  selectedStreamObjectSelector,
  (isShown, streamObject): ReadonlyArray<IRestrictionComponent> => {
    if (isShown === false) {
      return null
    }

    const RestrictionHash: { [key: string]: RestrictionFeature } = {}
    const restrictionSummary = streamObject.restrictions.reduce((dictionary, restriction:RestrictionFeature) => {
      const dictionaryValue = dictionary[restriction.properties.restriction_id]
      const sectionLengthInMiles = (restriction.properties.stop - restriction.properties.start)
      if (dictionaryValue == null) {
        dictionary[restriction.properties.restriction_id] = {
          ...restriction,
          properties: {
            ...restriction.properties,
            length: sectionLengthInMiles
          }
        }
        return dictionary
      }

      dictionary[restriction.properties.restriction_id] = {
        ...dictionaryValue,
        properties: {
          ...dictionaryValue.properties,
          length: dictionaryValue.properties.length + sectionLengthInMiles,
        }
      }

      return dictionary

    }, RestrictionHash)
    
    return Object.values(restrictionSummary).map(convertStreamRegulationsToRestrictionProps)
  }
)

export const convertLengthToFriendlyString = (length:number):string =>{
  const digitsToRound = length < 10
    ? 2
    : length < 100
      ? 1
      : 0
  return Number(Number(length).toFixed(digitsToRound)).toString()
}

export const convertStreamRegulationsToRestrictionProps = (restriction: RestrictionFeature): IRestrictionComponent => {
  // assume restriction is not null
  const props = {
    color: restriction.properties.color as 'red' | 'yellow' | 'blue' | 'green' | 'white' | 'blueGray',
    pattern: 'stipple' as 'solid' | 'stipple' | 'dot',
    text: restriction.properties.restriction.legalText,
    length: `${convertLengthToFriendlyString(restriction.properties.length)} mi`,
    hollow: true,
    heightMultiplier: 0.7,
  }

  return props
}
