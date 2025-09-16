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
import { editKegiatan, getkelKegiatan } from '@/redux-store/admin-referensi/kelompok-kegiatan'

const ModalEdit = ({ data, openEdit, handleEditClose }) => {
  const dispatch = useDispatch()
  const { kelompokKegiatan } = useSelector(store => store.kelKegiatan)

  useEffect(() => {
    dispatch(getkelKegiatan())
  }, [dispatch])

  const defaultValues = {
    kelompok_id: data.kelompok_id
  }

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({ defaultValues })

  const onSubmit = dataform => {
    if (dataform) {
      dispatch(editKegiatan({ kegiatan_id: data.kegiatan_id, dataform }))
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
        Edit Kegiatan {data.nama} ID ( {data.kegiatan_id} )
      </DialogTitle>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent>
          <Grid container spacing={12}>
            <Grid size={{ xs: 12, sm: 12 }}>
              <Controller
                name='kelompok_id'
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <CustomTextField
                    select
                    fullWidth
                    defaultValue=''
                    label='Kelompok'
                    SelectProps={{
                      value: value,
                      onChange: e => onChange(e)
                    }}
                    id='validation-basic-select'
                    error={Boolean(errors.select)}
                    aria-describedby='validation-basic-select'
                    {...(errors.select && { helperText: 'This field is required' })}
                  >
                    {kelompokKegiatan.map((item, index) => {
                      const { kelompok_id, nama } = item

                      return (
                        <MenuItem key={index} value={kelompok_id}>
                          {nama}
                        </MenuItem>
                      )
                    })}
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
          <Button variant='tonal' color='secondary' onClick={handleEditClose}>
            Cancel
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  )
}

export default ModalEdit
