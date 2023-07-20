import { useState } from 'react'
import { RemeshRoot } from 'remesh-react'
import { Counter } from './views'
import { CounterApp, CellsApp } from './react-demos/7guis'
import { RemeshStoreUse } from './react-demos/remesh-store-use'

import { TestEffectDemo } from './react-demos/test-effect'

export const App = () => {
  return (
    <RemeshRoot>
      {/* <Counter /> */}
      {/* <CounterApp /> */}
      {/* <CellsApp /> */}

      <RemeshStoreUse />
      {/* <TestEffectDemo /> */}
    </RemeshRoot>
  )
}