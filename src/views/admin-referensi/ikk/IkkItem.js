import React, { useState } from 'react'

import Link from 'next/link'

import TableRow from '@mui/material/TableRow'
import TableCell from '@mui/material/TableCell'

import IconButton from '@mui/material/IconButton'
import { Icon } from '@iconify/react/dist/iconify.js'
import Tooltip from '@mui/material/Tooltip'
import { useDispatch } from 'react-redux'

import CustomChip from '@core/components/mui/Chip'

import OptionsMenu from '@/@core/components/option-menu'

const IkkItem = prop => {
  const dispatch = useDispatch()
  const lib = prop.ikkItem
  const inkf_id = prop.inkf_id

  return (
    <>
      {lib.map((item, index) => {
        const { kode, uraian, ikk_item_id } = item

        return (
          <TableRow key={index}>
            <TableCell scope='row'>
              {inkf_id}.{index + 1}
            </TableCell>
            <TableCell>{kode}</TableCell>
            <TableCell>{uraian}</TableCell>
            <TableCell></TableCell>
          </TableRow>
        )
      })}
    </>
  )
}

export default IkkItem
