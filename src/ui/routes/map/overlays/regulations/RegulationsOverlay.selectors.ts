import { createSelector } from 'reselect'
import { selectedStreamObjectSelector } from 'ui/routes/@usState/@region/Region.selectors'
import { IRestrictionSection } from 'coreTypes/restriction/IRestrectionSection'
import { IRestrictionComponent } from 'ui/core/regulations/restriction/Restriction.component';
import { ISection } from 'coreTypes/ISection';

export const convertLengthToFriendlyString = (length:number):string =>{
  if (length == null) {
    return '0.0'
  }
  const digitsToRound = length < 10
    ? 2
    : length < 100
      ? 1
      : 0
  return Number(Number(length).toFixed(digitsToRound)).toString()
}

export const convertStreamRegulationsToRestrictionProps = (restriction: IRestrictionSection): IRestrictionComponent => {
  // assume restriction is not null
  const props = {
    color: restriction.color as 'red' | 'yellow' | 'blue' | 'green' | 'white' | 'blueGray',
    pattern: 'stipple' as 'solid' | 'stipple' | 'dot',
    text: restriction.restriction != null ? restriction.restriction.legalText : '',
    length: `${convertLengthToFriendlyString(restriction.length)} mi`,
    hollow: true,
    heightMultiplier: 0.7,
  }

  return props
}

export const isRegulationsShownSelector = createSelector(
  selectedStreamObjectSelector,
  (selectedStream):boolean => {
    return selectedStream != null && selectedStream.restrictions != null && selectedStream.restrictions.length > 0
  }
)

export const collapseSectionsByKeyAndCombineLength = (sections: ReadonlyArray<ISection>, key: string) => {
  const SectionHash: {
    [key: string]: ISection;
  } = {};
  const restrictionSummary = sections.reduce((dictionary, section: ISection) => {
    const dictionaryValue = dictionary[section[key]];
    // `stop` might be 12.45 miles, `start` might be earlier (farther downstream), so maybe 3.234 miles
    // subtracting `start` from `stop` gives us the length.
    const sectionLengthInMiles = (section.stop - section.start);
    
    // if the entry has not been added...
    if (dictionaryValue == null) {
      dictionary[section[key]] = {
        ...section,
        // set the length manually
        length: sectionLengthInMiles,
      };
      return dictionary;
    }
    dictionary[section[key]] = {
      ...dictionaryValue,
      // add the length to the total length thus far...
      length: dictionaryValue.length + sectionLengthInMiles,
    };
    return dictionary;
  }, SectionHash);

  return restrictionSummary
}

export const reduceRestrictions = (restrictions: IRestrictionSection[]): ReadonlyArray<IRestrictionComponent> => {
  const restrictionSectionSummaries = collapseSectionsByKeyAndCombineLength(restrictions, 'restriction_id')
  return Object.values(restrictionSectionSummaries).map(convertStreamRegulationsToRestrictionProps);
}

const EMPTY_STREAM_RESTRICTIONS:ReadonlyArray<IRestrictionComponent> = []
export const selectedStreamRestrictions = createSelector(
  isRegulationsShownSelector,
  selectedStreamObjectSelector,
  (isShown, streamObject): ReadonlyArray<IRestrictionComponent> => {
    if (isShown === false) {
      return EMPTY_STREAM_RESTRICTIONS
    }

    if (streamObject == null || streamObject.restrictions.length === 0) {
      return EMPTY_STREAM_RESTRICTIONS
    }
    const props = streamObject.restrictions.map(x => x.properties);
    return reduceRestrictions(props);
  }
)
