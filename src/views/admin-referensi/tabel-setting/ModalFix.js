import React, { useEffect, useState } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import Grid from '@mui/material/Grid2'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import Button from '@mui/material/Button'
import { useForm, Controller } from 'react-hook-form'

// ** Custom Components
import MenuItem from '@mui/material/MenuItem'

import CustomTextField from '@/@core/components/mui/TextField'
import { createInkfTabel, createLfkLib, editInkfTabel, editLfkLib } from '@/redux-store/admin-referensi/tabel-setting'

const ModalFix = ({ data, openEdit, handleEditClose, inkf, inkf_id, jenisTabel }) => {
  const dispatch = useDispatch()

  const defaultValues = {
    nama: data.nama,
    uraian: data.uraian,
    keterangan: data.keterangan ?? '',
    jenis_tabel_id: data.jenis_tabel_id,
    inkf_id: inkf_id
  }

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({ defaultValues })

  const onSubmit = dataform => {
    if (dataform) {
      if (data.lkf_lib_id) {
        dispatch(editLfkLib({ lkf_lib_id: data.lkf_lib_id, dataform }))
      } else {
        dispatch(createLfkLib(dataform))
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
        IKK Form
      </DialogTitle>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent>
          <Grid size={{ xs: 12, md: 12, sm: 12 }}>
            <Controller
              name='inkf_id'
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <CustomTextField
                  select
                  fullWidth
                  defaultValue=''
                  label='IKF'
                  SelectProps={{
                    value: value,
                    onChange: e => onChange(e)
                  }}
                  id='validation-basic-select'
                  error={Boolean(errors.inkf_id)}
                  aria-describedby='validation-basic-select'
                  {...(errors.inkf_id && { helperText: 'This field is required' })}
                >
                  {inkf.map((item, index) => {
                    const { inkf_id, nama } = item

                    return (
                      <MenuItem key={index} value={inkf_id}>
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
              name='jenis_tabel_id'
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <CustomTextField
                  select
                  fullWidth
                  defaultValue=''
                  label='Jenis Tabel'
                  SelectProps={{
                    value: value,
                    onChange: e => onChange(e)
                  }}
                  id='validation-basic-select'
                  error={Boolean(errors.jenis_tabel_id)}
                  aria-describedby='validation-basic-select'
                  {...(errors.jenis_tabel_id && { helperText: 'This field is required' })}
                >
                  {jenisTabel.map((item, index) => {
                    const { jenis_tabel_id, nama_tabel } = item

                    return (
                      <MenuItem key={index} value={jenis_tabel_id}>
                        {nama_tabel}
                      </MenuItem>
                    )
                  })}
                </CustomTextField>
              )}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 12, sm: 12 }}>
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
                  placeholder=''
                  error={Boolean(errors.nama)}
                  aria-describedby='validation-basic-first-name'
                  {...(errors.nama && {
                    helperText: 'This field is required'
                  })}
                />
              )}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 12, sm: 12 }}>
            <Controller
              name='uraian'
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <CustomTextField
                  fullWidth
                  value={value}
                  label='Uraian'
                  onChange={onChange}
                  placeholder=''
                  error={Boolean(errors.uraian)}
                  aria-describedby='validation-basic-first-name'
                  {...(errors.uraian && {
                    helperText: 'This field is required'
                  })}
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

export default ModalFix
