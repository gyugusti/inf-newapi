'use client'

import React, { useEffect } from 'react'

import Grid from '@mui/material/Grid2'
import { Button } from '@mui/material'
import { Controller, useForm } from 'react-hook-form'

import CustomAutocomplete from '@/components/widget/CustomAutocomplete'
import CustomTextField from '@/@core/components/mui/TextField'

const SpiSbiFilters = ({
  bidangOptions = [],
  propinsiOptions = [],
  cari = '',
  bidangId = '',
  propinsiId = '',
  onFilterChange
}) => {
  const { control, handleSubmit, reset, formState: { errors } } = useForm({
    defaultValues: {
      bidang_id: bidangId || '',
      propinsi_id: propinsiId || '',
      cari: cari || ''
    }
  })

  useEffect(() => {
    reset({
      bidang_id: bidangId || '',
      propinsi_id: propinsiId || '',
      cari: cari || ''
    })
  }, [bidangId, propinsiId, cari, reset])

  const onSubmit = values => {
    if (!onFilterChange) return

    onFilterChange({
      bidang_id: values.bidang_id || undefined,
      propinsi_id: values.propinsi_id || undefined,
      cari: values.cari || undefined
    })
  }

  const handleReset = () => {
    reset({ bidang_id: '', propinsi_id: '', cari: '' })

    if (onFilterChange) {
      onFilterChange({ bidang_id: undefined, propinsi_id: undefined, cari: undefined })
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} style={{ marginBottom: '1.5rem' }}>
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, md: 3 }}>
          <CustomAutocomplete
            control={control}
            errors={errors.bidang_id}
            name='bidang_id'
            label='Bidang'
            options={bidangOptions}
            required={false}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 3 }}>
          <CustomAutocomplete
            control={control}
            errors={errors.propinsi_id}
            name='propinsi_id'
            label='Propinsi'
            options={propinsiOptions}
            required={false}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 3 }}>
          <Controller
            name='cari'
            control={control}
            render={({ field: { value, onChange } }) => (
              <CustomTextField
                value={value}
                label='Cari'
                onChange={onChange}
                placeholder='Search...'
                error={Boolean(errors.cari)}
                aria-describedby='spi-sbi-search-input'
                {...(errors.cari && {
                  helperText: 'This field is required'
                })}
              />
            )}
          />
        </Grid>
        <Grid size={{ xs: 6, md: 1 }}>
          <Button fullWidth type='submit' variant='contained'>
            Cari
          </Button>
        </Grid>
        <Grid size={{ xs: 6, md: 1 }}>
          <Button fullWidth variant='tonal' color='primary' type='reset' onClick={handleReset}>
            Reset
          </Button>
        </Grid>
      </Grid>
    </form>
  )
}

export default SpiSbiFilters
