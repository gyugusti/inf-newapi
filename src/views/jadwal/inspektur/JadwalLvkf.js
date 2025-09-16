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
  MenuItem,
  Menu,
  ListItemIcon,
  ListItemText
} from '@mui/material'
import ButtonGroup from '@mui/material/ButtonGroup'
import Button from '@mui/material/Button'
import { Icon } from '@iconify/react/dist/iconify.js'
import Typography from '@mui/material/Typography'

import { useDispatch, useSelector } from 'react-redux'
import { useSession } from 'next-auth/react'

import Pagination from '@mui/material/Pagination'

import { changePage, clearValues, getJadwal, setInspektur } from '@/redux-store/jadwal'
import Loading from '@/components/Loading'
import DetailJadwal from '../DetailJadwal'

export const JadwalLvkf = () => {
  const dispatch = useDispatch()
  const { data: session } = useSession()
  const [open, setOpen] = useState(false)
  const [dataDetail, setDataDetail] = useState()

  const insp_master_id = session?.user?.insp_master_id

  const { listJadwal, isLoading, numOfPages, current_page, per_page, status, bidang_id, propinsi_id, tab } =
    useSelector(store => store.jadwal)

  const indexOfLastItem = current_page * per_page
  const indexOfFirstItem = indexOfLastItem - per_page

  const handlePageChange = (event, value) => {
    dispatch(changePage(value))
  }

  useEffect(() => {
    dispatch(setInspektur(insp_master_id))

    if (status) {
      dispatch(getJadwal())
    }
  }, [dispatch, current_page, status, bidang_id, propinsi_id, tab, insp_master_id])

  if (isLoading || !listJadwal) {
    return <Loading />
  }

  const handleClickOpen = data => {
    setDataDetail(data)
    setOpen(true)
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
              onClick={() => handleClickOpen(item)}
            >
              <Icon icon='tabler:list-details' fontSize={20} />
              Detail Jadwal
            </MenuItem>
            <MenuItem
              key={`ver${item.jadwal_id}`}
              component={Link}
              sx={{ '& svg': { mr: 2 } }}
              href={{ pathname: `lvkf/${item.jadwal_id}`, query: { id: item.jadwal_id } }}
            >
              <Icon icon='tabler:file-spreadsheet' fontSize={20} />
              <Typography variant='inherit' fontSize={15}>
                Daftar LVKF
              </Typography>
            </MenuItem>
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
              <TableCell>Jml. LKF</TableCell>
              <TableCell>Jml. FIHI</TableCell>
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
                  <TableCell>{item.lkf_count}</TableCell>
                  <TableCell>{item.fihi_count}</TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <Pagination count={numOfPages} page={current_page} onChange={handlePageChange} />
      {open && <DetailJadwal data={dataDetail} open={open} handleClose={handleClose} />}
    </>
  )
}
