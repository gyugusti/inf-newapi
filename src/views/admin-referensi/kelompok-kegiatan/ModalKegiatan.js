import React, { Fragment, useState, forwardRef, useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { useForm, Controller } from 'react-hook-form'
import {
  DialogActions,
  Button,
  FormControl,
  FormLabel,
  FormHelperText,
  Box,
  Typography,
  Checkbox,
  Pagination,
  Grid,
  TextField,
  MenuItem,
  IconButton
} from '@mui/material'

import CustomDialog from '@/components/widget/CustomDialog'

import CustomTextField from '@/@core/components/mui/TextField'
import CustomAutocomplete from '@/components/widget/CustomAutocomplete'
import Loading from '@/components/Loading'
import { createKelompokKeg, editKelompokKeg, setTab } from '@/redux-store/admin-referensi/kelompok-kegiatan'

const ModalKegiatan = ({ data, open, edit, handleClose }) => {
  const dispatch = useDispatch()

  const defaultValues = {
    nama: data?.nama ? data.nama : ''
  }

  const {
    control,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors }
  } = useForm({ defaultValues })

  const onSubmit = dataform => {
    if (dataform) {
      if (edit) {
        dispatch(editKelompokKeg({ id: data.kelompok_id, dataform }))
      } else {
        dispatch(createKelompokKeg({ ...dataform }))
      }

      dispatch(setTab(dataform))
      handleClose()
    }
  }

  return (
    <CustomDialog open={open} handleClose={handleClose} title='Form Kelompok Kegiatan' maxWidth='md'>
      {/* Form content here */}
      <form id='myForm' onSubmit={handleSubmit(onSubmit)}>
        <Grid size={{ xs: 2 }}>
          <Controller
            name='nama'
            control={control}
            rules={{ required: true }}
            render={({ field: { value, onChange } }) => (
              <CustomTextField
                fullWidth
                value={value}
                label='Nama Kegiatan'
                onChange={onChange}
                error={Boolean(errors.nama)}
                helperText={errors.nama ? 'Field Ini harus di isi' : ''}
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

export default ModalKegiatan
