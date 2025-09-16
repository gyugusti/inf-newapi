import React, { Fragment, useEffect, useRef, useState } from 'react'

import Link from 'next/link'

import { TableContainer, Table, TableHead, TableRow, TableBody, TableCell, Button, IconButton } from '@mui/material'
import { Icon } from '@iconify/react/dist/iconify.js'
import { useDispatch, useSelector } from 'react-redux'
import { useSession } from 'next-auth/react'

import Pagination from '@mui/material/Pagination'

import Loading from '@/components/Loading'
import { getfihiJadwal, setTab, changePage, getFihi } from '@/redux-store/fihi'
import { setInspektur } from '@/redux-store/jadwal'
import { formatDates, fullDay } from '@/utils/helper'

const ArsipFihi = () => {
  const dispatch = useDispatch()
  const { data: session } = useSession()

  const { fihi, isLoading, numOfPages, current_page, per_page, tab } = useSelector(store => store.fihi)

  const indexOfLastItem = current_page * per_page
  const indexOfFirstItem = indexOfLastItem - per_page

  const handlePageChange = (event, value) => {
    dispatch(changePage(value))
  }

  const insp_master_id = session?.user?.insp_master_id

  useEffect(() => {
    dispatch(setInspektur(insp_master_id))
    dispatch(getFihi())
  }, [dispatch, current_page, insp_master_id, tab])

  if (isLoading) {
    return <Loading />
  }

  return (
    <>
      <TableContainer>
        <Table sx={{ minWidth: 650 }} aria-label='simple table'>
          <TableHead>
            <TableRow>
              <TableCell component='th'>NO</TableCell>
              <TableCell>No FIHI </TableCell>
              <TableCell>Jadwal </TableCell>
              <TableCell>Kode Area</TableCell>
              <TableCell>Propinsi </TableCell>
              <TableCell>Tgl. FIHI </TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {fihi.map((item, index) => {
              return (
                <TableRow key={index}>
                  <TableCell scope='row'>{indexOfFirstItem + index + 1}</TableCell>
                  <TableCell>{item.no_fihi}</TableCell>
                  <TableCell>
                    {item.jadwal !== null && formatDates(item.jadwal.tgl_mulai, item.jadwal.tgl_akhir)}
                  </TableCell>
                  <TableCell>{item.jadwal.kode_area} </TableCell>
                  <TableCell>{item.jadwal.propinsi.nama} </TableCell>
                  <TableCell>{item.tgl_fihi} </TableCell>
                  <TableCell>
                    <Link
                      href={{
                        pathname: '/cetak/fihi',
                        query: { id: item.fihi_id }
                      }}
                      passHref
                      target='_blank'
                    >
                      <Button variant='contained' size='small' sx={{ mb: 2, '& svg': { mr: 2 } }}>
                        <Icon fontSize='1.125rem' icon='tabler:file' />
                        Cetak Fihi
                      </Button>
                    </Link>
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <Pagination count={numOfPages} page={current_page} onChange={handlePageChange} />
    </>
  )
}

export default ArsipFihi
