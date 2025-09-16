import { useEffect, useState } from 'react'

import { Checkbox, Table, Button, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'

import CustomTextField from '@/@core/components/mui/TextField'
import { getUniqueValues } from '@/utils/helper'

function joinArrays(arr1, arr2) {
  return arr1.map(obj1 => {
    const obj2 = arr2.find(obj => obj.tabel_id === obj1.tabel_id)

    return { ...obj1, ...obj2 } // Merge objects
  })
}

const FormDinamis = prop => {
  const dispatch = useDispatch()
  const lib = prop.tabelItem[0]
  const [fix, setFix] = useState(lib.lkf_lib)
  const lkf_lib_keg = prop.lkf_lib_keg

  const lkf_lib = getUniqueValues(lkf_lib_keg, 'lkf_lib_id')

  const inkf_id = prop.inkf_id

  const [selectedRows, setSelectedRows] = useState(lkf_lib)
  const joinedArray = joinArrays(fix, lkf_lib_keg)

  const [inputs, setInputs] = useState(joinedArray)

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

  const handleInputChange = (lkf_lib_id, e) => {
    const newInputs = inputs.map(input =>
      input.lkf_lib_id === lkf_lib_id ? { ...input, urutan: e.target.value } : input
    )

    setInputs(newInputs)
  }

  return (
    <>
      {inputs.map((item, index) => {
        const { nama, uraian, lkf_lib_id, urutan } = item
        // eslint-disable-next-line react-hooks/rules-of-hooks

        return (
          <TableRow key={index}>
            <TableCell padding='checkbox'>
              <Checkbox
                className='row'
                name='fix'
                value={lkf_lib_id}
                checked={selectedRows.includes(lkf_lib_id)}
                onChange={e => handleCheckboxClick(e, lkf_lib_id)}
              />
            </TableCell>
            <TableCell scope='row'>
              {inkf_id}.{index + 1}
            </TableCell>
            <TableCell>{nama}</TableCell>
            <TableCell>{uraian}</TableCell>
            <TableCell>Tabel Fix</TableCell>
            <TableCell>
              <CustomTextField
                placeholder='urutan'
                value={urutan}
                name='urutan'
                id={`urutan${lkf_lib_id}`}
                onChange={e => handleInputChange(lkf_lib_id, e)}
              />
            </TableCell>
          </TableRow>
        )
      })}
    </>
  )
}

export default FormDinamis
