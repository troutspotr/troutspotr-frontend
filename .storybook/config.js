import { configure, addDecorator } from '@kadira/storybook';
import StorybookStyleDecorator from './StorybookStyleDecorator'

// https://github.com/storybooks/storybook/issues/125
// https://webpack.js.org/guides/dependency-management/#require-context
const req = require.context('../src', true, /.stories.js$/)

function loadStories() {
  req.keys().sort().forEach(req)
}

addDecorator(StorybookStyleDecorator)

configure(loadStories, module)
