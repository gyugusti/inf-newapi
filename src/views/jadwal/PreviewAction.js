// ** Next Import
import { useState } from 'react'

import Link from 'next/link'

// ** MUI Imports
import { useRouter } from 'next/navigation'

import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import CardContent from '@mui/material/CardContent'

// ** Icon Imports
import { Icon } from '@iconify/react/dist/iconify.js'

import { useDispatch } from 'react-redux'

import FormInspektur from './FormInspektur'
import FormFasilitas from './FormFasilitas'
import { clearValues, deleteJadwal, getJadwal, kirimJadwal, setEditJadwal } from '@/redux-store/jadwal'

import DialogKonfirmasi from '@/components/widget/DialogKonfirmasi'

const PreviewActions = ({ id, detail }) => {
  const dispatch = useDispatch()
  const router = useRouter()

  const [showConfirmationDel, setShowConfirmationDel] = useState(false)
  const [showConfirmationSend, setShowConfirmationSend] = useState(false)

  const [open, setOpen] = useState(false)
  const [openJadfas, setOpenJadfas] = useState(false)
  const jadwalId = id

  // Handle Edit dialog
  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClickFasilitas = () => {
    setOpenJadfas(true)
  }

  const handleClose = () => setOpen(false)

  const handleCloseJadfas = () => setOpenJadfas(false)

  const handleEditJadwal = detail => {
    dispatch(clearValues())
    dispatch(setEditJadwal(detail))

    const params = new URLSearchParams({
      id: detail.jadwal_id,
      ...detail
    }).toString()

    router.push(`/jadwal/form-jadwal?${params}`)
  }

  const handleDeleteClick = jadwalId => {
    setShowConfirmationDel(true)
  }

  const handleKirimClick = jadwalId => {
    setShowConfirmationSend(true)
  }

  return (
    <>
      <Card>
        <CardContent>
          <Button
            fullWidth
            variant='contained'
            onClick={() => handleKirimClick(jadwalId)}
            sx={{ mb: 2, '& svg': { mr: 2 } }}
          >
            <Icon fontSize='1.125rem' icon='tabler:send' />
            Kirim Ke Koordinator
          </Button>
          <Button
            fullWidth
            variant='contained'
            sx={{ mb: 2, '& svg': { mr: 2 } }}
            onClick={() => handleEditJadwal(detail)}
          >
            <Icon fontSize='1.125rem' icon='tabler:edit' />
            Update Jadwal
          </Button>
          <Button
            fullWidth
            sx={{ mb: 2, '& svg': { mr: 2 } }}
            target='_blank'
            variant='tonal'
            color='error'
            onClick={() => handleDeleteClick(id)}
          >
            <Icon fontSize='1.125rem' icon='tabler:trash' />
            Hapus Jadwal
          </Button>
          <Button fullWidth variant='contained' sx={{ mb: 2, '& svg': { mr: 2 } }} onClick={() => handleClickOpen()}>
            <Icon fontSize='1.125rem' icon='tabler:users' />
            Input Inspektur
          </Button>
          <Button
            fullWidth
            variant='contained'
            sx={{ mb: 2, '& svg': { mr: 2 } }}
            onClick={() => handleClickFasilitas()}
          >
            <Icon fontSize='1.125rem' icon='tabler:map' />
            Input Fasilitas
          </Button>

          <Button
            fullWidth
            sx={{ mb: 2, '& svg': { mr: 2 } }}
            variant='tonal'
            component={Link}
            color='secondary'
            href={`/jadwal`}
          >
            <Icon fontSize='1.125rem' icon='tabler:arrow-back' />
            Kembali
          </Button>
        </CardContent>
      </Card>

      {open && id && <FormInspektur jadwal_id={id} dataForm='' open={open} handleClose={handleClose} />}
      {openJadfas && id && (
        <FormFasilitas jadwal_id={id} dataForm='' open={openJadfas} handleClose={handleCloseJadfas} />
      )}

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
    </>
  )
}

export default PreviewActions
