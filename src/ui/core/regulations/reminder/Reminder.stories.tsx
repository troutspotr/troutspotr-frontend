import { storiesOf } from '@storybook/react'
import * as React from 'react'
import { select, text, boolean, number } from '@storybook/addon-knobs'
import { IReminderComponent, ReminderComponent } from './Reminder.component';
// import { MessageOverlayComponent } from '../../messageOverlay/MessageOverlay.component';
const stories = storiesOf('Reminder Component', module)
// const allColors = ['red', 'yellow', 'blue', 'green', 'white', 'blueGray']
// const getColor = (): 'red' | 'yellow' | 'blue' | 'green' | 'white' | 'blueGray' => {
//   return select('color', allColors as ['red', 'yellow', 'blue', 'green', 'white', 'blueGray'], 'red')
// }

// const allPatterns = ['solid', 'stipple', 'dot']
// const getPattern = (): 'solid' | 'stipple' | 'dot' => {
//   return select('pattern', allPatterns as ['solid', 'stipple', 'dot'], 'dot')
// }
stories.add('basic', () => {
  const props: IReminderComponent = {
  //   color: getColor(),
  //   pattern: getPattern(),
  //   text: text('text', 'some text'),
     stateName: text('stateName', '20'),
     url: text(   'bamaden', 'https://www.google.com/whogivesashit')
  //   hollow: boolean('hollow', true),
  //   heightMultiplier: number('height multiplier', 1, {
  //     range: true,
  //     min: 0.1,
  //     max: 2,
  //     step: 0.001,
  //  }),
   }
  return <ReminderComponent {...props} />
})

stories.add('all combos', () => {
  const restrictions = []
  const restrictionText = text('text', 'some text that goes on and on and maybe goes on a little too long')
  const length = text('length', '20.3 mi')
  const constHeight =  number('height multiplier', 1, {
    range: true,
    min: 0.1,
    max: 2,
    step: 0.001,
 })
  allColors.forEach(color => {
      allPatterns.forEach(pattern => {
        const props: IRestrictionComponent = {
          color,
          pattern,
          text: restrictionText,
          length,
          hollow: true,
          heightMultiplier: 1 * constHeight,
        } as IRestrictionComponent
  
        restrictions.push(<RestrictionComponent key={`${color}-${pattern}`} {...props} />)
      })
  })
  return <React.Fragment>{restrictions}</React.Fragment>
})

stories.add('all combos in message overlay', () => {
  const restrictions = []
  const restrictionText = text('text', 'some text that goes on and on and maybe goes on a little too long')
  const length = text('length', '20.3 mi')
  const heights = [0.5, 0.75, 1.0, 1.25, 1.5]
  const constHeight =  number('height multiplier', 1, {
    range: true,
    min: 0.1,
    max: 2,
    step: 0.001,
 })
  allColors.forEach(color => {
      allPatterns.forEach(pattern => {
        const props: IRestrictionComponent = {
          color,
          pattern,
          text: restrictionText,
          length,
          hollow: true,
          heightMultiplier: 1 * constHeight,
        } as IRestrictionComponent
  
        restrictions.push(<RestrictionComponent key={`${color}-${pattern}`} {...props} />)
      })
  })
  return <MessageOverlayComponent position={'top'}>{restrictions}</MessageOverlayComponent>
})