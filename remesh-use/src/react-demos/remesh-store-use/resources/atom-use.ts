import { Remesh } from 'remesh'

const {
  domain,
  extern,
  store,
  state,
  query,
  command,
  event,
  module
} = Remesh

export const AtomState = state({
  name: 'AtomState',
  default: 0,
})

export const AtomQuery = query({
  name: 'AtomQuery',
  impl: ({ get }) => {
    return get(AtomState())
  },
})

export const AtomIncreCommand = command({
  name: 'AtomIncreCommand',
  impl: ({ get }) => {
    const count = get(AtomState())
    return AtomState().new(count + 1)
  },
})

type AtomEventArgs = {
  a: number
}

export const AtomEvent = event({
  name: 'AtomEvent',
  impl: (eventContext, arg) => {
    const { get } = eventContext
    console.log('AtomEvent: event impl', eventContext, arg)
    // 派发订阅者拿到的事件结果
  }
})


export const TriggerAtomEventCommand = command({
  name: 'TriggerAtomEventCommand',
  impl: ({}, args?: AtomEventArgs | undefined) => {
    return AtomEvent(args)
  }
})