import { useEffect, useState } from 'react'

import { Checkbox, Table, Button, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'

const TemuanTambah = prop => {
  const dispatch = useDispatch()
  const lib = prop.itemLib
  const inkf_id = prop.inkf_id

  const [selectedRows, setSelectedRows] = useState([])

  useEffect(() => {
    // Example condition: Select rows where column1 starts with 'A'
    const defaultSelected = lib.filter(row => row.acuanCount > 0).map(row => row.temuan_id)

    setSelectedRows(defaultSelected)
  }, [lib]) // Make sure to include rows in the dependency array to update default selected rows when rows change

  // Function to handle row selection
  const handleRowCheckboxChange = rowId => {
    const selectedIndex = selectedRows.indexOf(rowId)
    let newSelected = []

    if (selectedIndex === -1) {
      // Row was not selected, add it to selectedRows
      newSelected = newSelected.concat(selectedRows, rowId)
    } else if (selectedIndex === 0) {
      // If first element is selected, remove it
      newSelected = newSelected.concat(selectedRows.slice(1))
    } else if (selectedIndex === selectedRows.length - 1) {
      // If last element is selected, remove it
      newSelected = newSelected.concat(selectedRows.slice(0, -1))
    } else if (selectedIndex > 0) {
      // If some middle element is selected, remove it
      newSelected = newSelected.concat(selectedRows.slice(0, selectedIndex), selectedRows.slice(selectedIndex + 1))
    }

    // Update selected rows state
    setSelectedRows(newSelected)
  }

  // Function to handle checkbox click
  const handleCheckboxClick = (event, rowId) => {
    event.stopPropagation() // Prevent row selection when checkbox is clicked
    handleRowCheckboxChange(rowId)
  }

  return (
    <>
      {lib.map((item, index) => {
        const { nama_temuan, ket_temuan, level, temuan_id, acuanCount } = item

        // eslint-disable-next-line react-hooks/rules-of-hooks

        return (
          <TableRow key={index}>
            <TableCell padding='checkbox'>
              <Checkbox
                className='row'
                name='pilih[]'
                value={temuan_id}
                checked={selectedRows.includes(temuan_id)}
                onChange={e => handleCheckboxClick(e, temuan_id)}
              />
            </TableCell>
            <TableCell scope='row'>
              {inkf_id}.{index + 1}
            </TableCell>
            <TableCell>
              {nama_temuan} - {temuan_id} - {item.inkf_id}
            </TableCell>
            <TableCell>{ket_temuan}</TableCell>
          </TableRow>
        )
      })}
    </>
  )
}

export default TemuanTambah
