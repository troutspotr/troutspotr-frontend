import React from 'react';
import { storiesOf, action, linkTo } from '@kadira/storybook';
import AgreementComponent from './Agreement.component';

storiesOf('core/termsOfAgreement', module)
  .add('Agreement', () => (
    <AgreementComponent />
  ))

