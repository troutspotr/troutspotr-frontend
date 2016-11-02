import assert from 'assert'
import 'babel-polyfill'

describe('(Framework) Karma Plugins', function () {
  it('Should expose "expect" globally.', function () {
    assert.ok(expect)
  })

  it('Should expose "should" globally.', function () {
    assert.ok(should)
  })

  it('Should expose "sinon" globally.', function () {
    assert.ok(sinon)
  })

  it('Should have chai-as-promised helpers.', function () {
    /* eslint-disable */
    const pass = new Promise(res => res('test'))
    const fail = new Promise((res, rej) => rej())
    /* eslint-enable */
    return Promise.all([
      expect(pass).to.be.fulfilled,
      expect(fail).to.not.be.fulfilled
    ])
  })
})
