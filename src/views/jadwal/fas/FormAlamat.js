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
import { getKabupaten } from '@/redux-store/referensi-balis'
import { editJadwalFas } from '@/redux-store/jadwal'

const FormAlamat = ({ jadwal_id, dataForm, open, handleClose }) => {
  const dispatch = useDispatch()

  const defaultValues = {
    sifat_insp_id: dataForm.sifat.sifat_insp_id,
    kab_id: dataForm.kab_id
  }

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({ defaultValues })

  const onSubmit = datas => {
    if (datas) {
      dispatch(editJadwalFas({ insp_fas_id: dataForm.insp_fas_id, datas }))
      handleClose()
    }
  }

  const { kabupaten } = useSelector(store => store.refbalis)

  useEffect(() => {
    dispatch(getKabupaten())
  }, [dispatch])

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
          <Grid size={{ xs: 4, md: 4, sm: 4 }}>Nama Fasilitas</Grid>
          <Grid size={{ xs: 1, md: 1, sm: 1 }}>:</Grid>
          <Grid size={{ xs: 6, md: 6, sm: 6 }}>{dataForm.fas.nama}</Grid>
        </Grid>
        <Grid container spacing={1}>
          <Grid size={{ xs: 4, md: 4, sm: 4 }}>Alamat Pusat</Grid>
          <Grid size={{ xs: 1, md: 1, sm: 1 }}>:</Grid>
          <Grid size={{ xs: 6, md: 6, sm: 6 }}>
            {dataForm?.fas?.alamat_pusat?.alamat} , {dataForm?.fas?.alamat_pusat?.kabupaten} ,
            {dataForm?.fas?.alamat_pusat?.propinsi}
          </Grid>
        </Grid>
      </DialogTitle>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent>
          <Grid container spacing={6}>
            <Grid size={{ xs: 12, md: 12, sm: 12 }}>
              <CustomAutocomplete control={control} name='kab_id' label='Lokasi Pemanfaatan' options={kabupaten} />
            </Grid>
            <Grid size={{ xs: 12, md: 12, sm: 12 }}>
              <Controller
                name='sifat_insp_id'
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <CustomTextField
                    fullWidth
                    select
                    defaultValue=''
                    label='sifat inspeksi'
                    SelectProps={{
                      value: value,
                      onChange: e => onChange(e)
                    }}
                    id='validation-basic-select'
                    error={Boolean(errors.sifat_insp_id)}
                    aria-describedby='validation-basic-select'
                    {...(errors.sifat_insp_id && { helperText: 'This field is required' })}
                  >
                    <MenuItem value='1'>Berkala</MenuItem>
                    <MenuItem value='2'>Verifikasi Perizinan</MenuItem>
                    <MenuItem value='3'>Sewaktu-waktu</MenuItem>
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

export default FormAlamat
