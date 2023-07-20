import { Remesh } from 'remesh'
import { CounterDomain } from '../resources/domain'

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

export const domainUse = () => {
  const globalStore = store({
    name: 'globalStore'
  })
  const {
    name,
    getDomain,
    igniteDomain,
    discardDomain,
    query,
    send,
    discard,
    preload,
    getPreloadedState,
    getDomainPreloadedState,
    subscribeDomain,
    subscribeQuery,
    subscribeEvent,
    getKey  
  } = globalStore

  console.log('globalStore: name', name)
  
  /**
   * getDomain
   */
  const domainResources = getDomain(CounterDomain())
  console.log('globalStore: getDomain', domainResources)

  /**
   * subscribeDomain
   */
  // TODO:


  /**
   * query
   */
  const getCount = () => query(domainResources.query.CountQuery())
  console.log('globalStore: query', getCount())

  /**
   * subscribeQuery
   */
  subscribeQuery(domainResources.query.CountQuery(), (queryResult) => {
    console.log('globalStore: subscribeQuery', queryResult)
  })

  /**
   * command
   */
  send(domainResources.command.IncreCommand())
  console.log('globalStore: command', getCount())

  /**
   * subscribeEvent
   */
  subscribeEvent(domainResources.event.CounterEvent, (event) => {
    console.log('globalStore: subscribeEvent', event)
  })
  send(domainResources.command.TriggerEventCommand({a: 1}))

  /**
   * ignite domain for activating domain-effect if needed
   */
  igniteDomain(CounterDomain())

  /**
   * Discard target domain resources
   */
  discardDomain(CounterDomain())
  console.log('after discardDomain', getCount()) // 0

  /**
   * discard all resource
   */
  discard()
  console.log('after discard', getCount()) // 0
}