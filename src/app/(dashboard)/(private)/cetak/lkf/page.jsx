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

import { getcetakLkf } from '@/redux-store/pdf'

const Lkf = () => {
  const dispatch = useDispatch()

  const searchParams = useSearchParams()
  const id = searchParams.get('id')
  const [Id, setId] = useState(null)

  useEffect(() => {
    if (id) {
      setId(id)
    }
  }, [id]) // Only 'id' is included as a dependency

  // Accessing the Redux state for the PDF data
  const { dataLkf } = useSelector(store => store.pdf)

  // Dispatching the action to get PDF data when Id is available
  useEffect(() => {
    if (Id !== null) {
      dispatch(getcetakLkf(Id))
    }
  }, [dispatch, Id])

  // Constructing the PDF source (base64) when dataSbi is updated
  const pdfSrc = dataLkf ? `data:application/pdf;base64,${dataLkf}` : null

  return (
    <Dialog fullScreen onClose={() => window.close()} aria-labelledby='full-screen-dialog-title' open={true}>
      <DialogTitle id='full-screen-dialog-title'>
        <Typography variant='h6' component='span'>
          Form Isian Hasil Inspeksi
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

Lkf.acl = {
  action: 'read',
  subject: 'all-page'
}

export default Lkf
