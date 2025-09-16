import React, { Fragment, useCallback, useEffect, useRef, useState } from 'react'

import Link from 'next/link'

import { MenuItem, Menu, ListItemIcon, ListItemText } from '@mui/material'
import { Icon } from '@iconify/react/dist/iconify.js'
import ButtonGroup from '@mui/material/ButtonGroup'
import Button from '@mui/material/Button'
import { useDispatch, useSelector } from 'react-redux'

import { clearValues, setEditJadwal } from '@/redux-store/jadwal'
import DialogKonfirmasi from '@/components/widget/DialogKonfirmasi'

const RowOptions = ({ id, item }) => {
  const [showConfirmationDel, setShowConfirmationDel] = useState(false)
  const [showConfirmationSend, setShowConfirmationSend] = useState(false)

  const [showConfirmation, setShowConfirmation] = useState(false)
  const [messageConfirm, setMessageConfirm] = useState(false)

  const [jadwalId, setJadwalId] = useState()

  // ** Hooks
  const dispatch = useDispatch()

  const anchorRef = useCallback(() => {
    return React.createRef()
  }, [])

  // ** State
  const [anchorEl, setAnchorEl] = useState(null)
  const rowOptionsOpen = Boolean(anchorEl)

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

  return (
    <>
      <ButtonGroup variant='outlined' color='primary' ref={anchorRef()} aria-label='split button'>
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
          <MenuItem sx={{ '& svg': { mr: 2 } }} href='/jadwal' onClick={() => handleKirimClick(item.jadwal_id)}>
            <Icon icon='tabler:details' fontSize={20} />
            Detail Jadwal
          </MenuItem>
          <MenuItem sx={{ '& svg': { mr: 2 } }} href='/jadwal' onClick={() => handleKirimClick(item.jadwal_id)}>
            <Icon icon='tabler:logs' fontSize={20} />
            Log Proses
          </MenuItem>
          {/* {prop.view === 'verifikator' ? (
              <Fragment> */}
          <MenuItem
            component={Link}
            sx={{ '& svg': { mr: 2 } }}
            href={{ pathname: `jadwal/form-jadwal` }}
            onClick={() => handleEditJadwal(item)}
          >
            <Icon icon='tabler:edit' fontSize={20} />
            Edit
          </MenuItem>
          <MenuItem
            component={Link}
            sx={{ '& svg': { mr: 2 } }}
            href={{ pathname: `jadwal/${item.jadwal_id}`, query: { id: item.jadwal_id } }}
          >
            <Icon icon='tabler:eye' fontSize={20} />
            Update Data Jadwal
          </MenuItem>
          <MenuItem sx={{ '& svg': { mr: 2 } }} href='/jadwal' onClick={() => handleDeleteClick(item.jadwal_id)}>
            <Icon icon='tabler:trash' fontSize={20} />
            Delete
          </MenuItem>
          <MenuItem sx={{ '& svg': { mr: 2 } }} href='/jadwal' onClick={() => handleKirimClick(item.jadwal_id)}>
            <Icon icon='tabler:send-2' fontSize={20} />
            Kirim
          </MenuItem>
          {/* </Fragment>
            ) : (
              <Fragment> */}
          <MenuItem component={Link} sx={{ '& svg': { mr: 2 } }} href={{ pathname: `jadwal/${item.jadwal_id}` }}>
            <Icon icon='tabler:eye' fontSize={20} />
            Update Data Jadwal
          </MenuItem>
          <MenuItem
            sx={{ '& svg': { mr: 2 }, backgroundColor: 'error.main' }}
            href='/jadwal'
            onClick={() => handleConfirmClick(item.jadwal_id, 'jadwal dikembalikan ke verifikator')}
          >
            <Icon icon='tabler:arrow-back' fontSize={20} />
            Kembali Ke Verifikator
          </MenuItem>
          <MenuItem
            href='/jadwal'
            sx={{ '& svg': { mr: 2 }, backgroundColor: 'success.main' }}
            onClick={() => handleKirimClick(item.jadwal_id)}
          >
            <Icon icon='tabler:square-check' fontSize={20} /> Setujui Jadwal
          </MenuItem>
          {/* </Fragment>
            )} */}
        </Menu>
      </ButtonGroup>
      <DialogKonfirmasi
        open={showConfirmationDel}
        setOpen={showConfirmationDel}
        jadwalId={jadwalId}
        onConfirm={jadwalId => {
          dispatch(deleteJadwal(jadwalId))
          setShowConfirmationDel(false)
        }}
        message='Jadwal Ini akan dihapus'
      />

      <DialogKonfirmasi
        open={showConfirmationSend}
        setOpen={showConfirmationSend}
        jadwalId={jadwalId}
        onConfirm={jadwalId => {
          dispatch(kirimJadwal(jadwalId))
          setShowConfirmationSend(false)
        }}
        message='Jadwal Ini akan dikirim ke Koordinator'
      />

      <DialogKonfirmasi
        open={showConfirmation}
        setOpen={showConfirmation}
        jadwalId={jadwalId}
        onConfirm={jadwalId => {
          dispatch(kembaliJadwal(jadwalId))
          setShowConfirmation(false)
        }}
        message={messageConfirm}
      />
    </>
  )
}

export default RowOptions
