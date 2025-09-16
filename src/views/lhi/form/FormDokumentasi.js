import React, { Fragment, useState, forwardRef, useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { useSession } from 'next-auth/react'
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
  TextField,
  MenuItem
} from '@mui/material'
import Grid from '@mui/material/Grid2'

import CustomDialog from '@/components/widget/CustomDialog'

import CustomTextField from '@/@core/components/mui/TextField'
import CustomAutocomplete from '@/components/widget/CustomAutocomplete'
import Loading from '@/components/Loading'
import { createLhiPihak, editLhiPihak, setTab, uploadLhiDok } from '@/redux-store/lhi'

const FormDokumentasi = ({ data, open, handleClose }) => {
  const dispatch = useDispatch()
  const { data: session } = useSession()

  const insp_master_id = session?.user?.insp_master_id

  const defaultValues = {
    judul_dokumen: '',
    keterangan: '',
    dokumen: ''
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
      dispatch(uploadLhiDok({ lhi_id: data.lhi_id, insp_master_id: insp_master_id, ...dataform }))

      dispatch(setTab(dataform))
      handleClose()
    }
  }

  return (
    <CustomDialog open={open} handleClose={handleClose} title='Upload dokumen FIHI' maxWidth='md'>
      {/* Form content here */}
      <form id='myForm' onSubmit={handleSubmit(onSubmit)}>
        <Grid sx={{ margin: 2 }}>
          <Controller
            name='judul_dokumen'
            control={control}
            rules={{ required: true }}
            render={({ field: { value, onChange } }) => (
              <CustomTextField
                fullWidth
                value={value}
                label='nama dokumen'
                onChange={onChange}
                error={Boolean(errors.judul_dokumen)}
                helperText={errors.judul_dokumen ? 'This field is required' : ''}
              />
            )}
          />
        </Grid>
        <Grid sx={{ margin: 2 }}>
          <Controller
            name='keterangan'
            control={control}
            render={({ field: { value, onChange } }) => (
              <CustomTextField fullWidth value={value} label='Keterangan' onChange={onChange} />
            )}
          />
        </Grid>
        {/* File Upload */}
        <Grid sx={{ margin: 2 }}>
          <FormControl>
            <FormLabel>Upload Dokumen</FormLabel>
            <Controller
              name='dokumen'
              control={control}
              render={({ field }) => (
                <input
                  type='file'
                  accept='.pdf,.doc,.docx,.jpg,.png,.xls,.xlsx'
                  onChange={e => {
                    const file = e.target.files[0]

                    field.onChange(file) // Handle file input
                  }}
                />
              )}
            />
            {errors.dokumen && <FormHelperText sx={{ color: 'error.main' }}>Dokumen diperlukan</FormHelperText>}
          </FormControl>
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

export default FormDokumentasi
