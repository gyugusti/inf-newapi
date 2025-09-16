import React, { Fragment , useState, forwardRef, useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { useForm, Controller } from 'react-hook-form'
import { DialogActions, Button, Box, Typography, Checkbox, Pagination, Grid, TextField, MenuItem } from '@mui/material'

import CustomDialog from '@/components/widget/CustomDialog'

import CustomTextField from '@/@core/components/mui/TextField'
import CustomAutocomplete from '@/components/widget/CustomAutocomplete'
import { getAlamat, getBidang } from '@/redux-store/referensi-balis'
import Loading from '@/components/Loading'
import { editLhiDosis, editLhiPekerja, editLhiSumber, lhiDosisStore } from '@/redux-store/lhi/dataLhi'
import { setTab } from '@/redux-store/lhi'

const FormTldLhi = ({ data, open, handleClose, edit }) => {
  const dispatch = useDispatch()

  const defaultValues = {
    nama: data?.nama || '',
    tempat_lahir: data?.tempat_lahir || '',
    tgl_lahir: data?.tgl_lahir || '',
    dosis_berjalan: data?.dosis_berjalan || '',
    dosis_n1: data?.dosis_n1 || '',
    dosis_n2: data?.dosis_n2 || '',
    dosis_n3: data?.dosis_n3 || '',
    dosis_n4: data?.dosis_n4 || ''
  }

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({ defaultValues })

  const onSubmit = dataform => {
    if (dataform) {
      if (edit) {
        dispatch(editLhiDosis({ id: data.id, dataform }))
      } else {
        dispatch(lhiDosisStore({ lhi_id: data.lhi_id, ...dataform }))
      }

      dispatch(setTab(dataform))
      handleClose()
    }
  }

  return (
    <CustomDialog open={open} handleClose={handleClose} title='Form LKF Dosis' maxWidth='md'>
      {/* Form content here */}
      <form id='myForm' onSubmit={handleSubmit(onSubmit)}>
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
        <Controller
          name='tempat_lahir'
          control={control}
          render={({ field: { value, onChange } }) => (
            <CustomTextField fullWidth value={value} label='Tempat Lahir' onChange={onChange} />
          )}
        />
        <Controller
          name='tgl_lahir'
          control={control}
          render={({ field: { value, onChange } }) => (
            <CustomTextField
              type='date'
              fullWidth
              value={value}
              label='Tgl Lahir'
              onChange={onChange}
              InputLabelProps={{
                shrink: true
              }}
            />
          )}
        />
        <Controller
          name='dosis_berjalan'
          control={control}
          rules={{ required: true }}
          render={({ field: { value, onChange } }) => (
            <CustomTextField
              fullWidth
              value={value}
              label='Dosis Berjalan'
              onChange={onChange}
              error={Boolean(errors.dosis_berjalan)}
              helperText={errors.dosis_berjalan ? 'This field is required' : ''}
            />
          )}
        />
        <Controller
          name='dosis_n1'
          control={control}
          rules={{ required: true }}
          render={({ field: { value, onChange } }) => (
            <CustomTextField
              fullWidth
              value={value}
              label='dosis n1'
              onChange={onChange}
              error={Boolean(errors.dosis_n1)}
              helperText={errors.dosis_n1 ? 'This field is required' : ''}
            />
          )}
        />
        <Controller
          name='dosis_n2'
          control={control}
          rules={{ required: true }}
          render={({ field: { value, onChange } }) => (
            <CustomTextField
              fullWidth
              value={value}
              label='dosis n2'
              onChange={onChange}
              error={Boolean(errors.dosis_n2)}
              helperText={errors.dosis_n2 ? 'This field is required' : ''}
            />
          )}
        />
        <Controller
          name='dosis_n3'
          control={control}
          rules={{ required: true }}
          render={({ field: { value, onChange } }) => (
            <CustomTextField
              fullWidth
              value={value}
              label='dosis n3'
              onChange={onChange}
              error={Boolean(errors.dosis_n3)}
              helperText={errors.dosis_n3 ? 'This field is required' : ''}
            />
          )}
        />
        <Controller
          name='dosis_n4'
          control={control}
          rules={{ required: true }}
          render={({ field: { value, onChange } }) => (
            <CustomTextField
              fullWidth
              value={value}
              label='dosis n4'
              onChange={onChange}
              error={Boolean(errors.dosis_n4)}
              helperText={errors.dosis_n4 ? 'This field is required' : ''}
            />
          )}
        />
        <br />
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

export default FormTldLhi
