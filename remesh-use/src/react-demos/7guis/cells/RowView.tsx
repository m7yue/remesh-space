import React from 'react'
import { useRemeshDomain, useRemeshSend } from 'remesh-react'

import { CellsDomain } from './domain'

import { CellView } from './CellView'

type RowViewProps = {
  rowKey: number
  columnKeyList: string[]
}

export const RowView = ({ columnKeyList, rowKey }: RowViewProps) => {
  const send = useRemeshSend()
  const cells = useRemeshDomain(CellsDomain())

  return (
    <>
      <td
        style={{
          width: 30,
          border: '1px solid #bbb',
          backgroundColor: '#f6f6f6',
        }}
      >
        {rowKey}
      </td>
      {columnKeyList.map((columnKey) => {
        const cellKey = `${columnKey}${rowKey}`
        return (
          <td
            key={cellKey}
            style={{
              maxWidth: 80,
              minWidth: 80,
              border: '1px solid #bbb',
              overflow: 'hidden',
            }}
            onClick={(event) => {
              if (event.target instanceof HTMLInputElement) {
                return
              }
              send(cells.command.SelectCellCommand(cellKey))
            }}
          >
            <CellView cellKey={cellKey} />
          </td>
        )
      })}
    </>
  )
}