import React, { useEffect, useState } from 'react'
import { RemeshEvent } from 'remesh'

import { useRemeshDomain, useRemeshSend } from 'remesh-react'

import { TestEffectDomain } from './domain'

export const UseDomainDemo = () => {
  const send = useRemeshSend()
  const counterDomain = useRemeshDomain(TestEffectDomain())
  const [ show, setShow ] = useState(true)

  useEffect(() => {
    document.addEventListener('click', clickHandler)

    return () => document.removeEventListener('click', clickHandler)
  })

  const clickHandler = () => {
    const a = (counterDomain.event.TestEffectEvent)
    // send(counterDomain.event.TestEffectEvent())
    send(counterDomain.command.TestEffectCommand())
  }

  return <>
    UseDomainDemo
  </>
}