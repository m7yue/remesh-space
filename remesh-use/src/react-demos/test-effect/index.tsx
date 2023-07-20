import React, { useState } from 'react'


import { UseDomainDemo } from './use-domain-comp'

export const TestEffectDemo = () => {

  const [ show, setShow ] = useState(true)

  const clickHandler = () => {
    setShow(s => !s)
  }

  return <>
    <button onClick={clickHandler}>{show ? '隐藏' : '显示'}</button>
    {show && <UseDomainDemo />}
    {show}
  </>
}