import { useEffect, useRef, useState } from 'react'

import Link from 'next/link'

import { Icon } from '@iconify/react/dist/iconify.js'
import { Menu, MenuItem, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import Button from '@mui/material/Button'
import ButtonGroup from '@mui/material/ButtonGroup'
import { useDispatch, useSelector } from 'react-redux'

import Pagination from '@mui/material/Pagination'

import { useSession } from 'next-auth/react'

import Loading from '@/components/Loading'
import KonfirmasiDialog from '@/components/widget/KonfirmasiDialog'
import { changePage, getJadwalIns, kirimJadwalInsp, setInspektur, setTab } from '@/redux-store/jadwal'
import DetailJadwal from '../DetailJadwal'
import KonfirmasiInspektur from './KonfirmasiInspektur'

export const JadwalContainer = () => {
  const dispatch = useDispatch()
  const { data: session } = useSession() // Retrieve session data

  const [open, setOpen] = useState(false)
  const [id, setId] = useState(false)
  const [dataForm, setDataForm] = useState()

  const [openDetail, setOpenDetail] = useState(false)
  const [dataDetail, setDataDetail] = useState()

  const [showConfirmationSend, setShowConfirmationSend] = useState(false)
  const [konfirmId, setKonfirmId] = useState()
  const [riwId, setRiwId] = useState()

  const handleClickOpen = data => {
    setDataDetail(data)
    setOpenDetail(true)
  }

  const handleClose = () => setOpenDetail(false)

  const handleFormOpen = data => {
    setDataForm(data)
    setOpen(true)
  }

  const handleFormClose = () => setOpen(false)

  const insp_master_id = session?.user?.insp_master_id

  const { listJadwalIns, isLoading, numOfPages, current_page, per_page, status, bidang_id, propinsi_id, tab } =
    useSelector(store => store.jadwal)

  const indexOfLastItem = current_page * per_page
  const indexOfFirstItem = indexOfLastItem - per_page

  const handlePageChange = (event, value) => {
    dispatch(changePage(value))
  }

  const handleKirimClick = item => {
    setKonfirmId(item.id)
    setShowConfirmationSend(true)
  }

  useEffect(() => {
    dispatch(setInspektur(insp_master_id))

    if (status) {
      dispatch(getJadwalIns())
    }
  }, [dispatch, current_page, status, bidang_id, propinsi_id, tab, insp_master_id])

  if (isLoading || !listJadwalIns) {
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
        <ButtonGroup variant='contained' color='primary' ref={anchorRef}>
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
            <MenuItem sx={{ '& svg': { mr: 2 } }} onClick={() => handleClickOpen(item)}>
              <Icon icon='tabler:list-details' fontSize={20} />
              Detail Jadwal
            </MenuItem>

            {item.jadwal_inspektur.konfirmasi && (
              <MenuItem
                key={`update${item.jadwal_id}`}
                component={Link}
                sx={{ '& svg': { mr: 2 } }}
                href={{ pathname: `cetak/konfirmasi-insp`, query: { id: item.jadwal_inspektur.konfirmasi.id } }}
                target='_blank'
              >
                <Icon icon='tabler:eye' fontSize={20} />
                Cetak Konfirmasi
              </MenuItem>
            )}

            <MenuItem key={`konfirm${item.jadwal_id}`} sx={{ '& svg': { mr: 2 } }} onClick={() => handleFormOpen(item)}>
              <Icon icon='tabler:file-info' fontSize={20} />
              Konfirmasi Online
            </MenuItem>
            {item.jadwal_inspektur.konfirmasi && (
              <MenuItem
                key={`kirim${item.jadwal_id}`}
                sx={{ '& svg': { mr: 2 } }}
                href='/jadwal'
                onClick={() => handleKirimClick(item.jadwal_inspektur.konfirmasi)}
              >
                <Icon icon='tabler:send' fontSize={20} />
                Kirim Konfirmasi
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
              <TableCell>Kode Area </TableCell>
              <TableCell>Propinsi</TableCell>
              <TableCell>Jml. Instansi</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {listJadwalIns.map((item, index) => {
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

                  <TableCell>{item.status.nama}</TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <Pagination count={numOfPages} page={current_page} onChange={handlePageChange} />
      {open && <KonfirmasiInspektur id={id} data={dataForm} open={open} handleClose={handleFormClose} />}
      {openDetail && <DetailJadwal data={dataDetail} open={openDetail} handleClose={handleClose} />}

      <KonfirmasiDialog
        open={showConfirmationSend}
        setOpen={showConfirmationSend}
        Id={konfirmId}
        onConfirm={konfirmId => {
          if (konfirmId !== 'no') {
            dispatch(kirimJadwalInsp(konfirmId))
            dispatch(setTab(konfirmId))
          }

          setShowConfirmationSend(false)
        }}
        message='Konfirmasi jadwal akan dikirim ke Verifikator'
      />
    </>
  )
}
