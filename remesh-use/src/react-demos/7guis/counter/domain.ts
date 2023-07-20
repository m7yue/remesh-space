import { Remesh } from 'remesh'
import { map, of } from 'rxjs'

export const CounterDomain = Remesh.domain({
  name: 'CounterDomain',
  impl: (domainContext) => {
    const {
      state, query, event, command, effect, preload, getDomain, getExtern
    } =  domainContext // store => createDomainStorage

    const CountState = domainContext.state({
      name: 'CounterState',
      default: 0,
    })

    const CountQuery = domainContext.query({
      name: 'CounterQuery',
      impl: ({ get }) => {
        return get(CountState())
      },
    })

    const IncreCommand = domainContext.command({
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

    const DecreCommand = domainContext.command({
      name: 'IncreCommand',
      impl: ({ get }) => {
        const count = get(CountState())
        return CountState().new(count - 1)
      },
    })

    const StartEvent = domainContext.event<number>({
      name: 'StartEvent',
    })

    domainContext.effect({
      name: 'CounterEffect',
      impl: ({ get, fromEvent, fromQuery }) => {
        console.log(77777)
        const a = fromEvent(StartEvent)
        .pipe(
          map((v) => {
            const c = DecreCommand()
            return c
          })
        )
        return a
        // const a = fromQuery(CountQuery())
        // .pipe(
        //   map((v) => {
        //     const c = DecreCommand()
        //     return c
        //   })
        // )
        // return a
      }
    })

    return {
      query: {
        CountQuery,
      },
      command: {
        IncreCommand,
        DecreCommand
      },
    }
  },
})

const { type, domainId, domainName, impl, inspectable } = CounterDomain
console.log('===== type =====', type)
console.log('===== domainId =====', domainId)
console.log('===== domainName =====', domainName)
console.log('===== impl =====', impl)
console.log('===== inspectable =====', inspectable)
console.log('===== CounterDomain Meta Info ======', CounterDomain()) // Domain, args 存储参数