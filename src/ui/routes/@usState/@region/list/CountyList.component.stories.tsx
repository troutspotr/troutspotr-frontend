import { storiesOf } from '@storybook/react'
import * as React from 'react'
// import { formatStateData } from 'api/usState/FormatStateData'
import { CountyListComponent, ICountyListProps, ICountyItem } from './CountyList.component'
import { CountyListLayoutComponent, ICountyListLayoutProps } from './CountyList.layout'
// import { transformGeo } from 'api/region/Region.transform.sync'
import { IStreamObject } from 'coreTypes/IStreamObject'
import { IMiscRegsProperties } from 'ui/core/regulations/RegulationsSummary.selectors'
const classes = require('./List.scss')
const counties = require('./_stubs/CountyObjects.json') as ICountyItem[]
const stories = storiesOf('StreamList/List', module)

stories.add('Layout', () => {
  const things = counties.map(x => {
    return {
      gid: x.gid,
      name: x.name,
      items: x.streams.map((s, index) => {
        return (
          <span
            style={{
              display: 'inline-block',
              width: '140px',
              height: '140px',
              columns: '2 2em',
              columnGap: '1em',
              backgroundColor: 'green',
              margin: '15px',
            }}
            key={s.stream.properties.gid}
          >
            {index}
          </span>
        )
      }),
    }
  })

  const props: ICountyListLayoutProps = {
    isListVisible: true,
    visibleCounties: things,
  }

  return (
    <div style={{ height: 'auto', width: '100%', overflow: 'auto' }}>
      <CountyListLayoutComponent {...props} />
    </div>
  )
})

stories.add('scroll demo', () => {
  return (
    <div className={classes.scrollDemo}>
      <dl>
        <dt>A</dt>
        <dd>Andrew W.K.</dd>
        <dd>Apparat</dd>
        <dd>Arcade Fire</dd>
        <dd>At The Drive-In</dd>
        <dd>Aziz Ansari</dd>
      </dl>
      <dl>
        <dt>C</dt>
        <dd>Chromeo</dd>
        <dd>Common</dd>
        <dd>Converge</dd>
        <dd>Crystal Castles</dd>
        <dd>Cursive</dd>
      </dl>
      <dl>
        <dt>E</dt>
        <dd>Explosions In The Sky</dd>
      </dl>
      <dl>
        <dt>T</dt>
        <dd>Ted Leo The Pharmacists</dd>
        <dd>T-Pain</dd>
        <dd>Thrice</dd>
        <dd>TV On The Radio</dd>
        <dd>Two Gallants</dd>
      </dl>
      <dl>
        <dt>A</dt>
        <dd>Andrew W.K.</dd>
        <dd>Apparat</dd>
        <dd>Arcade Fire</dd>
        <dd>At The Drive-In</dd>
        <dd>Aziz Ansari</dd>
      </dl>
      <dl>
        <dt>C</dt>
        <dd>Chromeo</dd>
        <dd>Common</dd>
        <dd>Converge</dd>
        <dd>Crystal Castles</dd>
        <dd>Cursive</dd>
      </dl>
      <dl>
        <dt>E</dt>
        <dd>Explosions In The Sky</dd>
      </dl>
      <dl>
        <dt>T</dt>
        <dd>Ted Leo The Pharmacists</dd>
        <dd>T-Pain</dd>
        <dd>Thrice</dd>
        <dd>TV On The Radio</dd>
        <dd>Two Gallants</dd>
      </dl>
      <dl>
        <dt>A</dt>
        <dd>Andrew W.K.</dd>
        <dd>Apparat</dd>
        <dd>Arcade Fire</dd>
        <dd>At The Drive-In</dd>
        <dd>Aziz Ansari</dd>
      </dl>
      <dl>
        <dt>C</dt>
        <dd>Chromeo</dd>
        <dd>Common</dd>
        <dd>Converge</dd>
        <dd>Crystal Castles</dd>
        <dd>Cursive</dd>
      </dl>
      <dl>
        <dt>E</dt>
        <dd>Explosions In The Sky</dd>
      </dl>
      <dl>
        <dt>T</dt>
        <dd>Ted Leo The Pharmacists</dd>
        <dd>T-Pain</dd>
        <dd>Thrice</dd>
        <dd>TV On The Radio</dd>
        <dd>Two Gallants</dd>
      </dl>
      <dl>
        <dt>A</dt>
        <dd>Andrew W.K.</dd>
        <dd>Apparat</dd>
        <dd>Arcade Fire</dd>
        <dd>At The Drive-In</dd>
        <dd>Aziz Ansari</dd>
      </dl>
      <dl>
        <dt>C</dt>
        <dd>Chromeo</dd>
        <dd>Common</dd>
        <dd>Converge</dd>
        <dd>Crystal Castles</dd>
        <dd>Cursive</dd>
      </dl>
      <dl>
        <dt>E</dt>
        <dd>Explosions In The Sky</dd>
      </dl>
      <dl>
        <dt>T</dt>
        <dd>Ted Leo The Pharmacists</dd>
        <dd>T-Pain</dd>
        <dd>Thrice</dd>
        <dd>TV On The Radio</dd>
        <dd>Two Gallants</dd>
      </dl>
      <dl>
        <dt>A</dt>
        <dd>Andrew W.K.</dd>
        <dd>Apparat</dd>
        <dd>Arcade Fire</dd>
        <dd>At The Drive-In</dd>
        <dd>Aziz Ansari</dd>
      </dl>
      <dl>
        <dt>C</dt>
        <dd>Chromeo</dd>
        <dd>Common</dd>
        <dd>Converge</dd>
        <dd>Crystal Castles</dd>
        <dd>Cursive</dd>
      </dl>
      <dl>
        <dt>E</dt>
        <dd>Explosions In The Sky</dd>
      </dl>
      <dl>
        <dt>T</dt>
        <dd>Ted Leo The Pharmacists</dd>
        <dd>T-Pain</dd>
        <dd>Thrice</dd>
        <dd>TV On The Radio</dd>
        <dd>Two Gallants</dd>
      </dl>
      <dl>
        <dt>A</dt>
        <dd>Andrew W.K.</dd>
        <dd>Apparat</dd>
        <dd>Arcade Fire</dd>
        <dd>At The Drive-In</dd>
        <dd>Aziz Ansari</dd>
      </dl>
      <dl>
        <dt>C</dt>
        <dd>Chromeo</dd>
        <dd>Common</dd>
        <dd>Converge</dd>
        <dd>Crystal Castles</dd>
        <dd>Cursive</dd>
      </dl>
      <dl>
        <dt>E</dt>
        <dd>Explosions In The Sky</dd>
      </dl>
      <dl>
        <dt>T</dt>
        <dd>Ted Leo The Pharmacists</dd>
        <dd>T-Pain</dd>
        <dd>Thrice</dd>
        <dd>TV On The Radio</dd>
        <dd>Two Gallants</dd>
      </dl>
      <dl>
        <dt>A</dt>
        <dd>Andrew W.K.</dd>
        <dd>Apparat</dd>
        <dd>Arcade Fire</dd>
        <dd>At The Drive-In</dd>
        <dd>Aziz Ansari</dd>
      </dl>
      <dl>
        <dt>C</dt>
        <dd>Chromeo</dd>
        <dd>Common</dd>
        <dd>Converge</dd>
        <dd>Crystal Castles</dd>
        <dd>Cursive</dd>
      </dl>
      <dl>
        <dt>E</dt>
        <dd>Explosions In The Sky</dd>
      </dl>
      <dl>
        <dt>T</dt>
        <dd>Ted Leo The Pharmacists</dd>
        <dd>T-Pain</dd>
        <dd>Thrice</dd>
        <dd>TV On The Radio</dd>
        <dd>Two Gallants</dd>
      </dl>
      <dl>
        <dt>A</dt>
        <dd>Andrew W.K.</dd>
        <dd>Apparat</dd>
        <dd>Arcade Fire</dd>
        <dd>At The Drive-In</dd>
        <dd>Aziz Ansari</dd>
      </dl>
      <dl>
        <dt>C</dt>
        <dd>Chromeo</dd>
        <dd>Common</dd>
        <dd>Converge</dd>
        <dd>Crystal Castles</dd>
        <dd>Cursive</dd>
      </dl>
      <dl>
        <dt>E</dt>
        <dd>Explosions In The Sky</dd>
      </dl>
      <dl>
        <dt>T</dt>
        <dd>Ted Leo The Pharmacists</dd>
        <dd>T-Pain</dd>
        <dd>Thrice</dd>
        <dd>TV On The Radio</dd>
        <dd>Two Gallants</dd>
      </dl>
      <dl>
        <dt>A</dt>
        <dd>Andrew W.K.</dd>
        <dd>Apparat</dd>
        <dd>Arcade Fire</dd>
        <dd>At The Drive-In</dd>
        <dd>Aziz Ansari</dd>
      </dl>
      <dl>
        <dt>C</dt>
        <dd>Chromeo</dd>
        <dd>Common</dd>
        <dd>Converge</dd>
        <dd>Crystal Castles</dd>
        <dd>Cursive</dd>
      </dl>
      <dl>
        <dt>E</dt>
        <dd>Explosions In The Sky</dd>
      </dl>
      <dl>
        <dt>T</dt>
        <dd>Ted Leo The Pharmacists</dd>
        <dd>T-Pain</dd>
        <dd>Thrice</dd>
        <dd>TV On The Radio</dd>
        <dd>Two Gallants</dd>
      </dl>
      <dl>
        <dt>A</dt>
        <dd>Andrew W.K.</dd>
        <dd>Apparat</dd>
        <dd>Arcade Fire</dd>
        <dd>At The Drive-In</dd>
        <dd>Aziz Ansari</dd>
      </dl>
      <dl>
        <dt>C</dt>
        <dd>Chromeo</dd>
        <dd>Common</dd>
        <dd>Converge</dd>
        <dd>Crystal Castles</dd>
        <dd>Cursive</dd>
      </dl>
      <dl>
        <dt>E</dt>
        <dd>Explosions In The Sky</dd>
      </dl>
      <dl>
        <dt>T</dt>
        <dd>Ted Leo The Pharmacists</dd>
        <dd>T-Pain</dd>
        <dd>Thrice</dd>
        <dd>TV On The Radio</dd>
        <dd>Two Gallants</dd>
      </dl>
      <dl>
        <dt>A</dt>
        <dd>Andrew W.K.</dd>
        <dd>Apparat</dd>
        <dd>Arcade Fire</dd>
        <dd>At The Drive-In</dd>
        <dd>Aziz Ansari</dd>
      </dl>
      <dl>
        <dt>C</dt>
        <dd>Chromeo</dd>
        <dd>Common</dd>
        <dd>Converge</dd>
        <dd>Crystal Castles</dd>
        <dd>Cursive</dd>
      </dl>
      <dl>
        <dt>E</dt>
        <dd>Explosions In The Sky</dd>
      </dl>
      <dl>
        <dt>T</dt>
        <dd>Ted Leo The Pharmacists</dd>
        <dd>T-Pain</dd>
        <dd>Thrice</dd>
        <dd>TV On The Radio</dd>
        <dd>Two Gallants</dd>
      </dl>
      <dl>
        <dt>A</dt>
        <dd>Andrew W.K.</dd>
        <dd>Apparat</dd>
        <dd>Arcade Fire</dd>
        <dd>At The Drive-In</dd>
        <dd>Aziz Ansari</dd>
      </dl>
      <dl>
        <dt>C</dt>
        <dd>Chromeo</dd>
        <dd>Common</dd>
        <dd>Converge</dd>
        <dd>Crystal Castles</dd>
        <dd>Cursive</dd>
      </dl>
      <dl>
        <dt>E</dt>
        <dd>Explosions In The Sky</dd>
      </dl>
      <dl>
        <dt>T</dt>
        <dd>Ted Leo The Pharmacists</dd>
        <dd>T-Pain</dd>
        <dd>Thrice</dd>
        <dd>TV On The Radio</dd>
        <dd>Two Gallants</dd>
      </dl>
    </div>
  )
})

stories.add('List', () => {
  const props: ICountyListProps = {
    isListVisible: true,
    visibleCounties: counties,
    selectedState: 'mn',
    selectedRegion: 'drifltess',
    getSummary: (stream: IStreamObject): IMiscRegsProperties => {
      return null
    },
  }
  return <CountyListComponent {...props} />
})
