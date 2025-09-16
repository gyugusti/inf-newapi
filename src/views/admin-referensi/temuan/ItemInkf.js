import React, { useState } from 'react'

import Link from 'next/link'

import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'

import IconButton from '@mui/material/IconButton'
import { Icon } from '@iconify/react/dist/iconify.js'
import { useDispatch } from 'react-redux'

import { deleteItemLib, setEdit } from '@/redux-store/admin-referensi/temuan'

const ItemInkf = prop => {
  const dispatch = useDispatch()
  const lib = prop.itemLib

  const handleEdit = item => {
    dispatch(
      setEdit({
        ...item
      })
    )
  }

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label='simple table'>
          <TableHead>
            <TableRow>
              <TableCell component='th'>NO</TableCell>
              <TableCell>LEVEL</TableCell>
              <TableCell>NAMA TEMUAN</TableCell>
              <TableCell>KETERANGAN</TableCell>
              <TableCell>KODE TEMUAN</TableCell>
              <TableCell>URUTAN</TableCell>
              <TableCell>ACTION</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {lib.map((item, index) => {
              const { nama_temuan, ket_temuan, inkf_id, temuan_lvl, temuan_id } = item
              let color = 'success'

              if (temuan_lvl.level === 'I') {
                color = 'error'
              } else if (temuan_lvl.level === 'II') {
                color = 'warning'
              }

              return (
                <TableRow key={index}>
                  <TableCell scope='row'>{index + 1}</TableCell>
                  <TableCell>{temuan_lvl.level}</TableCell>
                  <TableCell>{nama_temuan}</TableCell>
                  <TableCell>{ket_temuan}</TableCell>
                  <TableCell>{item.kode_temuan}</TableCell>
                  <TableCell>{item.urut_temuan}</TableCell>
                  <TableCell>
                    <Link
                      href={{
                        pathname: `/admin-referensi/temuan/inkf/form`,
                        query: { inkf_id: inkf_id, ...item }
                      }}
                      onClick={() => handleEdit(item)}
                    >
                      <IconButton color='primary'>
                        <Icon icon='tabler:edit' fontSize={20} />
                      </IconButton>
                    </Link>

                    <IconButton
                      aria-label='capture screenshot'
                      color='error'
                      onClick={() => dispatch(deleteItemLib(temuan_id))}
                    >
                      <Icon icon='tabler:trash' />
                    </IconButton>
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}

export default ItemInkf
