import React from 'react'

import { useDispatch } from 'react-redux'
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
import { createInkfTabel, editInkfTabel } from '@/redux-store/admin-referensi/tabel-setting'

const ModalDinamis = ({ data = {}, openEdit = false, handleEditClose, inkf = [] }) => {
  const dispatch = useDispatch()

  const defaultValues = {
    nama: data.nama || '',
    uraian: data.uraian || '',
    keterangan: data.keterangan || '',
    inkf_id: data.inkf_id || ''
  }

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({ defaultValues })

  const onSubmit = dataform => {
    if (data.tabel_id) {
      dispatch(editInkfTabel({ tabel_id: data.tabel_id, dataform }))
    } else {
      dispatch(createInkfTabel(dataform))
    }

    handleEditClose()
  }

  return (
    <Dialog
      open={Boolean(openEdit)}
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
                  label='IKF'
                  SelectProps={{
                    value: value ?? '',
                    onChange: e => onChange(e.target.value)
                  }}
                  error={Boolean(errors.inkf_id)}
                  helperText={errors.inkf_id ? 'This field is required' : ''}
                >
                  {Array.isArray(inkf) &&
                    inkf.map((item, index) => (
                      <MenuItem key={index} value={String(item.inkf_id)}>
                        {item.nama}
                      </MenuItem>
                    ))}
                </CustomTextField>
              )}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 12, sm: 12 }}>
            <Controller
              name='nama'
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <CustomTextField
                  fullWidth
                  {...field}
                  label='Nama'
                  error={Boolean(errors.nama)}
                  helperText={errors.nama ? 'This field is required' : ''}
                />
              )}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 12, sm: 12 }}>
            <Controller
              name='uraian'
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <CustomTextField
                  fullWidth
                  {...field}
                  label='Uraian'
                  error={Boolean(errors.uraian)}
                  helperText={errors.uraian ? 'This field is required' : ''}
                />
              )}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 12, sm: 12 }}>
            <Controller
              name='keterangan'
              control={control}
              render={({ field }) => <CustomTextField fullWidth {...field} label='Keterangan' />}
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

export default ModalDinamis
