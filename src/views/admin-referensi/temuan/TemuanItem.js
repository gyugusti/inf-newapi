import React, { useState } from 'react'

import Link from 'next/link'

import TableRow from '@mui/material/TableRow'
import TableCell from '@mui/material/TableCell'

import IconButton from '@mui/material/IconButton'
import { Icon } from '@iconify/react/dist/iconify.js'
import { useDispatch } from 'react-redux'

import CustomChip from '@core/components/mui/Chip'

import { deleteTemuanKel } from '@/redux-store/admin-referensi/temuan'

const TemuanItem = prop => {
  const dispatch = useDispatch()
  const lib = prop.itemLib
  const inkf_id = prop.inkf_id

  return (
    <>
      {lib.map((item, index) => {
        const { nama_temuan, ket_temuan, temuan_lvl, acuan_id } = item
        let color = 'success'

        if (!prop.view) {
          if (temuan_lvl.level === 'I') {
            color = 'error'
          } else if (temuan_lvl.level === 'II') {
            color = 'warning'
          }
        }

        return (
          <TableRow key={index}>
            <TableCell scope='row'>
              {inkf_id}.{index + 1}
            </TableCell>
            <TableCell>{nama_temuan}</TableCell>
            <TableCell>{ket_temuan}</TableCell>
            <TableCell>
              {!prop.view && <CustomChip label={temuan_lvl?.level} size='small' color={color} round='true' />}
              {prop.view && (
                <IconButton
                  aria-label='capture screenshot'
                  color='error'
                  onClick={() => dispatch(deleteTemuanKel(acuan_id))}
                >
                  <Icon icon='tabler:trash' />
                </IconButton>
              )}
            </TableCell>
          </TableRow>
        )
      })}
    </>
  )
}

export default TemuanItem
