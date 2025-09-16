// ** React Imports
import { useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import Typography from '@mui/material/Typography'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'

// ** Icon Imports
import { Icon } from '@iconify/react/dist/iconify.js'

const DialogKonfirmasi = props => {
  const { open, setOpen, jadwalId, onConfirm, message } = props

  // ** States
  const [userInput, setUserInput] = useState('yes')
  const [buka, setBuka] = useState(open)

  const handleClose = () => setBuka(false)

  const handleConfirmation = (value, jadwalId) => {
    handleClose()
    setUserInput(value)

    if (value === 'yes') {
      onConfirm(jadwalId)
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
          <Button variant='contained' sx={{ mr: 2 }} onClick={() => handleConfirmation('yes', jadwalId)}>
            Ya!
          </Button>
          <Button variant='tonal' color='secondary' onClick={() => handleConfirmation('cancel', jadwalId)}>
            Batal
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default DialogKonfirmasi
