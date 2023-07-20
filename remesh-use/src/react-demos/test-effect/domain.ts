import { Remesh } from 'remesh'

export const TestEffectDomain = Remesh.domain({
  name: 'TestEffectDomain',
  impl: (domainContext) => {
    const { effect, event, command } = domainContext

    const TestEffectEvent = event<number>({
      name: 'TestEffectEvent'
    })

    const TestEffectCommand = command({
      name: 'TestEffectCommand',
      impl: () => {
        return [TestEffectEvent(7)]
      }
    })

    effect({
      name: 'TestEffect',
      impl: ({fromEvent}) => {
        const result = fromEvent(TestEffectEvent)
        const subscription =  result.subscribe(x => console.log(x));

        subscription.unsubscribe()

        return null
      }
    })

    return {
      event: {
        TestEffectEvent
      },
      command: {
        TestEffectCommand
      }
    }
  }
})