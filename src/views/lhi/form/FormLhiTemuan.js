import React, { Fragment, useState, forwardRef, useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { useForm, Controller } from 'react-hook-form'
import {
  DialogActions,
  Button,
  FormControl,
  FormLabel,
  FormHelperText,
  RadioGroup,
  FormControlLabel,
  Radio,
  Box,
  Typography,
  Checkbox,
  Pagination,
  TextField,
  MenuItem,
  IconButton
} from '@mui/material'
import Grid from '@mui/material/Grid2'

import CustomDialog from '@/components/widget/CustomDialog'

import CustomTextField from '@/@core/components/mui/TextField'
import { editLhitemuan, setTab } from '@/redux-store/lhi'

const FormLhiTemuan = ({ data, open, edit, handleClose }) => {
  const dispatch = useDispatch()

  const defaultValues = {
    hasil_id: data.lhi_temuan.hasil_id || '',
    uraian_temuan: data.lhi_temuan.uraian_temuan || ''
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
      if (data.lhi_temuan.lhi_temuan_id) {
        dispatch(editLhitemuan({ id: data.lhi_temuan.lhi_temuan_id, dataform }))
      }

      dispatch(setTab(dataform))
      handleClose()
    }
  }

  return (
    <CustomDialog open={open} handleClose={handleClose} title='Edit Data Temuan' maxWidth='md'>
      {/* Form content here */}
      <Grid size={{ xs: 12 }} sx={{ pt: theme => `${theme.spacing(2)} !important` }}>
        <b>Kode Temuan : </b> {data.kode_temuan}
      </Grid>
      <Grid size={{ xs: 12 }} sx={{ pt: theme => `${theme.spacing(2)} !important` }}>
        <b>Nama Temuan : </b>
        {data.nama_temuan}
      </Grid>
      <form id='myForm' onSubmit={handleSubmit(onSubmit)}>
        <Grid size={{ xs: 12 }} sx={{ pt: theme => `${theme.spacing(2)} !important` }}>
          <FormControl error={Boolean(errors.konfirmasi)}>
            <FormLabel>
              <b> Apakah Temuan </b>
            </FormLabel>
            <Controller
              name='hasil_id'
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <RadioGroup row {...field} aria-label='gender' name='validation-basic-radio'>
                  <FormControlLabel
                    value='1'
                    label='Ya'
                    sx={errors.hasil_id ? { color: 'error.main' } : null}
                    control={<Radio sx={errors.hasil_id ? { color: 'error.main' } : null} />}
                  />
                  <FormControlLabel
                    value='2'
                    label='Tidak'
                    sx={errors.hasil_id ? { color: 'error.main' } : null}
                    control={<Radio sx={errors.hasil_id ? { color: 'error.main' } : null} />}
                  />
                </RadioGroup>
              )}
            />
            {errors.hasil_id && (
              <FormHelperText
                id='validation-basic-radio'
                sx={{ mx: 0, color: 'error.main', fontSize: theme => theme.typography.body2.fontSize }}
              >
                This field is required
              </FormHelperText>
            )}
          </FormControl>
        </Grid>

        <Grid size={{ xs: 12 }} sx={{ pt: theme => `${theme.spacing(2)} !important` }}>
          <FormLabel>
            <b> Uraian Temuan </b>
          </FormLabel>
          <Controller
            name='uraian_temuan'
            control={control}
            rules={{ required: true }}
            render={({ field: { value, onChange } }) => (
              <CustomTextField
                fullWidth
                multiline
                maxRows={2}
                minRows={2}
                value={value}
                label=''
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

export default FormLhiTemuan
