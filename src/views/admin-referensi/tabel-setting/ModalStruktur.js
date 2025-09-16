import React, { useEffect, useState } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import Grid from '@mui/material/Grid2'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import Button from '@mui/material/Button'
import { useForm, Controller } from 'react-hook-form'
import FormControl from '@mui/material/FormControl'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormHelperText from '@mui/material/FormHelperText'
import RadioGroup from '@mui/material/RadioGroup'
import Radio from '@mui/material/Radio'

// ** Custom Components
import MenuItem from '@mui/material/MenuItem'

import CustomTextField from '@/@core/components/mui/TextField'
import {
  createInkfTabel,
  createStruktur,
  editInkfTabel,
  editStruktur
} from '@/redux-store/admin-referensi/tabel-setting'

const ModalStruktur = ({ data, openEdit, handleEditClose, tabelHeader, tipeKolom }) => {
  const dispatch = useDispatch()
  const inkf_id = data.inkf_id

  const defaultValues = {
    label: data.label,
    header_id: data.header_id,
    tipe: data.tipe,
    ukuran: data.ukuran,
    data_referensi: data.data_referensi,
    is_required: data.is_required,
    tabel_id: data.tabel_id,
    keterangan: data.keterangan
  }

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({ defaultValues })

  const onSubmit = dataform => {
    if (dataform) {
      const formdata = { ...dataform, ukuran: Number(dataform.ukuran) }

      if (data.kolom_id) {
        if (data.tabel === 'header') {
          const dataform = { ...formdata, tabel: 'header' }

          dispatch(editStruktur({ id: data.header_id, dataform }))
        } else {
          const dataform = { ...formdata, tabel: 'kolom' }

          dispatch(editStruktur({ id: data.kolom_id, dataform }))
        }
      } else {
        dispatch(createStruktur(formdata))
      }

      handleEditClose()
    }
  }

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
          fontSize: '1.2rem !important'
        }}
      >
        Buat Kolom
      </DialogTitle>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent>
          <Grid size={{ xs: 12, md: 12, sm: 12 }}>
            <Controller
              name='label'
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <CustomTextField
                  fullWidth
                  value={value}
                  label='Nama Label'
                  onChange={onChange}
                  placeholder=''
                  error={Boolean(errors.label)}
                  aria-describedby='validation-basic-first-name'
                  {...(errors.label && {
                    helperText: 'This field is required'
                  })}
                />
              )}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 12, sm: 12 }}>
            <Controller
              name='header_id'
              control={control}
              rules={{ required: false }}
              render={({ field: { value, onChange } }) => (
                <CustomTextField
                  select
                  fullWidth
                  label='Header'
                  SelectProps={{
                    value: value,
                    onChange: e => onChange(e)
                  }}
                  id='validation-basic-select'
                  error={Boolean(errors.header_id)}
                  aria-describedby='validation-basic-select'
                  {...(errors.header_id && { helperText: 'This field is required' })}
                >
                  {tabelHeader.map((item, index) => {
                    const { header_id, nama } = item

                    return (
                      <MenuItem key={index} value={header_id}>
                        {nama}
                      </MenuItem>
                    )
                  })}
                </CustomTextField>
              )}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 12, sm: 12 }}>
            <Controller
              name='tipe'
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <CustomTextField
                  select
                  fullWidth
                  label='Tipe'
                  SelectProps={{
                    value: value,
                    onChange: e => onChange(e)
                  }}
                  id='validation-basic-select'
                  error={Boolean(errors.tipes)}
                  aria-describedby='validation-basic-select'
                  {...(errors.tipe && { helperText: 'This field is required' })}
                >
                  {tipeKolom.map((item, index) => {
                    return (
                      <MenuItem key={index} value={index + 1}>
                        {item}
                      </MenuItem>
                    )
                  })}
                </CustomTextField>
              )}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 12, sm: 12 }}>
            <Controller
              name='ukuran'
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <CustomTextField
                  fullWidth
                  type='number'
                  value={value}
                  label='Ukuran'
                  onChange={onChange}
                  placeholder=''
                  error={Boolean(errors.ukuran)}
                  aria-describedby='validation-basic-first-name'
                  {...(errors.ukuran && {
                    helperText: 'This field is required'
                  })}
                />
              )}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 12, sm: 12 }}>
            <Controller
              name='data_referensi'
              control={control}
              rules={{ required: false }}
              render={({ field: { value, onChange } }) => (
                <CustomTextField
                  fullWidth
                  multiline
                  value={value}
                  label='Data Referensi'
                  onChange={onChange}
                  placeholder=''
                  error={Boolean(errors.data_referensi)}
                  aria-describedby='validation-basic-first-name'
                />
              )}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 12, sm: 12 }}>
            <Controller
              name='keterangan'
              control={control}
              render={({ field: { value, onChange } }) => (
                <CustomTextField fullWidth value={value} label='Keterangan' onChange={onChange} placeholder='' />
              )}
            />
          </Grid>
          <Grid size={{ xs: 12 }}>
            <FormControl error={Boolean(errors.is_required)}>
              <Controller
                name='is_required'
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <RadioGroup row {...field} aria-label='gender' name='validation-basic-radio'>
                    <FormControlLabel
                      value='1'
                      label='Required'
                      sx={errors.is_required ? { color: 'error.main' } : null}
                      control={<Radio sx={errors.status_id ? { color: 'error.main' } : null} />}
                    />
                    <FormControlLabel
                      value='0'
                      label='Not Required'
                      sx={errors.is_required ? { color: 'error.main' } : null}
                      control={<Radio sx={errors.is_required ? { color: 'error.main' } : null} />}
                    />
                  </RadioGroup>
                )}
              />
              {errors.is_required && (
                <FormHelperText
                  FormHelperText
                  id='validation-basic-radio'
                  sx={{
                    mx: 0,
                    color: 'error.main',
                    fontSize: theme => theme.typography.body2.fontSize
                  }}
                >
                  This field is required
                </FormHelperText>
              )}
            </FormControl>
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
          <Button variant='tonal' color='secondary' onClick={handleEditClose}>
            Cancel
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  )
}

export default ModalStruktur
