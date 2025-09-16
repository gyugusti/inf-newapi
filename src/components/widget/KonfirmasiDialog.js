// ** React Imports
import { useState } from 'react'

import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
  Fade,
  IconButton,
  Icon,
  Box,
  Typography,
  Button
} from '@mui/material'

const KonfirmasiDialog = props => {
  const { open, setOpen, Id, onConfirm, message } = props

  // ** States
  const [userInput, setUserInput] = useState('yes')
  const [buka, setBuka] = useState(open)

  const handleClose = () => setBuka(false)

  const handleConfirmation = (value, Id) => {
    handleClose()
    setUserInput(value)

    if (value === 'yes') {
      onConfirm(Id)
    } else {
      onConfirm('no')
    }
  }

  return (
    <>
      <Dialog fullWidth open={open} onClose={handleClose} sx={{ '& .MuiPaper-root': { width: '100%', maxWidth: 512 } }}>
        <DialogContent
          sx={{
            px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
            pt: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`]
          }}
        >
          <Box
            sx={{
              display: 'flex',
              textAlign: 'center',
              alignItems: 'center',
              flexDirection: 'column',
              justifyContent: 'center',
              '& svg': { mb: 8, color: 'warning.main' }
            }}
          >
            <Icon icon='tabler:alert-circle' fontSize='5.5rem' />
            <Typography variant='h4' sx={{ mb: 5, color: 'text.secondary' }}>
              Apa Anda Yakin?
            </Typography>
            <Typography>{message}</Typography>
          </Box>
        </DialogContent>
        <DialogActions
          sx={{
            justifyContent: 'center',
            px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
            pb: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`]
          }}
        >
          <Button variant='contained' sx={{ mr: 2 }} onClick={() => handleConfirmation('yes', Id)}>
            Ya!
          </Button>
          <Button variant='tonal' color='secondary' onClick={() => handleConfirmation('cancel', Id)}>
            Batal
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default KonfirmasiDialog
