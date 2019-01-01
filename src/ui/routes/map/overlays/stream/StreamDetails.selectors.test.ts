import { getStreamStatusFromOpenersForDate, getReleventStreamOpenersForDate } from 'ui/routes/map/overlays/stream/StreamDetails.selectors'
import { IOpener } from 'coreTypes/state/IWaterOpener';
import { IRegulation } from 'coreTypes/state/IRegulation';

const januaryFirstSixThirtyAmYear2000 = () => new Date(2000, 1, 1, 6, 30)
const mayFirstSixThirtyAmYear2000 = () => new Date(2000, 5, 1, 6, 30)
const mayFifteenthSixThirtyAmYear2000 = () => new Date(2000, 5, 15, 6, 30)
const juneFirstSixThirtyAmYear2000 = () => new Date(2000, 6, 1, 6, 30)
const septemberFirstSixThirtyAmYear2000 = () => new Date(2000, 9, 1, 6, 30)
const octoberFifteenthSixThirtyAmYear2000 = () => new Date(2000, 10, 15, 6, 30)


const makeBasicRestriction = (): IRegulation => {
  return {
    "id": 785,
    "sourceId": "1",
    "shortText": "Combined daily bag limit of 5 and possession of 10.",
    "legalText": "Bag limit of 5."
  }
}

const makeArtificialsOnlyRestriction = (): IRegulation => {
  return {
    "id": 786,
    "sourceId": "2",
    "shortText": "Artificial lures only; 14-inch minimum length limit on all trout.",
    "legalText": "Artificial lures only; 14-inch minimum length limit on all trout."
  }
}

const makeEarlySeasonOpener = (): IOpener => {
  return {
    start_time: januaryFirstSixThirtyAmYear2000(),
    end_time: mayFirstSixThirtyAmYear2000(),
    id: 1,
    water_id: 3,
    restriction_id: makeArtificialsOnlyRestriction().id,
    restriction: makeArtificialsOnlyRestriction()
  }
}

const makeSummerOpener = (): IOpener => {
  return {
    start_time: mayFifteenthSixThirtyAmYear2000(),
    end_time: septemberFirstSixThirtyAmYear2000(),
    id: 1,
    water_id: 3,
    restriction_id: 785,
    restriction: makeBasicRestriction(),
  }
}

describe('StreamDetails.selectors tests', () => {

  describe('getStreamStatus2', () => {
    let time: Date = new Date()
    let openers: IOpener[] = []
    beforeEach(() => {
      time = juneFirstSixThirtyAmYear2000()
      // IMPORTANT: they should go in order.
      openers = [
        makeEarlySeasonOpener(),
        // NOTE: there is a two week gap between the two seasons.
        makeSummerOpener(),
      ]
    })
    it('returns unknown if no date', () => {
      // act
      const results = getStreamStatusFromOpenersForDate(openers, ((null as unknown) as Date))

      // assert
      expect(results).toBe('unknown')
    })

    it('returns unknown if no openers', () => {
      // act
      const results = getStreamStatusFromOpenersForDate([], time)

      // assert
      expect(results).toBe('unknown')
    })

    it('returns closed if date is way too early', () => {
      // arrange
      time = new Date(1, 1, 1, 1)

      // act
      const results = getStreamStatusFromOpenersForDate(openers, time)

      // assert
      expect(results).not.toBe('unknown')
      expect(results).toBe('closed')
    })

    it('returns unknown if date is way too late', () => {
      // arrange
      time = octoberFifteenthSixThirtyAmYear2000()

      // act
      const results = getStreamStatusFromOpenersForDate(openers, time)

      // assert
      expect(results).toBe('unknown')
    })

    it('returns first item if date is right in between them', () => {
      // arrange
      time = januaryFirstSixThirtyAmYear2000()

      // act
      const results = getStreamStatusFromOpenersForDate(openers, time)

      // assert
      expect(results).toBe('open')
    })

    describe('getReleventStreamOpenersForDate', () => {
      it('Retuns null for first item, not null for second item if ver very very early', () => {
         // arrange
        time = new Date(1, 1, 1, 1)

        // act
        const results = getReleventStreamOpenersForDate(openers, time)

        // assert
        expect(results.currentOpener).toBeNull()
        expect(results.nextOpener).not.toBeNull()
        expect(results.nextOpener).toBe(openers[0])
      })

      it('returns null for everything if its way too late', () => {
        // arrange
        time = octoberFifteenthSixThirtyAmYear2000()

        // act
        const results = getReleventStreamOpenersForDate(openers, time)

        // assert
        expect(results.currentOpener).toBeNull()
        expect(results.nextOpener).toBeNull()
      })

      it('gets next opener if within closed gap between two seasons (e.g. 2 week rest period post-spawn)', () => {
        // arrange
        const aCoupleOfDaysAfterEarlySeasonCloseButBeforeSummerSeasonStarts = new Date(2000, 5, 6, 6, 30)

        // act
        const results = getReleventStreamOpenersForDate(openers, aCoupleOfDaysAfterEarlySeasonCloseButBeforeSummerSeasonStarts)

        // assert
        expect(results.currentOpener).toBeNull()
        expect(results.nextOpener).not.toBeNull()
        expect(results.nextOpener).toBe(openers[1])
      })

      it('gets opener that is late in the season', () => {
        // arrange
        const aBeautifulDayInTheMiddleOfTheSummerSeason = new Date(2000, 6, 15, 6, 30)

        // act
        const results = getReleventStreamOpenersForDate(openers, aBeautifulDayInTheMiddleOfTheSummerSeason)

        // assert
        expect(results.currentOpener).not.toBeNull()
        expect(results.nextOpener).toBeNull()
        expect(results.currentOpener).toBe(openers[1])
      })

      it('catches the "indefinite season" where there is only one season and it never ends, (e.g. Iowa has 365 days a year open season because reasons)', () => {
        // arrange
        const aBeautifulDayInTheMiddleOfTheSummerSeason = new Date(2000, 6, 15, 6, 30)
        openers = [
          {
            start_time: januaryFirstSixThirtyAmYear2000(),
            end_time: null,
            id: 1,
            water_id: 3,
            restriction_id: 785,
            restriction: makeBasicRestriction(),
          }
        ]

        // act
        const results = getReleventStreamOpenersForDate(openers, aBeautifulDayInTheMiddleOfTheSummerSeason)

        // assert
        expect(results.currentOpener).not.toBeNull()
        expect(results.nextOpener).toBeNull()
        expect(results.currentOpener).toBe(openers[0])
      })
    })
  })
})
