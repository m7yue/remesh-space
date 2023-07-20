import React from 'react'
import { useRemeshDomain, useRemeshQuery, useRemeshSend } from 'remesh-react'

import { CellsDomain } from './domain'


export const CellView = ({ cellKey }: { cellKey: string }) => {
  const send = useRemeshSend()
  const cellsDomain = useRemeshDomain(CellsDomain())
  const cell = useRemeshQuery(cellsDomain.query.CellQuery(cellKey))

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    send(cellsDomain.command.SetCellContentCommand({ key: cellKey, input: e.target.value }))
  }

  return (
    <>
      {cell.isEditing && (
        <input
          style={{
            width: '100%',
            height: '100%',
            backgroundColor: 'transparent',
            boxSizing: 'border-box',
            textAlign: 'center',
          }}
          value={cell.content}
          onChange={handleChange}
          onBlur={() => {
            if (cell.isEditing) {
              send(cellsDomain.command.UnselectCellCommand(cellKey))
            }
          }}
          autoFocus
        />
      )}

      {!cell.isEditing && cell.displayContent}
    </>
  )
}