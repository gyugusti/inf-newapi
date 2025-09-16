import { useEffect, useRef, useState } from 'react'

import Link from 'next/link'

import { Icon } from '@iconify/react/dist/iconify.js'
import {
  Menu,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography
} from '@mui/material'
import Button from '@mui/material/Button'
import ButtonGroup from '@mui/material/ButtonGroup'
import Pagination from '@mui/material/Pagination'

import { useDispatch, useSelector } from 'react-redux'

import Loading from '@/components/Loading'
import HasilEvaluasiCetak from '@/components/lvkf/HasilEvaluasiCetak'
import DialogKonfirmasi from '@/components/widget/DialogKonfirmasi'
import { changePage, getLkf, lkfKirim } from '@/redux-store/lkf'
import { handleLog } from '@/redux-store/referensi-infara'
import { formatDates } from '@/utils/helper'
import LogLkf from '../LogLkf'

const IndexLvkf = () => {
  const dispatch = useDispatch()

  const [showConfirmationSend, setShowConfirmationSend] = useState(false)
  const [showConfirmation, setShowConfirmation] = useState(false)

  const [lkfId, setLkfId] = useState()
  const [open, setOpen] = useState(false)
  const [dataLkf, setDataLkf] = useState(false)

  const { fas_id, lvkf, isLoading, numOfPages, current_page, per_page, tab, status } = useSelector(store => store.lkf)

  const indexOfLastItem = current_page * per_page
  const indexOfFirstItem = indexOfLastItem - per_page

  const handlePageChange = (event, value) => {
    dispatch(changePage(value))
  }

  useEffect(() => {
    if (fas_id) {
      dispatch(getLkf())
    }
  }, [dispatch, current_page, tab, status, fas_id])

  if (isLoading || !lvkf || fas_id === null) {
    return <Loading />
  }

  const handleKirim = lkfId => {
    setLkfId(lkfId)
    setShowConfirmationSend(true)
  }

  const handleClickLog = ({ id, data }) => {
    setOpen(true)
    setDataLkf(data)
    dispatch(handleLog({ name: 'lkf_id', value: id }))
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
        <ButtonGroup variant='tonal' color='primary' ref={anchorRef} aria-label='split button' size='small'>
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
              key={`log${item.lkf_id}`}
              sx={{ '& svg': { mr: 2 } }}
              onClick={() => handleClickLog({ id: item.lkf_id, data: item })}
            >
              <Icon icon='tabler:timeline' fontSize={18} />
              <Typography variant='inherit' fontSize={15}>
                Log Proses
              </Typography>
            </MenuItem>

            <MenuItem
              key={`cetak${item.lkf_id}`}
              sx={{ '& svg': { mr: 2 } }}
              component={Link}
              target='_blank'
              href={{ pathname: `/cetak/spi`, query: { ...item.spi } }}
            >
              <Icon icon='tabler:file' fontSize={18} />
              <Typography variant='inherit' fontSize={15}>
                Cetak (PDF) {item?.spi?.surat_id}
              </Typography>
            </MenuItem>
            <MenuItem
              key={`update${item.lkf_id}`}
              component={Link}
              sx={{ '& svg': { mr: 2 } }}
              href={{ pathname: `${item.lkf_id}`, query: { id: item.lkf_id } }}
            >
              <Icon icon='tabler:brand-databricks' fontSize={18} />
              <Typography variant='inherit' fontSize={15}>
                Lengkapi Data
              </Typography>
            </MenuItem>
            <MenuItem
              key={`pemohon${item.lkf_id}`}
              sx={{ '& svg': { mr: 2 } }}
              onClick={() => handleKirim(item.lkf_id)}
            >
              <Icon icon='tabler:send' fontSize={18} />
              <Typography variant='inherit' fontSize={15}>
                Kirim LKF
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
              <TableCell>No LVKF</TableCell>
              <TableCell>Kode Area</TableCell>
              <TableCell>Pemanfaatan</TableCell>
              <TableCell>Tanggal Pelaksanaan</TableCell>
              <TableCell>Hasil Evaluasi</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {lvkf.map((item, index) => {
              return (
                <TableRow key={index}>
                  <TableCell scope='row'>{indexOfFirstItem + index + 1}</TableCell>
                  <TableCell>
                    <RowOptions id={item.jadwal_id} item={item} />
                  </TableCell>
                  <TableCell>{item.no_lkf}</TableCell>
                  <TableCell>{item.jadwal?.kode_area} </TableCell>
                  <TableCell>{item.kelompok.nama} </TableCell>
                  <TableCell>
                    {item.jadwal !== null && formatDates(item.jadwal.tgl_mulai, item.jadwal.tgl_akhir)}
                  </TableCell>
                  <TableCell>
                    <HasilEvaluasiCetak hasilEvaId={item.hasil_eva_id} />
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <Pagination count={numOfPages} page={current_page} onChange={handlePageChange} />

      {open && <LogLkf open={open} data={dataLkf} handleClose={handleModalClose} />}

      <DialogKonfirmasi
        open={showConfirmationSend}
        setOpen={showConfirmationSend}
        jadwalId={lkfId}
        onConfirm={lkfId => {
          if (lkfId !== 'no') {
            dispatch(lkfKirim(lkfId))
          }

          setShowConfirmationSend(false)
        }}
        message='Lvkf akan dikirimkan ke BAPETEN ? '
      />
    </>
  )
}

export default IndexLvkf
