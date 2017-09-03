import React from 'react';
import { storiesOf, action, linkTo } from '@kadira/storybook';
import ButtonComponent from './Button.component';

storiesOf('core/termsOfAgreement', module)
  .add('button with some text', () => (
    <ButtonComponent>Some text goes here</ButtonComponent>
  ))
  .add('button with lots of text', () => (
    <ButtonComponent>just way too much text is going on in here i mean really where does this even happen how did this go forward</ButtonComponent>
  ))

