import { Remesh } from 'remesh'
import {
  AtomQuery,
  AtomIncreCommand,
  AtomEvent,
  TriggerAtomEventCommand
} from '../resources/atom-use'

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

export const atomLogic = () => {
  const globalStore = store({
    name: 'globalStoreForAtom'
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

  /**
   * atom query
   */
  const getCount = () => query(AtomQuery())
  console.log('globalStoreForAtom: atom query', getCount())

  console.log(AtomQuery() === AtomQuery())

  /**
   * atom subscribeQuery
   */
  subscribeQuery(AtomQuery(), (queryResult) => {
    console.log('globalStoreForAtom: atom subscribeQuery', queryResult)
  })

  /**
   * atom command
   */
  send(AtomIncreCommand())
  console.log('globalStoreForAtom: atom command', getCount())

  /**
   * atom subscribeEvent
   */
  subscribeEvent(AtomEvent, (event) => {
    console.log('globalStoreForAtom: atom subscribeEvent', event)
  })
  send(TriggerAtomEventCommand({a: 1}))
}