import React, { Fragment, useState, forwardRef, useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { useForm, Controller } from 'react-hook-form'
import { DialogActions, Button, Box, Typography, Checkbox, Pagination, TextField, MenuItem } from '@mui/material'
import Grid from '@mui/material/Grid2'

import CustomDialog from '@/components/widget/CustomDialog'

import CustomTextField from '@/@core/components/mui/TextField'
import CustomAutocomplete from '@/components/widget/CustomAutocomplete'
import Loading from '@/components/Loading'
import { createFihiPihak, editFihiPihak, setTab } from '@/redux-store/fihi'

const FormPihak = ({ fihiId, data, open, handleClose, edit }) => {
  const dispatch = useDispatch()

  const defaultValues = {
    nama: data?.nama || '',
    jabatan: data?.jabatan || '',
    email: data?.email || '',
    no_telp: data?.no_telp || ''
  }

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({ defaultValues })

  const onSubmit = dataform => {
    if (dataform) {
      if (edit) {
        dispatch(editFihiPihak({ id: data.pihak_id, dataform }))
      } else {
        dispatch(createFihiPihak({ fihi_id: fihiId, ...dataform }))
      }

      dispatch(setTab(dataform))
      handleClose()
    }
  }

  return (
    <CustomDialog open={open} handleClose={handleClose} title='Form Data Pihak' maxWidth='md'>
      {/* Form content here */}
      <form id='myForm' onSubmit={handleSubmit(onSubmit)}>
        <Grid sx={{ margin: 2 }}>
          <Controller
            name='nama'
            control={control}
            rules={{ required: true }}
            render={({ field: { value, onChange } }) => (
              <CustomTextField
                fullWidth
                value={value}
                label='Nama'
                onChange={onChange}
                error={Boolean(errors.nama)}
                helperText={errors.nama ? 'This field is required' : ''}
              />
            )}
          />
        </Grid>
        <Grid sx={{ margin: 2 }}>
          <Controller
            name='jabatan'
            control={control}
            render={({ field: { value, onChange } }) => (
              <CustomTextField fullWidth value={value} label='Jabatan' onChange={onChange} />
            )}
          />
        </Grid>
        <Grid sx={{ margin: 2 }}>
          <Controller
            name='email'
            control={control}
            render={({ field: { value, onChange } }) => (
              <CustomTextField
                type='email'
                fullWidth
                value={value}
                label='Email'
                onChange={onChange}
                InputLabelProps={{
                  shrink: true
                }}
              />
            )}
          />
        </Grid>
        <Grid sx={{ margin: 2 }}>
          <Controller
            name='no_telp'
            control={control}
            rules={{ required: true }}
            render={({ field: { value, onChange } }) => (
              <CustomTextField
                fullWidth
                value={value}
                type='number'
                label='Telpon'
                onChange={onChange}
                error={Boolean(errors.no_telp)}
                helperText={errors.no_telp ? 'This field is required' : ''}
              />
            )}
          />
        </Grid>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type='submit' variant='contained' color='primary'>
            Submit
          </Button>
        </DialogActions>
      </form>
    </CustomDialog>
  )
}

export default FormPihak
