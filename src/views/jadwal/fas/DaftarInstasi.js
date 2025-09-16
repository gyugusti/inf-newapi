import React, { useEffect, useState } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import Grid from '@mui/material/Grid2'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import Button from '@mui/material/Button'

import MenuItem from '@mui/material/MenuItem'
import { useForm, Controller } from 'react-hook-form'

import CustomTextField from '@/@core/components/mui/TextField'
import CustomAutocomplete from '@/components/widget/CustomAutocomplete'
import { jadwalKonfirmSimpan } from '@/redux-store/jadwal-fas'
import { setTab } from '@/redux-store/jadwal'

const DaftarInstasi = ({ id, dataForm, open, handleClose }) => {
  const dispatch = useDispatch()

  const defaultValues = {
    status_konfirmasi: '',
    insp_fas_id: dataForm.insp_fas_id
  }

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({ defaultValues })

  const onSubmit = datas => {
    if (datas) {
      dispatch(jadwalKonfirmSimpan({ ...datas }))
      dispatch(setTab(datas))
      handleClose()
    }
  }

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby='user-view-edit'
      aria-describedby='user-view-edit-description'
      sx={{ '& .MuiPaper-root': { width: '100%', maxWidth: 650 } }}
    >
      <DialogTitle
        id='user-view-edit'
        sx={{
          //  textAlign: 'center',
          fontSize: '1rem !important'
        }}
      >
        <Grid container spacing={1}>
          <Grid size={{ xs: 4, md: 4, sm: 4 }}>Instansi</Grid>
          <Grid size={{ xs: 4, md: 4, sm: 4 }}>:</Grid>
          <Grid size={{ xs: 4, md: 4, sm: 4 }}>{dataForm.fas.nama}</Grid>
        </Grid>
      </DialogTitle>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent>
          <Grid container spacing={6}>
            <Grid size={{ xs: 12, md: 12, sm: 12 }}>
              <Controller
                name='status_konfirmasi'
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <CustomTextField
                    fullWidth
                    select
                    defaultValue=''
                    label='Status'
                    SelectProps={{
                      value: value,
                      onChange: e => onChange(e)
                    }}
                    id='validation-basic-select'
                    error={Boolean(errors.status_konfirmasi)}
                    aria-describedby='validation-basic-select'
                    {...(errors.status_konfirmasi && { helperText: 'This field is required' })}
                  >
                    <MenuItem value='0'>belum di konfirmasi</MenuItem>
                    <MenuItem value='1'>bersedia</MenuItem>
                    <MenuItem value='2'>jadwal ulang</MenuItem>
                    <MenuItem value='3'>tidak ada kegiatan</MenuItem>
                  </CustomTextField>
                )}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 12, sm: 12 }}></Grid>
            <Grid size={{ xs: 12, md: 12, sm: 12 }}></Grid>
          </Grid>
        </DialogContent>
        <DialogActions
          sx={{
            justifyContent: 'center',
            px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
            pb: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`]
          }}
        >
          <Button type='submit' variant='contained' sx={{ mr: 4 }}>
            Submit
          </Button>
          <Button variant='tonal' color='secondary' onClick={handleClose}>
            Cancel
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  )
}

export default DaftarInstasi
