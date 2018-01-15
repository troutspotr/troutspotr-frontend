import { combineReducers } from 'redux'
// import bar, { IBarState } from './bar/Bar.redux'
// import foo, { IFooState } from './foo/Foo.redux'

// tslint:disable-next-line:no-empty-interface
export interface IState {
  // readonly bar: IBarState,
  // readonly foo: IFooState,
}
export const AllReducers = combineReducers<IState>({
  // bar,
  // foo,
})
