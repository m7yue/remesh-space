import { useRemeshDomain, useRemeshQuery, useRemeshSend } from 'remesh-react'

import { CounterDomain } from './domain'

export const CounterApp = () => {
  const send = useRemeshSend()
  const counterDomain = useRemeshDomain(CounterDomain())
  const count = useRemeshQuery(counterDomain.query.CountQuery())

  const handleIncre = () => {
    send(counterDomain.command.IncreCommand())
  }

  const handleDecre = () => {
    send(counterDomain.command.DecreCommand())
  }

  return (
    <div
      style={{
        width: 400,
        border: '1px solid #eaeaea',
        boxSizing: 'border-box',
        padding: 10,
      }}
    >
      <h2>Counter</h2>
      <label>
        <button onClick={handleDecre}> - </button>{' '}
      </label>
      <input type="number" readOnly value={count} />
      <label>
        {' '}<button onClick={handleIncre}> + </button>
      </label>
    </div>
  )
}