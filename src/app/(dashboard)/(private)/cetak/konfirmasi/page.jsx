'use client'

// ** React Imports
import { useState, useEffect } from 'react'

import { useSearchParams } from 'next/navigation'

// ** MUI Imports
import Dialog from '@mui/material/Dialog'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'

// ** Icon Imports
import { Icon } from '@iconify/react/dist/iconify.js'
import { useDispatch, useSelector } from 'react-redux'

import { getcetakKonfirmasiFas } from '@/redux-store/pdf'

const Konfirmasi = () => {
  const dispatch = useDispatch()

  const searchParams = useSearchParams()
  const surat_id = searchParams.get('surat_id')

  const [suratId, setSuratId] = useState(null)

  useEffect(() => {
    if (surat_id) {
      setSuratId(surat_id)
    }
  }, [surat_id]) // Only 'surat_id' is tracked.

  // Accessing the Redux state for the PDF data
  const { datakonfFas } = useSelector(store => store.pdf)

  // Dispatching the action to get PDF data when suratId is available
  useEffect(() => {
    if (suratId !== null) {
      dispatch(getcetakKonfirmasiFas(suratId))
    }
  }, [dispatch, suratId])

  // Constructing the PDF source (base64) when dataSbi is updated
  const pdfSrc = datakonfFas ? `data:application/pdf;base64,${datakonfFas}` : null

  return (
    <Dialog fullScreen onClose={() => window.close()} aria-labelledby='full-screen-dialog-title' open={true}>
      <DialogTitle id='full-screen-dialog-title'>
        <Typography variant='h6' component='span'>
          Konfirmasi Jadwal Instansi
        </Typography>
        <IconButton
          aria-label='close'
          onClick={() => window.close()}
          sx={{ top: 8, right: 10, position: 'absolute', color: 'grey.500' }}
        >
          <Icon icon='tabler:x' />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        {/* Embed PDF directly using an iframe if pdfSrc is available */}
        {pdfSrc && pdfSrc !== null ? (
          <iframe src={pdfSrc} width='100%' height='760px' title='PDF Viewer' />
        ) : (
          <Typography variant='body1'>Loading PDF...</Typography>
        )}
      </DialogContent>
    </Dialog>
  )
}

Konfirmasi.acl = {
  action: 'read',
  subject: 'all-page'
}

export default Konfirmasi
