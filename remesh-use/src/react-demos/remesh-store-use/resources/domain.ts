import { Remesh } from 'remesh'
import { count, Observable } from 'rxjs'

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

export const CounterDomain = domain({
  name: 'CounterDomain',
  impl: (domainContext) => {
    /**
     * store.getDomain 和 domainContext.getDomain 基本一致
     */
    const {
      state, query, event, command, effect, preload, getDomain, getExtern
    } =  domainContext

    const CountState = state({
      name: 'CounterState',
      default: 0,
    })

    const CountQuery = query({
      name: 'CounterQuery',
      impl: ({ get }) => {
        return get(CountState())
      },
    })

    const IncreCommand = command({
      name: 'IncreCommand',
      impl: ({ get }) => {
        const count = get(CountState())
        return CountState().new(count + 1)
      },
    })

    IncreCommand.before(({ get }) => {
      console.log('before')
      return null
    })
    IncreCommand.before(({ get }) => {
      console.log('before1')
      return null
    })
    IncreCommand.after(({ get }) => {
      console.log('before')
      const count = get(CountState())
      return null
    })

    type EventArgs = {
      a: number
    }
    const CounterEvent = event({
      name: 'CounterEvent',
      impl: (eventContext, arg) => {
        console.log('===---====', eventContext, arg)
        return '87788768776558'
      }
    })

    const TriggerEventCommand = command({
      name: 'TriggerEventCommand',
      impl: ({}, args?: EventArgs) => {
        return CounterEvent(args)
      }
    })

    
    /**
     * effect
     */
    // effect({
    //   name: 'CounterEffect',
    //   impl: ({ fromEvent, fromQuery, get }) => {
    //     const cmd = TriggerEventCommand({a: 7})

    //     const ObservableWithRemeshAction = new Observable<typeof cmd>(subscriber => {
    //       subscriber.next(cmd)
    //     })

    //     return ObservableWithRemeshAction
    //   }
    // })

    /**
     * effect Promsie
     */
    effect({
      name: 'CounterPromiseEffect',
      impl: ({ fromEvent, fromQuery, get }) => {
        const cmd = TriggerEventCommand({a: 7777})
        return [cmd]
        
        // const a = new Promise<typeof cmd>((resolve) => {
        //   resolve(cmd)
        // })


        // return a
      }
    })

    return {
      query: {
        CountQuery
      },
      command: {
        IncreCommand,
        TriggerEventCommand
      },
      event: {
        CounterEvent
      }
    }
  }
})
