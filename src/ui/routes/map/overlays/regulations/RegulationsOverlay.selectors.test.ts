import {
  convertLengthToFriendlyString,
  convertStreamRegulationsToRestrictionProps,
  reduceRestrictions,
} from 'ui/routes/map/overlays/regulations/RegulationsOverlay.selectors'
import { IRestrictionSection } from 'coreTypes/restriction/IRestrectionSection'

describe('RegulationsOverlay selectors', () => {
  describe('convertLengthToFriendlyString', () => {
    it('works with null', () => {
      // arrange
      // act
      const result = convertLengthToFriendlyString(null as unknown as number)

      // assert
      expect(result).toEqual('0.0')
    })

    it('Rounds up for numbers less than 10', () => {
      // arrange
      const length = 9.999
      // act
      const result = convertLengthToFriendlyString(length);

      // assert
      expect(result).toEqual('10')
    })

    it('Rounds up for numbers less than 100', () => {
      // arrange
      const length = 99.99
      // act
      const result = convertLengthToFriendlyString(length);

      // assert
      expect(result).toEqual('100')
    })

    it('Shows 2 digits for numbers less than 10', () => {
      // arrange
      const length = 7.345
      // act
      const result = convertLengthToFriendlyString(length);

      // assert
      expect(result).toEqual('7.34')
    })
  })

  describe('asdf', () => {
    let restriction: IRestrictionSection
    beforeEach(() => {
      restriction = {
          restriction_id: 1,
          stream_gid: 1,
          source_id: {},
          start_time: new Date(),
          end_time: new Date(),
          gid: 123,
          // restriction: null,
          color: 'red',
          colorOffset: 1,
          start: 0,
          stop: 1,
          length: 12.333
      }
    })

    it('uses rounding and adds mi to things', () => {
      // arrange

      // act
      const result = convertStreamRegulationsToRestrictionProps(restriction)

      // assert
      expect(result.length).toBe('12.3 mi')
    })

    it('uses a constant for now for heightMultiplier', () => {
      // arrange

      // act
      const result = convertStreamRegulationsToRestrictionProps(restriction)

      // assert
      expect(result.heightMultiplier).toBe(0.7)
    })

    it('doesnt crash if no restriction found - for now uses an empty string. Not happy with it.', () => {
      // arrange
      const restrictionClone = {
        ...restriction,
        restriction: null,
      }
      // act
      const result = convertStreamRegulationsToRestrictionProps(restrictionClone)

      // assert
      expect(result.text).toBe('')
    })
  })

  describe('reduceRestrictions', () => {
    let restriction1: IRestrictionSection = null
    let restriction2: IRestrictionSection = null
    let restricitons: IRestrictionSection[]
    const commonId = 1
    const startPointMiles = 0
    const stopPointMiles = 3
    beforeEach(() => {
      restriction1 = {
          restriction_id: commonId,
          stream_gid: 1,
          source_id: null,
          start_time: new Date(),
          end_time: new Date(),
          gid: 123,
          restriction: null,
          color: 'red',
          colorOffset: 1,
          start: startPointMiles,
          stop: stopPointMiles,
          length: 12.333
      }

      restriction2 = {
        restriction_id: commonId,
        stream_gid: 1,
        source_id: null,
        start_time: new Date(),
        end_time: new Date(),
        gid: 1341233,
        restriction: null,
        color: 'red',
        colorOffset: 2,
        start: 4,
        stop: 6,
        length: 12.333
      }

      restricitons = [restriction1, restriction2]
    })

    it('works with empty', () => {
      // arrange
      restricitons = []

      // act
      const result = reduceRestrictions(restricitons)

      // assert
      expect(result).toHaveLength(0)
    })

    it('works with empty', () => {
      // arrange
      restricitons = []

      // act
      const result = reduceRestrictions(restricitons)

      // assert
      expect(result).toHaveLength(0)
    })

    it('combines equal restriction_ids into one entry (like a group-by on restriction_id)', () => {
      // arrange

      // act
      const result = reduceRestrictions(restricitons)
      
      // assert
      expect(result).toHaveLength(1)
    })

    it('combines sum of lengths of equal restriction_ids into one entry -- three of one miles become one of three miles', () => {
      // arrange
      const combinedLength = (restriction1.stop - restriction1.start) + (restriction2.stop - restriction2.start)

      // act
      const result = reduceRestrictions(restricitons)

      // assert
      expect(result[0].length).toContain('mi')
      expect(result[0].length).toContain(combinedLength)
    })
  })
})
