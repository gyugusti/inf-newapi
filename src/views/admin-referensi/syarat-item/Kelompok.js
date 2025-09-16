import React, { useEffect } from 'react'

import Link from 'next/link'

import { useDispatch, useSelector } from 'react-redux'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'

import { Icon } from '@iconify/react'

import { getkelKegiatan } from '@/redux-store/admin-referensi/kelompok-kegiatan'

function Kelompok() {
  const dispatch = useDispatch()
  const { kelompokKegiatan, current_page, per_page } = useSelector(store => store.kelKegiatan)

  useEffect(() => {
    dispatch(getkelKegiatan())
  }, [dispatch])

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label='simple table'>
          <TableHead>
            <TableRow>
              <TableCell component='th'>No</TableCell>
              <TableCell>Kel.ID</TableCell>
              <TableCell>Nama</TableCell>
              <TableCell>Item</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {kelompokKegiatan.map((item, index) => {
              const { kelompok_id, nama, syarat_ins_count } = item

              return (
                <TableRow key={index}>
                  <TableCell component='th' scope='row'>
                    {index + 1}
                  </TableCell>

                  <TableCell>{kelompok_id}</TableCell>
                  <TableCell>{nama}</TableCell>
                  <TableCell>{syarat_ins_count}</TableCell>
                  <TableCell>
                    <Link
                      href={{
                        pathname: `/admin-referensi/syarat-item/${kelompok_id}`,
                        query: { nama: nama }
                      }}
                    >
                      <Icon icon='tabler:edit' fontSize={20} />
                    </Link>
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

export default Kelompok
