'use client'

import { useEffect } from 'react'

import { useSearchParams, useRouter } from 'next/navigation'

import { useForm, Controller } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'

import Grid from '@mui/material/Grid2'
import Button from '@mui/material/Button'

import { Autocomplete, MenuItem, TextField } from '@mui/material'

import { getPropinsi } from '@/redux-store/referensi-balis'

import CustomAutocomplete from '@/components/widget/CustomAutocomplete'
import CustomTextField from '@/@core/components/mui/TextField'

export default function SearchContainer() {
  const dispatch = useDispatch()
  const searchParams = useSearchParams()
  const router = useRouter()

  // Ambil dari Redux
  const { propinsi } = useSelector(state => state.refbalis)

  useEffect(() => {
    if (!propinsi || propinsi.length === 0) {
      dispatch(getPropinsi())
    }
  }, [dispatch, propinsi])

  const defaultValues = {
    search: searchParams.get('cari') || '',
    propinsi_id: searchParams.get('propinsi_id') || '',
    tahun: searchParams.get('tahun') || new Date().getFullYear().toString()
  }

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({ defaultValues })

  const onSubmit = data => {
    const params = new URLSearchParams()

    if (data.search) params.set('cari', data.search)
    if (data.propinsi_id) params.set('propinsi_id', data.propinsi_id)
    if (data.tahun) params.set('tahun', data.tahun)
    if (data.bidang_id) params.set('bidang_id', data.bidang_id)
    if (data.status_id) params.set('status_id', data.status_id)

    router.push(`?${params.toString()}`)
  }

  const handleReset = () => {
    reset()
    router.push('?')
  }

  const tahunSekarang = new Date().getFullYear()
  const listTahun = Array.from({ length: 6 }, (_, i) => `${tahunSekarang - i}`)

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={2} sx={{ mb: 2 }}>
        <Grid size={3}>
          <Controller
            name='propinsi_id'
            control={control}
            render={({ field: { onChange, value } }) => (
              <Autocomplete
                options={propinsi}
                getOptionLabel={option => option?.label ?? ''}
                onChange={(e, data) => onChange(data?.value ?? null)}
                value={propinsi.find(opt => opt.value === value) || null}
                renderInput={params => <TextField {...params} label='Propinsi' />}
              />
            )}
          />
        </Grid>
        <Grid size={3}>
          <Controller
            name='search'
            control={control}
            render={({ field: { value, onChange } }) => (
              <TextField
                fullWidth
                label=' Search'
                value={value}
                onChange={onChange}
                error={Boolean(errors['search'])}
              />
            )}
          />
        </Grid>
        <Grid size={2}>
          <Controller
            name='tahun'
            control={control}
            render={({ field: { value, onChange } }) => (
              <TextField
                fullWidth
                select
                label='Tahun'
                value={value}
                onChange={e => {
                  onChange(e)
                }}
              >
                {listTahun.map(t => (
                  <MenuItem key={t} value={t}>
                    {t}
                  </MenuItem>
                ))}
              </TextField>
            )}
          />
        </Grid>
        <Grid size={2}>
          <Button fullWidth type='submit' variant='contained'>
            Cari
          </Button>
        </Grid>
        <Grid size={2}>
          <Button fullWidth variant='tonal' color='primary' onClick={handleReset}>
            Reset
          </Button>
        </Grid>
      </Grid>
    </form>
  )
}
