import React, { Fragment, useEffect, useRef, useState } from 'react'

import Link from 'next/link'

import { useSession } from 'next-auth/react'
import {
  Table,
  IconButton,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  MenuItem,
  Menu,
  ListItemIcon,
  ListItemText
} from '@mui/material'
import ButtonGroup from '@mui/material/ButtonGroup'
import Button from '@mui/material/Button'
import { Icon } from '@iconify/react/dist/iconify.js'

import { useDispatch, useSelector } from 'react-redux'

import Pagination from '@mui/material/Pagination'

import CustomChip from '@core/components/mui/Chip'
import { changePage, clearValues, getListSbi, setFasilitas } from '@/redux-store/sbi'
import { formatDates, fullDay } from '@/utils/helper'

import Loading from '@/components/Loading'
import StatusKonfirmasi from '@/components/jadwal/StatusKonfirmasi'
import { alamatCetak } from '@/utils/balishelper'
import FormKonfirmasi from './FormKonfirmasi'

export const DataSbi = () => {
  const dispatch = useDispatch()
  const { data: session } = useSession()
  const fas_id = session?.user?.fas_id

  const [open, setOpen] = useState(false)
  const [id, setId] = useState(false)
  const [dataForm, setDataForm] = useState()

  const handleClickOpen = data => {
    setDataForm(data)
    setOpen(true)
  }

  const handleClose = () => setOpen(false)

  const { listSurat, isLoading, numOfPages, current_page, per_page, tab, status_id } = useSelector(store => store.sbi)

  const indexOfLastItem = current_page * per_page
  const indexOfFirstItem = indexOfLastItem - per_page

  const handlePageChange = (event, value) => {
    dispatch(changePage(value))
  }

  useEffect(() => {
    dispatch(setFasilitas(fas_id))
    dispatch(getListSbi())
  }, [dispatch, current_page, status_id, tab, fas_id])

  if (isLoading || !listSurat) {
    return <Loading />
  }

  const RowOptions = ({ id, item }) => {
    // ** Hooks
    const dispatch = useDispatch()
    const anchorRef = useRef(null)

    // ** State
    const [anchorEl, setAnchorEl] = useState(null)
    const rowOptionsOpen = Boolean(anchorEl)

    const handleRowOptionsClick = event => {
      setAnchorEl(event.currentTarget)
    }

    const handleRowOptionsClose = () => {
      setAnchorEl(null)
    }

    return (
      <>
        <ButtonGroup variant='tonal' ref={anchorRef} aria-label='split button' size='small'>
          <Button size='small' onClick={handleRowOptionsClick}>
            <Icon icon='tabler:dots-vertical' />
          </Button>
          <Menu
            keepMounted
            anchorEl={anchorEl}
            open={rowOptionsOpen}
            onClose={handleRowOptionsClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right'
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right'
            }}
            PaperProps={{ style: { minWidth: '8rem' } }}
          >
            <MenuItem
              key={`sbi${item.surat_id}`}
              component={Link}
              sx={{ '& svg': { mr: 2 } }}
              href={{
                pathname: `/cetak/sbi`,
                query: { surat_id: item.surat_id }
              }}
              target='_blank'
            >
              <Icon icon='tabler:file' fontSize={20} />
              Cetak SBI
            </MenuItem>

            {item.konfirmasi === null ? (
              <MenuItem key={`edit${item.jadwal_id}`} sx={{ '& svg': { mr: 2 } }} onClick={() => handleClickOpen(item)}>
                <Icon icon='tabler:tooltip' fontSize={20} />
                Konfirmasi
              </MenuItem>
            ) : (
              <MenuItem
                key={`sbi${item.pdf}`}
                component={Link}
                sx={{ '& svg': { mr: 2 } }}
                href={{ pathname: `/cetak/konfirmasi`, query: { surat_id: item.surat_id } }}
                target='_blank'
              >
                <Icon icon='tabler:file' fontSize={20} />
                Cetak Konfirmasi
              </MenuItem>
            )}
          </Menu>
        </ButtonGroup>
      </>
    )
  }

  return (
    <>
      <TableContainer>
        <Table sx={{ minWidth: 650 }} aria-label='simple table'>
          <TableHead>
            <TableRow>
              <TableCell component='th'>NO</TableCell>
              <TableCell>Action </TableCell>
              <TableCell>No. SBI </TableCell>
              <TableCell>Tanggal Inspeksi</TableCell>
              <TableCell>Pemanfaatan </TableCell>
              <TableCell>Lokasi</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {listSurat.map((item, index) => {
              return (
                <TableRow key={index}>
                  <TableCell scope='row'>{indexOfFirstItem + index + 1}</TableCell>
                  <TableCell>
                    <RowOptions id={item.surat_id} item={item} />
                  </TableCell>
                  <TableCell>{item.no_surat}</TableCell>
                  <TableCell>
                    {item.jadwal !== null && formatDates(item.jadwal.tgl_mulai, item.jadwal.tgl_akhir)}
                  </TableCell>
                  <TableCell>
                    {[...new Set((item.jadwal_fas?.jadwal_tujuan ?? []).map(kel => kel.kelompok?.nama))].map(
                      (nama, index) => (
                        <span style={{ color: 'green' }} key={index}>
                          {nama}
                        </span>
                      )
                    )}
                  </TableCell>
                  <TableCell>
                    {item.alamat_cetak}
                    {alamatCetak(item.jadwal_fas.alamat, '')}
                  </TableCell>
                  <TableCell>
                    <StatusKonfirmasi konfirmasi={item.konfirmasi?.konfirmasi} />
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <Pagination count={numOfPages} page={current_page} onChange={handlePageChange} />
      {open && <FormKonfirmasi id={id} data={dataForm} open={open} handleClose={handleClose} />}
    </>
  )
}

export default DataSbi
