import React, { useState } from 'react'

import Grid from '@mui/material/Grid2'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import InputAdornment from '@mui/material/InputAdornment'
import DialogContentText from '@mui/material/DialogContentText'
import Button from '@mui/material/Button'

// ** Custom Components
import MenuItem from '@mui/material/MenuItem'

import CustomTextField from '@/@core/components/mui/TextField'

const ModalEdit = ({ data, openEdit, handleEditClose }) => {
  return (
    <Dialog
      open={openEdit}
      onClose={handleEditClose}
      aria-labelledby='user-view-edit'
      aria-describedby='user-view-edit-description'
      sx={{ '& .MuiPaper-root': { width: '100%', maxWidth: 650 } }}
    >
      <DialogTitle
        id='user-view-edit'
        sx={{
          textAlign: 'center',
          fontSize: '1.5rem !important',
          px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
          pt: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`]
        }}
      >
        Edit User Information
      </DialogTitle>
      <DialogContent
        sx={{
          pb: theme => `${theme.spacing(8)} !important`,
          px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`]
        }}
      >
        <DialogContentText variant='body2' id='user-view-edit-description' sx={{ textAlign: 'center', mb: 7 }}>
          Updating user details will receive a privacy audit.
        </DialogContentText>
        <form>
          <Grid container spacing={6}>
            <Grid size={{ xs: 12, md: 6, sm: 6 }}>
              <CustomTextField fullWidth label='Full Name' placeholder='John Doe' defaultValue='' />
            </Grid>
            <Grid size={{ xs: 12, md: 6, sm: 6 }}>
              <CustomTextField
                fullWidth
                label='Username'
                placeholder='John.Doe'
                defaultValue=''
                InputProps={{ startAdornment: <InputAdornment position='start'>@</InputAdornment> }}
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 6 }}>
              <CustomTextField fullWidth label='Contact' placeholder='723-348-2344' defaultValue='' />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <CustomTextField select fullWidth label='Language' defaultValue='English'>
                <MenuItem value='English'>English</MenuItem>
                <MenuItem value='Spanish'>Spanish</MenuItem>
                <MenuItem value='Portuguese'>Portuguese</MenuItem>
                <MenuItem value='Russian'>Russian</MenuItem>
                <MenuItem value='French'>French</MenuItem>
                <MenuItem value='German'>German</MenuItem>
              </CustomTextField>
            </Grid>
          </Grid>
        </form>
      </DialogContent>
      <DialogActions
        sx={{
          justifyContent: 'center',
          px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
          pb: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`]
        }}
      >
        <Button variant='contained' sx={{ mr: 2 }} onClick={handleEditClose}>
          Submit
        </Button>
        <Button variant='tonal' color='secondary' onClick={handleEditClose}>
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default ModalEdit
