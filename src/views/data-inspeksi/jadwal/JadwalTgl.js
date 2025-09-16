import React, { Fragment, useEffect, useRef, useState } from 'react'

import Link from 'next/link'

import { Table, IconButton, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography , MenuItem, Menu, ListItemIcon, ListItemText } from '@mui/material'
import ButtonGroup from '@mui/material/ButtonGroup'
import Button from '@mui/material/Button'
import { Icon } from '@iconify/react/dist/iconify.js'


import { useDispatch, useSelector } from 'react-redux'
import Pagination from '@mui/material/Pagination'

import CustomChip from '@core/components/mui/Chip'
import Loading from '@/components/Loading'
import { changePage, clearValues, getJadwal, setInspektur } from '@/redux-store/jadwal'
import { formatDates, fullDay } from '@/utils/helper'

const JadwalTgl = () => {
  const dispatch = useDispatch()
  const [showConfirmationSend, setShowConfirmationSend] = useState(false)
  const [showConfirmation, setShowConfirmation] = useState(false)

  const { listJadwal, isLoading, numOfPages, current_page, per_page, status, bidang_id, propinsi_id, tab } =
    useSelector(store => store.jadwal)

  const indexOfLastItem = current_page * per_page
  const indexOfFirstItem = indexOfLastItem - per_page

  const handlePageChange = (event, value) => {
    dispatch(changePage(value))
  }

  useEffect(() => {
    dispatch(getJadwal())
  }, [dispatch, current_page, bidang_id, propinsi_id, tab])

  if (isLoading || !listJadwal) {
    return <Loading />
  }

  return (
    <>
      <TableContainer>
        <Table sx={{ minWidth: 650 }} aria-label='simple table'>
          <TableHead>
            <TableRow>
              <TableCell component='th'>NO</TableCell>
              <TableCell>Tanggal</TableCell>
              <TableCell>Kode Area / Bidang </TableCell>
              <TableCell>Propinsi</TableCell>
              <TableCell>Fasilitas</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {listJadwal.map((item, index) => {
              return (
                <TableRow key={index}>
                  <TableCell scope='row'>{indexOfFirstItem + index + 1}</TableCell>
                  <TableCell>
                    {item.tgl_mulai} - {item.tgl_akhir}
                  </TableCell>
                  <TableCell>
                    {item.kode_area} - {item.bidang.nama}
                  </TableCell>
                  <TableCell>{item.propinsi.nama}</TableCell>
                  <TableCell>{item.jadwal_fas_count} </TableCell>
                  <TableCell>{item.status.nama}</TableCell>
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

export default JadwalTgl
