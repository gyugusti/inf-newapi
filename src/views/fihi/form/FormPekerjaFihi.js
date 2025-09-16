import React, { Fragment, useState, forwardRef, useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { useForm, Controller } from 'react-hook-form'
import { DialogActions, Button, MenuItem } from '@mui/material'
import Grid from '@mui/material/Grid2'

import CustomDialog from '@/components/widget/CustomDialog'
import CustomTextField from '@/@core/components/mui/TextField'
import CustomAutocomplete from '@/components/widget/CustomAutocomplete'
import { getJenisPekerja } from '@/redux-store/referensi-balis'
import { editFihiPekerja, editFihiSumber, fihiPekerjaStore } from '@/redux-store/fihi/dataFihi'
import { setTab } from '@/redux-store/fihi'

const FormPekerjaFihi = ({ data, open, edit, handleClose }) => {
  const dispatch = useDispatch()
  const { dafJenisPekerja } = useSelector(store => store.refbalis)

  useEffect(() => {
    dispatch(getJenisPekerja())
  }, [dispatch])

  const optJenPekerja = dafJenisPekerja.map(({ jenis_pek_id, nama }) => ({
    label: nama,
    value: jenis_pek_id
  }))

  const defaultValues = {
    nama: data?.nama || '',
    no_ktp: data?.no_ktp || '',
    tempat_lahir: data?.tempat_lahir || '',
    tgl_lahir: data?.tgl_lahir || '',
    jenis_kelamin_id: data?.jenis_kelamin_id || '',
    jenis_pekerja_id: data?.jenis_pekerja_id || '',
    no_sib: data?.no_sib || '',
    tgl_berlaku: data?.tgl_berlaku || '',
    telp: data?.telp || ''
  }

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({ defaultValues })

  const onSubmit = dataform => {
    if (dataform) {
      if (edit) {
        dispatch(editFihiPekerja({ id: data.id, dataform }))
      } else {
        dispatch(fihiPekerjaStore({ fihi_id: data.fihi_id, ...dataform }))
      }

      dispatch(setTab(dataform))
      handleClose()
    }
  }

  return (
    <CustomDialog open={open} handleClose={handleClose} title='Edit Fihi Pekerja' maxWidth='sm'>
      <form id='myForm' onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={3}>
          <Grid size={{ xs: 12, sm: 6 }}>
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

          <Grid size={{ xs: 12, sm: 6 }}>
            <label>Jenis Pekerja</label>
            <CustomAutocomplete
              control={control}
              errors={errors.jenis_pekerja_id}
              name='jenis_pekerja_id'
              label='Jenis Pekerja'
              required={true}
              options={optJenPekerja}
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 6 }}>
            <Controller
              name='no_ktp'
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <CustomTextField
                  fullWidth
                  value={value}
                  label='No KTP'
                  onChange={onChange}
                  error={Boolean(errors.no_ktp)}
                  helperText={errors.no_ktp ? 'This field is required' : ''}
                />
              )}
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 6 }}>
            <Controller
              name='no_sib'
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <CustomTextField
                  fullWidth
                  value={value}
                  label='No SIB'
                  onChange={onChange}
                  helperText={errors.no_sib ? 'This field is required' : ''}
                />
              )}
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 6 }}>
            <Controller
              name='tempat_lahir'
              control={control}
              render={({ field: { value, onChange } }) => (
                <CustomTextField fullWidth value={value} label='Tempat Lahir' onChange={onChange} />
              )}
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 6 }}>
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
          </Grid>

          <Grid size={{ xs: 12, sm: 6 }}>
            <Controller
              name='tgl_berlaku'
              control={control}
              render={({ field: { value, onChange } }) => (
                <CustomTextField
                  type='date'
                  fullWidth
                  value={value}
                  label='Tgl Berlaku SIB'
                  onChange={onChange}
                  InputLabelProps={{
                    shrink: true
                  }}
                />
              )}
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 6 }}>
            <Controller
              name='telp'
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <CustomTextField
                  fullWidth
                  value={value}
                  label='Tlp / No HP'
                  onChange={onChange}
                  helperText={errors.telp ? 'This field is required' : ''}
                />
              )}
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 6 }}>
            <Controller
              name='jenis_kelamin_id'
              control={control}
              render={({ field: { value, onChange } }) => (
                <CustomTextField select fullWidth value={value} label='Jenis Kelamin' onChange={onChange}>
                  <MenuItem value={1}>Laki-laki</MenuItem>
                  <MenuItem value={2}>Perempuan</MenuItem>
                </CustomTextField>
              )}
            />
          </Grid>
        </Grid>

        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type='submit' variant='contained' color='primary'>
            Update
          </Button>
        </DialogActions>
      </form>
    </CustomDialog>
  )
}

export default FormPekerjaFihi
