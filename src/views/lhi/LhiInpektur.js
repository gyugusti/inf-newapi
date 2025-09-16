import React, { Fragment, useEffect, useRef, useState } from 'react'

import Link from 'next/link'

import { useSession } from 'next-auth/react'
import {
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Paper,
  Typography,
  ButtonGroup,
  useColorScheme,
  MenuItem,
  Menu,
  ListItemIcon,
  ListItemText
} from '@mui/material'
import { Icon } from '@iconify/react/dist/iconify.js'
import { useDispatch, useSelector } from 'react-redux'

import { getLhi, changePage, setInspektur, lhiKirimVer } from '@/redux-store/lhi'
import Loading from '@/components/Loading'
import { formatDates, fullDay } from '@/utils/helper'
import { handleLog } from '@/redux-store/referensi-infara'
import LogLhi from './LogLhi'
import DialogKonfirmasi from '@/components/widget/DialogKonfirmasi'
import { useSettings } from '@/@core/hooks/useSettings'

const LhiInpektur = () => {
  const dispatch = useDispatch()
  const bgColors = useSettings()
  const { data: session } = useSession()

  const [showConfirmationSend, setShowConfirmationSend] = useState(false)
  const [lhiId, setLhiId] = useState()

  const [open, setOpen] = useState(false)
  const [dataLhi, setDataLhi] = useState(false)

  const insp_master_id = session?.user?.insp_master_id

  const { lhi, isLoading, numOfPages, current_page, per_page, status_id, bidang_id, propinsi_id, tab } = useSelector(
    store => store.lhi
  )

  const indexOfLastItem = current_page * per_page
  const indexOfFirstItem = indexOfLastItem - per_page

  const handlePageChange = (event, value) => {
    dispatch(changePage(value))
  }

  useEffect(() => {
    dispatch(setInspektur(insp_master_id))

    if (status_id) {
      dispatch(getLhi())
    }
  }, [dispatch, current_page, status_id, bidang_id, propinsi_id, tab, insp_master_id])

  if (isLoading || !lhi) {
    return <Loading />
  }

  const handleKirimClick = item => {
    setLhiId(item.lhi_id)
    setShowConfirmationSend(true)
  }

  const handleClickLog = ({ id, data }) => {
    setOpen(true)
    setDataLhi(data)
    dispatch(handleLog({ name: 'lhi_id', value: id }))
  }

  const handleModalClose = () => setOpen(false)

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
        <ButtonGroup variant='contained' color='primary' ref={anchorRef} aria-label='split button'>
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
            {item.status_id === 0 && [
              <MenuItem
                key={`update-lhi-${item.jadwal_id}`}
                component={Link}
                sx={{ '& svg': { mr: 2 } }}
                href={{
                  pathname: `lhi/penyusunan`,
                  query: { id: item.lhi_id }
                }}
              >
                <Icon icon='tabler:edit' fontSize={18} />
                <Typography variant='inherit' fontSize={15}>
                  Update LHI
                </Typography>
              </MenuItem>,
              <MenuItem
                key={`kirim-${item.jadwal_id}`}
                sx={{ '& svg': { mr: 2 } }}
                onClick={() => handleKirimClick(item)}
              >
                <Icon icon='tabler:send' fontSize={18} />
                <Typography variant='inherit' fontSize={15}>
                  Kirim
                </Typography>
              </MenuItem>
            ]}
            <MenuItem
              key={`log-proses-${item.jadwal_id}`}
              sx={{ '& svg': { mr: 2 } }}
              onClick={() => handleClickLog({ id: item.lhi_id, data: item })}
            >
              <Icon icon='tabler:details' fontSize={18} />
              <Typography variant='inherit' fontSize={15}>
                Log Proses
              </Typography>
            </MenuItem>
            <MenuItem
              key={`view-lhi-pdf-${item.lhi_id}`}
              component={Link}
              sx={{ '& svg': { mr: 2 } }}
              href={{
                pathname: `/cetak/lhi`,
                query: { id: item.lhi_id }
              }}
              target='_blank'
            >
              <Icon icon='tabler:file' fontSize={18} />
              <Typography variant='inherit' fontSize={15}>
                View LHI (PDF)
              </Typography>
            </MenuItem>
            <MenuItem
              key={`draft-sphi-pdf-${item.lhi_id}`}
              component={Link}
              sx={{ '& svg': { mr: 2 } }}
              href={{
                pathname: `/cetak/draft-sphi`,
                query: { id: item.lhi_id }
              }}
              target='_blank'
            >
              <Icon icon='tabler:file' fontSize={18} />
              <Typography variant='inherit' fontSize={15}>
                Draft SPHI PDF
              </Typography>
            </MenuItem>
          </Menu>
        </ButtonGroup>
      </>
    )
  }

  return (
    <>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>No</TableCell>
              <TableCell>Action</TableCell>
              <TableCell>No LHI</TableCell>
              <TableCell>Tanggal Inspeksi / Kegiatan</TableCell>
              <TableCell>Kode Area</TableCell>
              <TableCell>Fasilitas/Lokasi</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Catatan Verifikator</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {lhi.map((row, index) => (
              <TableRow key={index}>
                <TableCell scope='row'>{indexOfFirstItem + index + 1}</TableCell>
                <TableCell>
                  <RowOptions id={row.lhi_id} item={row} />
                </TableCell>
                <TableCell>{row.no_master_lhi}</TableCell>
                <TableCell>
                  {row.tgl_mulai !== null && formatDates(row.tgl_mulai, row.tgl_akhir)}
                  <br />
                  {row.kelompok.nama}
                </TableCell>
                <TableCell>{row.jadwal.kode_area}</TableCell>
                <TableCell>
                  {row.fas.nama}
                  <br />
                  {row.lokasi}
                </TableCell>
                <TableCell>{row.status.nama}</TableCell>
                <TableCell>{row.catatan_verifikator}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Pagination count={numOfPages} page={current_page} onChange={handlePageChange} />
      {open && <LogLhi open={open} data={dataLhi} handleClose={handleModalClose} />}

      <DialogKonfirmasi
        open={showConfirmationSend}
        setOpen={showConfirmationSend}
        jadwalId={lhiId}
        onConfirm={lhiId => {
          if (lhiId !== 'no') {
            dispatch(lhiKirimVer(lhiId))
          }

          setShowConfirmationSend(false)
        }}
        message='LHI akan dikirimkan ke Verifikator ? '
      />
    </>
  )
}

export default LhiInpektur
