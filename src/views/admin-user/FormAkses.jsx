import React, { Fragment, useState, forwardRef, useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { useForm, Controller } from 'react-hook-form'
import { DialogActions, Button, Box, Typography, Checkbox, Pagination, TextField, MenuItem } from '@mui/material'
import Grid from '@mui/material/Grid2'

import CustomDialog from '@/components/widget/CustomDialog'

import CustomTextField from '@/@core/components/mui/TextField'
import CustomAutocomplete from '@/components/widget/CustomAutocomplete'
import Loading from '@/components/Loading'
import { createRoleRef } from '@/redux-store/admin-user'

const FormAkses = ({ id, data, open, handleClose, edit }) => {
  const dispatch = useDispatch()

  const defaultValues = {
    nama: ''
  }

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({ defaultValues })

  const onSubmit = dataform => {
    if (dataform) {
      dispatch(createRoleRef({ ...dataform }))
      handleClose()
    }
  }

  return (
    <CustomDialog open={open} handleClose={handleClose} title='Form Input Hak Akses' maxWidth='md'>
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

export default FormAkses
