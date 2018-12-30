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
    return isShown === false ? null : streamObject.restrictions.map(convertStreamRegulationsToRestrictionProps)
  }
)

export const convertStreamRegulationsToRestrictionProps = (restriction: RestrictionFeature): IRestrictionComponent => {
  // assume restriction is not null
  const props = {
    color: restriction.properties.color as 'red' | 'yellow' | 'blue' | 'green' | 'white' | 'blueGray',
    pattern: 'stipple' as 'solid' | 'stipple' | 'dot',
    text: restriction.properties.restriction.legalText,
    length: '3.56 mi',
    hollow: true,
    heightMultiplier: 0.7,
  }

  return props
}
