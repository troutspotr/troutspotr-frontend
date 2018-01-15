import { storiesOf } from '@storybook/react'
import * as React from 'react'
const stories = storiesOf('Typography', module)
stories.add('Basic Typography', () => {
  return (
    <div>
      <h1>Header H1 Element</h1>
      <h2>Header h2 Element</h2>
      <h3>Header h3 Element</h3>
      <h4>Header h4 Element</h4>
      <h5>Header h5 Element</h5>
      <h6>Header h6 Element</h6>
      <hr />
      <div>
        <p>
          Eventually, all things merge into one, and <strong>a river runs through it.</strong> The
          river was cut by the world's great flood and runs over rocks from the basement of time. On
          some of the rocks are timeless raindrops. Under the rocks are the words, and some of the
          words are theirs. <em>I am haunted by waters.</em>
        </p>

        <p>
          Each one of us here today will at one time in our lives look upon a loved one who is in
          need and ask the same question: We are willing to help, Lord, but what, if anything, is
          needed? For it is true we can seldom help those closest to us. Either we don't know what
          part of ourselves to give or, more often than not, the part we have to give is not wanted.
          And so it is those we live with and should know who elude us. But we can still love them -
          we can love completely without complete understanding.
        </p>

        <p>
          In our family, there was no clear line between religion and fly fishing. We lived at the
          junction of great trout rivers in western Montana, and our father was a Presbyterian
          minister and a fly fisherman who tied his own flies and taught others. He told us about
          Christ's disciples being fishermen, and we were left to assume, as my brother and I did,
          that all first-class fishermen on the Sea of Galilee were fly fishermen and that John, the
          favorite, was a dry-fly fisherman.
        </p>
      </div>
    </div>
  )
})
