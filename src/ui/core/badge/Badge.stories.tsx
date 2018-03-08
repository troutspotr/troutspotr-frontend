import { text } from '@storybook/addon-knobs'
import { storiesOf } from '@storybook/react'
import * as React from 'react'
import { BadgeComponent, Color, Fill, IBadgeProps } from './Badge.component'
const styles = require('./Badge.stories.scss')

const stories = storiesOf('Core/Badge', module)
export const makeBadgeProps = (
  content: string | number,
  fill: Fill = Fill.solid,
  color: Color = Color.publiclyFishable
): IBadgeProps => {
  const props: IBadgeProps = {
    badgeColor: color,
    content,
    fillType: fill,
  }

  return props
}

const createTable = (content: string | number) => {
  // make a header
  const headerArray = [<th key="color">color</th>]
  // tslint:disable-next-line:forin
  for (const fillkey in Fill) {
    headerArray.push(<th key={fillkey}>{fillkey}</th>)
  }
  // now make the body.
  const rowArray = []

  // tslint:disable-next-line:forin
  for (const colorKey in Color) {
    // headerArray.push(<th>{colorKey}</th>)
    const tdArray = []
    const colorNode = <td>{colorKey}</td>
    tdArray.push(colorNode)
    // tslint:disable-next-line:forin
    for (const fillKey in Fill) {
      const color = Color[colorKey] as Color
      const fill = Fill[fillKey] as Fill
      const b: IBadgeProps = {
        content,
        badgeColor: color,
        fillType: fill,
      }

      const fillNode = (
        <td>
          <BadgeComponent {...b} />
        </td>
      )
      tdArray.push(fillNode)
    }
    // now wrap it in a `tr`
    const tableRow = <tr>{tdArray}</tr>
    rowArray.push(tableRow)
  }

  return (
    <table className={styles.table}>
      <thead>{headerArray}</thead>
      <tbody>{rowArray}</tbody>
    </table>
  )
}

const createCombo = (content: string | number): ReadonlyArray<IBadgeProps> => {
  const arr = []
  // tslint:disable-next-line:forin
  for (const colorKey in Color) {
    // tslint:disable-next-line:forin
    for (const fillKey in Fill) {
      const color = Color[colorKey] as Color
      const fill = Fill[fillKey] as Fill
      arr.push(makeBadgeProps(content, fill, color))
    }
  }
  console.log(arr.length)
  return arr
}

stories.add('Badges', () => {
  const table = createTable(text('content', '1'))
  return table
})

stories.add('Badges shift size of contents', () => {
  const array = [0, 1]
  // tslint:disable-next-line:no-let
  let current = 1
  // tslint:disable-next-line:no-let
  for (let i = 0; i < 10; i++) {
    // tslint:disable-next-line:radix
    const currentCount = array[current]
    // tslint:disable-next-line:radix
    const previousCount = array[current - 1]
    const fib = currentCount + previousCount
    array.push(fib)
    current++
  }

  const items = array.map((i, ind) => {
    return (
      <div key={ind}>
        {createCombo(i).map((x, index) => (
          <span key={`${x.content} ${index}`}>
            <BadgeComponent {...x} />
          </span>
        ))}
      </div>
    )
  })
  const emptyStuff = (
    <div>
      {createCombo('').map((x, index) => (
        <span key={`${x.content} ${index}`}>
          <BadgeComponent {...x} />
        </span>
      ))}
    </div>
  )
  return (
    <div>
      {emptyStuff}
      {items}
    </div>
  )
})

stories.add('Badges in diverse text', () => {
  const pretext = text('pretext', 'There are ')
  const postText = text('posttext', ' over troubled waters')
  return (
    <div>
      <div>
        <div>Normal Text</div>
        {pretext}
        <BadgeComponent {...makeBadgeProps(text('content', '1'))} />
        {postText}
      </div>
      <br />
      <div>
        <strong>
          <div>Strong Text</div>
          {pretext}
          <BadgeComponent {...makeBadgeProps(text('content', '1'))} />
          {postText}
        </strong>
      </div>
      <br />
      <div>
        <em>
          <div>Emphasis Text</div>
          {pretext}
          <BadgeComponent {...makeBadgeProps(text('content', '1'))} />
          {postText}
        </em>
      </div>
    </div>
  )
})

stories.add('Badges in regular text', () => {
  return (
    <div>
      <h1>
        Badge Inside{' '}
        <BadgeComponent badgeColor={Color.publiclyFishable} content={3} fillType={Fill.solid} /> of
        H1 Element
      </h1>
      <h2>
        Badge <BadgeComponent {...makeBadgeProps(Math.floor(Math.random() * 90 + 1))} /> Inside of
        h2 Element
      </h2>
      <h3>
        333<BadgeComponent badgeColor={Color.publiclyFishable} content={3} fillType={Fill.solid} />3333
      </h3>
      <h4>
        Badge <BadgeComponent {...makeBadgeProps(Math.floor(Math.random() * 90 + 1))} /> Inside of
        h4 Element
      </h4>
      <h5>
        Badge <BadgeComponent {...makeBadgeProps(Math.floor(Math.random() * 90 + 1))} /> Inside of
        h5 Element
      </h5>
      <h6>
        Badge <BadgeComponent {...makeBadgeProps(Math.floor(Math.random() * 90 + 1))} /> Inside of
        h6 Element
      </h6>
    </div>
  )
})
