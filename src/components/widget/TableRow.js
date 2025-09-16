import React from 'react'

const TableRows = ({ rowData, onCheckboxChange }) => {
  return (
    <tr>
      <td>
        <input type='checkbox' checked={rowData.selected} onChange={() => onCheckboxChange(rowData.id)} />
      </td>
      <td>{rowData.id}</td>
      <td>{rowData.name}</td>
    </tr>
  )
}

export default TableRows
