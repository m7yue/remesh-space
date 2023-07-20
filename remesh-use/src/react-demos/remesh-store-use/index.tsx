import { useEffect } from 'react'

import { domainUse } from './logics/domain-logic'
import { atomLogic  } from './logics/atom-logic'

export const RemeshStoreUse = () => {
  useEffect(() => {
    domainUse()

    console.log('===================================')

    atomLogic()
  })

  return <>
    RemeshStore use
  </>
}