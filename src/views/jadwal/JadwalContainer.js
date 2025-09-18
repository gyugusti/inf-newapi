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
import { useDispatch, useSelector } from 'react-redux'

import Pagination from '@mui/material/Pagination'

import Loading from '@/components/Loading'
import DialogKonfirmasi from '@/components/widget/DialogKonfirmasi'
import { JADWAL_DRAFT, JADWAL_PELAKSANAAN, JADWAL_PERBAIKAN, JADWAL_TERJADWAL } from '@/configs/jadwalConfig'
import {
  changePage,
  clearValues,
  deleteJadwal,
  getJadwal,
  jadwalPelaksanaan,
  jadwalSelesai,
  kembaliJadwal,
  kirimJadwal,
  setEditJadwal
} from '@/redux-store/jadwal'
import { getProsesLog, handleLog } from '@/redux-store/referensi-infara'
import LogJadwal from './action/Logjadwal'
import DetailJadwal from './DetailJadwal'

const JadwalContainer = prop => {
  const dispatch = useDispatch()

  const [showConfirmationDel, setShowConfirmationDel] = useState(false)
  const [showConfirmationSend, setShowConfirmationSend] = useState(false)
  const [showConfirmationLaksana, setShowConfirmationLaksana] = useState(false)
  const [showConfirmationSelesai, setShowConfirmationSelesai] = useState(false)

  const [showConfirmation, setShowConfirmation] = useState(false)
  const [messageConfirm, setMessageConfirm] = useState(false)
  const [openLog, setOpenLog] = useState(false)
  const [openDetail, setOpenDetail] = useState(false)

  const [dataForm, setDataForm] = useState()

  const [jadwalId, setJadwalId] = useState()
  const [dataJadwal, setDataJadwal] = useState()

  const { listJadwal, isLoading, numOfPages, current_page, per_page, status, total, bidang_id, propinsi_id, tab } =
    useSelector(store => store.jadwal)

  const indexOfLastItem = current_page * per_page
  const indexOfFirstItem = indexOfLastItem - per_page

  const startEntry = total === 0 ? 0 : (current_page - 1) * per_page + 1
  const endEntry = Math.min(current_page * per_page, total)

  const handlePageChange = (event, value) => {
    dispatch(changePage(value))
  }

  useEffect(() => {
    dispatch(getJadwal())
  }, [dispatch, current_page, status, bidang_id, propinsi_id, tab])

  if (isLoading || !listJadwal) {
    return <Loading />
  }

  const handleModalLogClose = () => setOpenLog(false)
  const handleModalDetailClose = () => setOpenDetail(false)

  const RowOptions = ({ id, item }) => {
    // ** Hooks
    const dispatch = useDispatch()
    const anchorRef = useRef(null)
    const [anchorEl, setAnchorEl] = useState(null)
    const rowOptionsOpen = Boolean(anchorEl)

    const status_jadwal = item.status.status_id

    const handleRowOptionsClick = event => {
      setAnchorEl(event.currentTarget)
    }

    const handleRowOptionsClose = item => {
      dispatch(
        setEditJadwal({
          editJadwalId: item.jadwal_id,
          ...item
        })
      )
    }

    const handleDelete = () => {
      dispatch(deleteUser(id))
      handleRowOptionsClose()
    }

    const handleEditJadwal = item => {
      dispatch(clearValues())
      dispatch(setEditJadwal(item))
    }

    const handleDeleteClick = jadwalId => {
      setJadwalId(jadwalId)
      setShowConfirmationDel(true)
    }

    const handleKirimClick = jadwalId => {
      setJadwalId(jadwalId)
      setShowConfirmationSend(true)
    }

    const handleConfirmClick = (jadwalId, pesan) => {
      setJadwalId(jadwalId)
      setShowConfirmation(true)
      setMessageConfirm(pesan)
    }

    const handleClickLog = ({ id, data }) => {
      setOpenLog(true)
      setDataJadwal(data)
      dispatch(handleLog({ name: 'jadwal_id', value: id }))
      dispatch(getProsesLog())
    }

    const handleClickDetail = ({ id, data }) => {
      setOpenDetail(true)
      setDataJadwal(data)
    }

    const handleLaksanaClick = jadwalId => {
      setJadwalId(jadwalId)
      setShowConfirmationLaksana(true)
      console.log('klick laksana')
    }

    const handleSelesaiClick = jadwalId => {
      setJadwalId(jadwalId)
      setShowConfirmationSelesai(true)
      console.log('klick selesai')
    }

    const isDraftOrPerbaikan = [JADWAL_DRAFT, JADWAL_PERBAIKAN].includes(status_jadwal)
    const isTerjadwal = [JADWAL_TERJADWAL].includes(status_jadwal)
    const isLaksana = [JADWAL_PELAKSANAAN].includes(status_jadwal)

    return (
      <>
        <ButtonGroup variant='tonal' color='primary' ref={anchorRef}>
          <Button onClick={handleRowOptionsClick}>
            <Icon icon='tabler:dots-vertical' />
          </Button>
          <Menu
            keepMounted
            anchorEl={anchorEl}
            open={rowOptionsOpen}
            onClose={handleRowOptionsClose}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            PaperProps={{ style: { minWidth: '8rem' } }}
          >
            <MenuItem key='detail' onClick={() => handleClickDetail({ id: item.jadwal_id, data: item })}>
              <Icon icon='tabler:details' fontSize={20} /> Detail Jadwal
            </MenuItem>
            <MenuItem key='log' onClick={() => handleClickLog({ id: item.jadwal_id, data: item })}>
              <Icon icon='tabler:logs' fontSize={20} /> Log Proses
            </MenuItem>
            <MenuItem key='update' component={Link} href={`/jadwal/${item.jadwal_id}`}>
              <Icon icon='tabler:eye' fontSize={20} /> Update Data Jadwal
            </MenuItem>

            {isDraftOrPerbaikan && [
              // <MenuItem key='update' component={Link} href={`/jadwal/${item.jadwal_id}`}>
              //   <Icon icon='tabler:eye' fontSize={20} /> Update Data Jadwal
              // </MenuItem>,

              [
                <MenuItem
                  key='edit'
                  onClick={() => handleEditJadwal(item)}
                  component={Link}
                  href={{
                    pathname: 'form-jadwal',
                    query: { id: item.jadwal_id, ...item }
                  }}
                >
                  <Icon icon='tabler:edit' fontSize={20} /> Edit
                </MenuItem>,
                <MenuItem key='delete' onClick={() => handleDeleteClick(item.jadwal_id)}>
                  <Icon icon='tabler:trash' fontSize={20} /> Delete
                </MenuItem>,
                <MenuItem key='send' onClick={() => handleKirimClick(item.jadwal_id)}>
                  <Icon icon='tabler:send-2' fontSize={20} /> Kirim
                </MenuItem>
              ]
            ]}

            {isTerjadwal && (
              <MenuItem key='to-pelaksana' onClick={() => handleLaksanaClick(item.jadwal_id)}>
                <Icon icon='tabler:settings' fontSize={20} /> Ubah menjadi Pelaksana
              </MenuItem>
            )}

            {isLaksana && (
              <MenuItem key='to-selesai' onClick={() => handleSelesaiClick(item.jadwal_id)}>
                <Icon icon='tabler:check' fontSize={20} /> Ubah menjadi Selesai
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
              <TableCell>Fasilitas</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Catatan Koordinator</TableCell>
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
                  <TableCell>{item.status.nama}</TableCell>
                  <TableCell>{item.catatan_koordinator}</TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <div className='flex justify-between items-center flex-wrap pli-6 border-bs bs-auto plb-[12.5px] gap-2'>
        <Typography color='text.disabled'>{`Showing ${startEntry} to ${endEntry} of ${total} entries`}</Typography>

        <Pagination count={numOfPages} page={current_page} onChange={handlePageChange} />
      </div>
      {openLog && <LogJadwal open={openLog} data={dataJadwal} handleClose={handleModalLogClose} />}
      {openDetail && <DetailJadwal data={dataJadwal} open={openDetail} handleClose={handleModalDetailClose} />}

      <DialogKonfirmasi
        open={showConfirmationDel}
        setOpen={showConfirmationDel}
        jadwalId={jadwalId}
        onConfirm={jadwalId => {
          if (jadwalId !== 'no') {
            dispatch(deleteJadwal(jadwalId))
          }

          setShowConfirmationDel(false)
        }}
        message='Jadwal Ini akan dihapus'
      />
      <DialogKonfirmasi
        open={showConfirmationSend}
        setOpen={showConfirmationSend}
        jadwalId={jadwalId}
        onConfirm={jadwalId => {
          if (jadwalId !== 'no') {
            dispatch(kirimJadwal(jadwalId))
          }

          setShowConfirmationSend(false)
        }}
        message='Jadwal Ini akan dikirim ke Koordinator'
      />
      <DialogKonfirmasi
        open={showConfirmationLaksana}
        setOpen={showConfirmationLaksana}
        jadwalId={jadwalId}
        onConfirm={jadwalId => {
          if (jadwalId !== 'no') {
            dispatch(jadwalPelaksanaan(jadwalId))
          }

          setShowConfirmationLaksana(false)
        }}
        message='Ubah Menjadi Pelaksanaan'
      />
      <DialogKonfirmasi
        open={showConfirmationSelesai}
        setOpen={showConfirmationSelesai}
        jadwalId={jadwalId}
        onConfirm={jadwalId => {
          if (jadwalId !== 'no') {
            dispatch(jadwalSelesai(jadwalId))
          }

          setShowConfirmationSelesai(false)
        }}
        message='Ubah Menjadi Selesai'
      />
      <DialogKonfirmasi
        open={showConfirmation}
        setOpen={showConfirmation}
        jadwalId={jadwalId}
        onConfirm={jadwalId => {
          if (jadwalId !== 'no') {
            dispatch(kembaliJadwal(jadwalId))
          }

          setShowConfirmation(false)
        }}
        message={messageConfirm}
      />
    </>
  )
}

export default JadwalContainer
