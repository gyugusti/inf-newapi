import React, { useEffect, useState } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import Grid from '@mui/material/Grid2'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import Button from '@mui/material/Button'
import { useForm, Controller } from 'react-hook-form'

import MenuItem from '@mui/material/MenuItem'

import CustomAutocomplete from '@/components/widget/CustomAutocomplete'

// ** Custom Components
import CustomTextField from '@/@core/components/mui/TextField'
import { getInspekturRiwayat } from '@/redux-store/referensi-infara'
import jadwal, { createJadwalTim, editJadwalTim } from '@/redux-store/jadwal'

const FormInspektur = ({ jadwal_id, dataForm, open, handleClose }) => {
  const dispatch = useDispatch()

  const { listInspekturRwy } = useSelector(store => store.refInfara)

  useEffect(() => {
    dispatch(getInspekturRiwayat())
  }, [dispatch])

  const defaultValues = {
    is_inspektur: dataForm.ins_kat?.ins_jenjang?.is_inspektur ? dataForm.ins_kat.ins_jenjang.is_inspektur : '',
    bidang_id: dataForm.ins_kat?.ins_bidang?.insp_bidang_id ? dataForm.ins_kat.ins_bidang.insp_bidang_id : '',
    riw_insp_id: dataForm.riw_insp_id ? dataForm.riw_insp_id : '',
    tim_id: dataForm.tim_id ? dataForm.tim_id : ''
  }

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({ defaultValues })

  const onSubmit = data => {
    if (data) {
      const dataform = {
        ...data,
        jadwal_id: Number(jadwal_id)
      }

      if (dataForm) {
        dispatch(editJadwalTim({ inspektur_id: dataForm.inspektur_id, dataform }))
      } else {
        dispatch(createJadwalTim(dataform))
      }

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
          textAlign: 'center',
          fontSize: '1.2rem !important'
        }}
      >
        Form Inspektur
      </DialogTitle>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent>
          <Grid container spacing={6}>
            <Grid size={{ xs: 12, md: 12, sm: 12 }}>
              <Controller
                name='is_inspektur'
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <CustomTextField
                    fullWidth
                    select
                    defaultValue=''
                    label='Apakah Inspektur'
                    SelectProps={{
                      value: value,
                      onChange: e => onChange(e)
                    }}
                    id='validation-basic-select'
                    error={Boolean(errors.kode)}
                    aria-describedby='validation-basic-select'
                    {...(errors.kode && { helperText: 'This field is required' })}
                  >
                    <MenuItem value='1'>Ya</MenuItem>
                    <MenuItem value='2'>Tidak</MenuItem>
                  </CustomTextField>
                )}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 12, sm: 12 }}>
              <Controller
                name='bidang_id'
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <CustomTextField
                    fullWidth
                    select
                    defaultValue=''
                    label='Bidang'
                    SelectProps={{
                      value: value,
                      onChange: e => onChange(e)
                    }}
                    id='validation-basic-select'
                    error={Boolean(errors.select)}
                    aria-describedby='validation-basic-select'
                    {...(errors.select && { helperText: 'This field is required' })}
                  >
                    <MenuItem value='1'>Instalasi Bahan Nuklir (IBN)</MenuItem>
                    <MenuItem value='2'>Fasilitas Radiasi (FRZR)</MenuItem>
                    <MenuItem value='3'> Safeguards (SG)</MenuItem>
                  </CustomTextField>
                )}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 12, sm: 12 }}>
              <CustomAutocomplete
                control={control}
                errors={errors.riw_insp_id}
                name='riw_insp_id'
                label='Inspektur'
                options={listInspekturRwy}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 12, sm: 12 }}>
              <Controller
                name='tim_id'
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <CustomTextField
                    fullWidth
                    select
                    defaultValue=''
                    label='Jabatan Tim '
                    SelectProps={{
                      value: value,
                      onChange: e => onChange(e)
                    }}
                    id='validation-basic-select'
                    error={Boolean(errors.select)}
                    aria-describedby='validation-basic-select'
                    {...(errors.select && { helperText: 'This field is required' })}
                  >
                    <MenuItem value='1'>Ketua Tim</MenuItem>
                    <MenuItem value='2'>Anggota Tim</MenuItem>
                    <MenuItem value='3'>Magang</MenuItem>
                    <MenuItem value='4'>Ex Officio</MenuItem>
                    <MenuItem value='5'>Pengamat</MenuItem>
                  </CustomTextField>
                )}
              />
            </Grid>
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

export default FormInspektur
