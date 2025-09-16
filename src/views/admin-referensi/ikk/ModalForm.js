import React, { useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import Grid from '@mui/material/Grid'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import Button from '@mui/material/Button'
import { useForm, Controller } from 'react-hook-form'

// ** Custom Components
import MenuItem from '@mui/material/MenuItem'

import CustomTextField from '@/@core/components/mui/TextField'
import { getInkf } from '@/redux-store/admin-referensi/inkf'
import { createIkk, editIkk } from '@/redux-store/admin-referensi/ikk'

const ModalForm = ({ data, openEdit, handleEditClose }) => {
  const dispatch = useDispatch()
  const { inkf = [] } = useSelector(store => store.inkf) // Ensure inkf is always an array

  useEffect(() => {
    dispatch(getInkf())
  }, [dispatch])

  const defaultValues = {
    kode: data?.kode || '',
    uraian: data?.uraian || '',
    inkf_id: data?.inkf_id ?? ''
  }

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({ defaultValues })

  const onSubmit = dataform => {
    if (dataform) {
      if (data?.ikk_item_id) {
        dispatch(editIkk({ ikk_item_id: data.ikk_item_id, dataform }))
      } else {
        dispatch(createIkk(dataform))
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
                  label='IKF'
                  SelectProps={{
                    value: value,
                    onChange: e => onChange(e.target.value)
                  }}
                  id='validation-basic-select'
                  error={Boolean(errors.inkf_id)}
                  aria-describedby='validation-basic-select'
                  {...(errors.inkf_id && { helperText: 'This field is required' })}
                >
                  {inkf.map((item, index) => (
                    <MenuItem key={index} value={String(item.inkf_id ?? '')}>
                      {item.nama}
                    </MenuItem>
                  ))}
                </CustomTextField>
              )}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 12, sm: 12 }}>
            <Controller
              name='kode'
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <CustomTextField
                  fullWidth
                  select
                  label='Kode'
                  SelectProps={{
                    value: value,
                    onChange: e => onChange(e.target.value)
                  }}
                  id='validation-basic-select'
                  error={Boolean(errors.kode)}
                  aria-describedby='validation-basic-select'
                  {...(errors.kode && { helperText: 'This field is required' })}
                >
                  <MenuItem value='A'>A</MenuItem>
                  <MenuItem value='B'>B</MenuItem>
                  <MenuItem value='C'>C</MenuItem>
                  <MenuItem value='D'>D</MenuItem>
                </CustomTextField>
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
                  {...(errors.uraian && { helperText: 'This field is required' })}
                />
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

export default ModalForm
