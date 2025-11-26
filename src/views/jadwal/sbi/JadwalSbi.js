import React, { Fragment, useEffect, useRef, useState } from 'react'

import Link from 'next/link'

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
import { changePage, clearValues, getJadwal } from '@/redux-store/jadwal'

import Loading from '@/components/Loading'
import FormSpi from './FormSpi'

export const JadwalSbi = () => {
  const dispatch = useDispatch()
  const [open, setOpen] = useState(false)
  const [edit, setEdit] = useState(false)
  const [dataForm, setDataForm] = useState()
  const [dataSurat, setDataSurat] = useState()

  const { listJadwal, isLoading, numOfPages, current_page, per_page, status, bidang_id, propinsi_id, tab } =
    useSelector(store => store.jadwal)

  const indexOfLastItem = current_page * per_page
  const indexOfFirstItem = indexOfLastItem - per_page

  const handlePageChange = (event, value) => {
    dispatch(changePage(value))
  }

  useEffect(() => {
    dispatch(getJadwal())
  }, [dispatch, current_page, status, bidang_id, propinsi_id, tab])

  if (isLoading || !listJadwal) {
    return <Loading />
  }

  // Handle Edit dialog
  const handleClickOpen = data => {
    setDataForm(data)
    setOpen(true)
  }

  const handleClickEdit = (item, spi) => {
    setDataSurat(spi)
    setDataForm(item)
    setOpen(true)
    setEdit(true)
  }

  const handleClose = () => setOpen(false)

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
        <ButtonGroup variant='outlined' color='primary' ref={anchorRef} aria-label='split button'>
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
              key={`detail${item.jadwal_id}`}
              sx={{ '& svg': { mr: 2 } }}
              href='/jadwal'
              onClick={() => handleKirimClick(item.jadwal_id)}
            >
              <Icon icon='tabler:details' fontSize={18} />
              <Typography variant='inherit' fontSize={15}>
                Detail Jadwal
              </Typography>
            </MenuItem>
            <MenuItem
              key={`update${item.jadwal_id}`}
              component={Link}
              sx={{ '& svg': { mr: 2 } }}
              href={{ pathname: `spi-sbi/${item.jadwal_id}`, query: { id: item.jadwal_id } }}
            >
              <Icon icon='tabler:border-right-plus' fontSize={18} />
              <Typography variant='inherit' fontSize={15}>
                Buat SBI
              </Typography>
            </MenuItem>
            {item.spi && (
              <>
                <MenuItem
                  key={`kirim${item.jadwal_id}`}
                  sx={{ '& svg': { mr: 2 } }}
                  onClick={() => handleClickEdit(item, item.spi)}
                >
                  <Icon icon='tabler:edit' fontSize={18} />
                  <Typography variant='inherit' fontSize={15}>
                    Edit SPI {item.data_surat_count}
                  </Typography>
                </MenuItem>
                <MenuItem
                  key={`cetak${item.jadwal_id}`}
                  sx={{ '& svg': { mr: 2 } }}
                  component={Link}
                  target='_blank'
                  href={{ pathname: `/cetak/spi`, query: { ...item.spi } }}
                >
                  <Icon icon='tabler:file' fontSize={18} />
                  <Typography variant='inherit' fontSize={15}>
                    Surat SPI {item.data_surat_count}
                  </Typography>
                </MenuItem>
              </>
            )}
            {!item.spi && (
              <MenuItem
                key={`kirim${item.jadwal_id}`}
                sx={{ '& svg': { mr: 2 } }}
                onClick={() => handleClickOpen(item)}
              >
                <Icon icon='tabler:plus' fontSize={18} />
                <Typography variant='inherit' fontSize={15}>
                  Buat SPI {item.data_surat_count}
                </Typography>
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
              <TableCell>Tanggal</TableCell>
              <TableCell>Kode Area / Bidang </TableCell>
              <TableCell>Propinsi</TableCell>
              <TableCell>Jml. Instansi</TableCell>
              <TableCell>Jml. Kegiatan</TableCell>
              <TableCell>Jml. SBI</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {listJadwal.map((item, index) => {
              return (
                <TableRow key={index}>
                  <TableCell scope='row'>{indexOfFirstItem + index + 1}</TableCell>
                  <TableCell>
                    <RowOptions id={item.jadwal_id} item={item} />
                  </TableCell>
                  <TableCell>
                    {item.tgl_mulai} - {item.tgl_akhir}
                  </TableCell>
                  <TableCell>
                    {item.kode_area} - {item.bidang.nama}
                  </TableCell>
                  <TableCell>{item.propinsi.nama}</TableCell>
                  <TableCell>{item.jadwal_fas_count} </TableCell>
                  <TableCell>{item.jadwal_tujuan_count} </TableCell>
                  <TableCell>{item.sbi_count}</TableCell>
                  <TableCell>
                    {item.status.nama} <br />
                    {item.status_sbi === 1 && <CustomChip label='SPI telah dikirimkan ' skin='light' color='success' />}
                    <br />
                    {item.status_spi === 1 && <CustomChip label='SBI telah dikirimkan ' skin='light' color='success' />}
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <Pagination count={numOfPages} page={current_page} onChange={handlePageChange} />
      {open && <FormSpi dataForm={dataForm} dataSurat={dataSurat} open={open} edit={edit} handleClose={handleClose} />}
    </>
  )
}
