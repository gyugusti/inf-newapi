import React, { Fragment, useState, forwardRef, useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { useForm, Controller } from 'react-hook-form'
import { DialogActions, Button, Box, Typography, Checkbox, Pagination, TextField, MenuItem } from '@mui/material'
import Grid from '@mui/material/Grid2'

import CustomDialog from '@/components/widget/CustomDialog'

import CustomTextField from '@/@core/components/mui/TextField'
import CustomAutocomplete from '@/components/widget/CustomAutocomplete'

const FormPenilaianIkk = ({ ikk, data, dataForm, open, handleClose, edit }) => {
  const dispatch = useDispatch()
  const jform = edit === true ? 'Form Ubah Nilai' : 'Form Buat Nilai'

  const optIkk = ikk.map(({ ikk_item_id, kode, nilai_ikk }) => ({
    label: `${kode} - (${nilai_ikk})`,
    value: ikk_item_id
  }))

  const defaultValues = {
    ikk_item_id: data?.ikk_item_id || ''
  }

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({ defaultValues })

  const onSubmit = dataform => {
    if (dataform) {
      //   if (edit) {
      //     dispatch(editLhiPihak({ id: data.pihak_id, dataform }))
      //   } else {
      //     dispatch(createLhiPihak({ lhi_id: lhiId, ...dataform }))
      //   }
      //   dispatch(setTab(dataform))
      //   handleClose()
      console.log(dataform)
    }
  }

  return (
    <CustomDialog open={open} handleClose={handleClose} title={jform} maxWidth='sm'>
      <Grid margin={2} marginBottom={4}>
        <b>Nama IKF : {ikk[0]?.inkf?.nama}</b>
      </Grid>
      <Grid>
        <form id='myForm' onSubmit={handleSubmit(onSubmit)}>
          <Grid sx={{ margin: 2 }}>
            <Controller
              name='ikk_item_id'
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <CustomAutocomplete
                  control={control}
                  errors={errors.ikk_item_id}
                  name='ikk_item_id'
                  label='IKK Item'
                  options={optIkk}
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
      </Grid>
    </CustomDialog>
  )
}

export default FormPenilaianIkk
