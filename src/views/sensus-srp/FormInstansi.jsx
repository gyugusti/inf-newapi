'use client'

import { useEffect, useState } from 'react'

import { Button, FormControl, FormControlLabel, FormLabel, MenuItem, Radio, RadioGroup, TextField } from '@mui/material'
import Grid from '@mui/material/Grid2'
import { Controller, useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'

import ShadowBox from '@/components/styles/ShadowBox'
import FasilitasAutocomplete from '@/components/widget/FasilitasAutocomplete'
import { getAlamat } from '@/redux-store/referensi-balis'
import { simpanInstansi } from '@/redux-store/validasi-data'

const FormInstansi = ({ masterId, dense = false }) => {
  const dispatch = useDispatch()

  const defaultValues = {
    fas_id: null,
    alamat_id: '',
    stat_aktif: '1',
    keterangan: ''
  }

  const { control, handleSubmit, setValue, watch } = useForm({ defaultValues })
  const [alamatOptions, setAlamatOptions] = useState([])
  const watchFasId = watch('fas_id')

  // Load alamat ketika fas_id berubah
  useEffect(() => {
    const loadAlamat = async () => {
      if (!watchFasId) {
        setAlamatOptions([])
        setValue('alamat_id', '')

        return
      }

      try {
        const res = await dispatch(getAlamat({ fas_id: watchFasId })).unwrap()

        const list = (res?.data || res || []).map(item => ({
          label:
            item?.alamat_lengkap ||
            item?.nama_alamat ||
            item?.nama ||
            item?.alamat ||
            `Alamat #${item?.alamat_id ?? item?.id}`,
          value: String(item?.alamat_id ?? item?.id ?? '')
        }))

        setAlamatOptions(list)
        setValue('alamat_id', '')
      } catch (e) {
        console.error(e)
        setAlamatOptions([])
        setValue('alamat_id', '')
      }
    }

    loadAlamat()
  }, [watchFasId, dispatch, setValue])

  const onSubmit = async data => {
    const payload = {
      master_sumber_id: masterId ? Number(masterId) : null,
      fas_id: data.fas_id ? Number(data.fas_id) : null,
      alamat_id: data.alamat_id ? Number(data.alamat_id) : null,
      stat_aktif: data.stat_aktif, // '1' | '0'
      keterangan: data.keterangan ?? ''
    }

    // thunk `simpanInstansi` harus POST ke /api/validasi/sumber/fasSumber
    try {
      await dispatch(simpanInstansi(payload)).unwrap()

      // redirect balik ke tab fasilitas
      window.location.href = `/sensus-srp/${masterId}?tab=fasilitas`
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <ShadowBox sx={{ mt: 0, p: dense ? 2 : 3 }}>
      <form onSubmit={handleSubmit(onSubmit)} id='form-instansi'>
        <Grid container spacing={dense ? 1 : 2}>
          {/* Fasilitas */}
          <Grid size={12}>
            <Controller
              name='fas_id'
              control={control}
              rules={{ required: true }}
              render={({ field, fieldState }) => (
                <div>
                  <FasilitasAutocomplete
                    size='small'
                    value={field.value}
                    onChange={selected => setValue('fas_id', selected?.fas_id ?? null, { shouldValidate: true })}
                  />
                  {fieldState.error && <p className='text-red text-sm'>{fieldState.error.message}</p>}
                </div>
              )}
            />
          </Grid>

          {/* Alamat */}
          <Grid size={12}>
            <Controller
              name='alamat_id'
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <TextField
                  select
                  fullWidth
                  label='Alamat'
                  value={value}
                  onChange={onChange}
                  size='small'
                  margin='dense'
                >
                  {alamatOptions.map(opt => (
                    <MenuItem key={opt.value} value={opt.value}>
                      {opt.label}
                    </MenuItem>
                  ))}
                </TextField>
              )}
            />
          </Grid>

          {/* Status */}
          <Grid size={12}>
            <FormControl size='small'>
              <FormLabel sx={{ mb: 0.5 }}>Status</FormLabel>
              <Controller
                name='stat_aktif'
                control={control}
                render={({ field }) => (
                  <RadioGroup row {...field}>
                    <FormControlLabel value='1' control={<Radio size='small' />} label='Aktif' />
                    <FormControlLabel value='0' control={<Radio size='small' />} label='Tidak Aktif' />
                  </RadioGroup>
                )}
              />
            </FormControl>
          </Grid>

          {/* Keterangan */}
          <Grid size={12}>
            <Controller
              name='keterangan'
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label='Keterangan'
                  multiline
                  rows={dense ? 2 : 3}
                  fullWidth
                  size='small'
                  margin='dense'
                />
              )}
            />
          </Grid>

          <Grid size={12} className='flex justify-end'>
            <Button type='submit' variant='contained' size='small'>
              Simpan
            </Button>
          </Grid>
        </Grid>
      </form>
    </ShadowBox>
  )
}

export default FormInstansi
