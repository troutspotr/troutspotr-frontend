import { number, boolean } from '@storybook/addon-knobs'
import { storiesOf } from '@storybook/react'
import range from 'lodash-es/range'
import * as React from 'react'
import { action } from '@storybook/addon-actions'
import { IPageLayoutProps } from './IPageLayout'
import { PageLayoutComponent } from './PageLayout.component'
import { Theme } from 'ui/core/Core.redux'
const styles = require('./PageLayout.stories.scss')
const stories = storiesOf('Page/Layout', module)
stories.add('Page', () => {
  const header = <div>header</div>
  const footer = <div>footer</div>
  const content = <div>content</div>
  const props: IPageLayoutProps = {
    header,
    footer,
    content,
    legend: null,
    handleError: (error: any) => {},
    theme: Theme.dark,
    resetMinimap: action('reset'),
    isExpanded: boolean('is expanded', false),
  }
  return <PageLayoutComponent {...props} />
})

const getRandomColor = () => {
  const letters = '0123456789ABCDEF'
  let color = '#'
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)]
  }
  return color
}

const oneHundredColors = range(100).map(i => {
  return getRandomColor()
})

const numberRange = {
  range: true,
  min: 0,
  max: 500,
  step: 1,
}
stories.add('Page with too much content', () => {
  const header = <div>header</div>
  const footer = <div>footer</div>
  const itemCount = Math.floor(number('items', 380, numberRange))
  const array = range(itemCount)
  const fakeContents = array.map((x, index) => {
    const colorIndex = index % 100
    const backgroundColor = oneHundredColors[colorIndex]
    const style = {
      backgroundColor,
    }
    return <span className={styles.fakeContentStyle} key={index} style={style} />
  })

  const content = <span className={styles.scrollingContainer}>{fakeContents}</span>
  const props: IPageLayoutProps = {
    header,
    footer,
    content,
    legend: null,
    handleError: (error: any) => {},
    theme: Theme.dark,
    resetMinimap: action('reset'),
    isExpanded: boolean('is expanded', false),
  }
  return <PageLayoutComponent {...props} />
})

stories.add('Page with content that fullscreens', () => {
  const header = <div>header</div>
  const footer = <div>footer</div>

  const content = (
    <div className={styles.fullscreenContainer}>
      <span className={styles.ll}>lower left</span>
      <span className={styles.lr}>lower right</span>
      <span className={styles.tl}>top left</span>
      <span className={styles.tr}>top right</span>
    </div>
  )
  const props: IPageLayoutProps = {
    header,
    footer,
    content,
    legend: null,
    handleError: (error: any) => {},
    theme: Theme.dark,
    resetMinimap: action('reset'),
    isExpanded: boolean('is expanded', false),
  }
  return <PageLayoutComponent {...props} />
})
