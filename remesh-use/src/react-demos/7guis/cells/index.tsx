import React from 'react'
import { useRemeshDomain, useRemeshQuery, useRemeshSend } from 'remesh-react'

import { CellsDomain, rows, columns } from './domain'

import { RowView } from './RowView'

export const CellsApp = () => {
  return (
    <div>
      <h2>Cells</h2>
      <table
        style={{
          borderCollapse: 'collapse',
          border: '1px solid #bbb',
          textAlign: 'center',
        }}
      >
        <thead>
          <tr
            style={{
              backgroundColor: '#f6f6f6',
            }}
          >
            <th style={{ width: 30, display: 'block' }}></th>
            {columns.map((key) => (
              <th
                key={key}
                style={{
                  maxWidth: 80,
                  border: '1px solid #bbb',
                }}
              >
                {key}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((rowKey) => {
            return (
              <tr key={rowKey}>
                <RowView rowKey={rowKey} columnKeyList={columns} />
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
