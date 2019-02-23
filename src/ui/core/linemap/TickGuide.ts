export interface ITickGuide {
  lessThan: number,
  primary: number,
  secondary: number | null,
}

const ticks10 : ITickGuide = {
  lessThan: 10,
  primary: 1,
  secondary:  null,
}

const ticks30 : ITickGuide = {
  lessThan: 30,
  primary: 5,
  secondary:  1,
}

const ticks50 : ITickGuide = {
  lessThan: 50,
  primary: 10,
  secondary:  5,
}

const ticks100 : ITickGuide = {
  lessThan: 100,
  primary: 25,
  secondary:  10,
}

const ticks200 : ITickGuide = {
  lessThan: 200,
  primary: 50,
  secondary:  10,
}

export const defaultTicks = [
  ticks10,
  ticks30,
  ticks50,
  ticks100,
  ticks200,
]

export const findTick = (length: number, ticks = defaultTicks): ITickGuide => {
  const match = ticks.find(x => length < x.lessThan) || ticks200
  return match
}
