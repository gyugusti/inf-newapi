import { useState, useEffect } from 'react'

import Grid from '@mui/material/Grid2'
import { useDispatch, useSelector } from 'react-redux'

import MenuItem from '@mui/material/MenuItem'

import { Button, IconButton, Card, CardContent } from '@mui/material'

import { useForm, Controller } from 'react-hook-form'

import { getBidang, getPropinsi } from '@/redux-store/referensi-balis'

import { clearValues, clearFilters, handleChange } from '@/redux-store/jadwal'
import CustomAutocomplete from '../widget/CustomAutocomplete'
import CustomTextField from '@/@core/components/mui/TextField'

const SearchContainer = () => {
  const dispatch = useDispatch()

  const { propinsi, bidang, listUser } = useSelector(store => store.refbalis)
  const { propinsi_id, bidang_id, search } = useSelector(store => store.jadwal)

  const bidangs = bidang.map(option => ({
    value: option.bidang_id,
    label: option.nama
  }))

  let listPropinsi = []

  if (propinsi) {
    listPropinsi = propinsi.map(({ propinsi_id, nama }) => ({
      label: nama,
      value: propinsi_id
    }))
  }

  let listBidang = []

  if (bidang) {
    listBidang = bidang.map(({ bidang_id, nama }) => ({
      label: nama,
      value: bidang_id
    }))
  }

  const handleReset = () => {
    dispatch(clearFilters())
  }

  useEffect(() => {
    dispatch(getPropinsi())
    dispatch(getBidang())
  }, [dispatch])

  let defaultValues = {
    search: search,
    propinsi_id: propinsi_id,
    bidang_id: bidang_id
  }

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({ defaultValues })

  const onSubmit = dataform => {
    if (dataform.bidang_id) {
      dispatch(handleChange({ name: 'bidang_id', value: dataform.bidang_id }))
    }

    if (dataform.propinsi_id) {
      dispatch(handleChange({ name: 'propinsi_id', value: dataform.propinsi_id }))
    }

    if (dataform.search) {
      dispatch(handleChange({ name: 'search', value: dataform.search }))
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={2}>
        <Grid size={{ xs: 3 }}>
          <CustomAutocomplete
            control={control}
            errors={errors.bidang_id}
            name='bidang_id'
            label='Bidang'
            options={bidangs}
            required={false}
          />
        </Grid>
        <Grid size={{ xs: 3 }}>
          <CustomAutocomplete
            control={control}
            errors={errors.propinsi_id}
            name='propinsi_id'
            label='Propinsi'
            options={propinsi}
            required={false}
          />
        </Grid>
        <Grid size={{ xs: 3 }}>
          <Controller
            name='search'
            control={control}
            render={({ field: { value, onChange } }) => (
              <CustomTextField
                value={value}
                label=''
                onChange={onChange}
                placeholder='search..'
                error={Boolean(errors.search)}
                aria-describedby='validation-basic-first-name'
                {...(errors.search && {
                  helperText: 'This field is required'
                })}
              />
            )}
          />
        </Grid>
        <Grid size={1}>
          <Button fullWidth type='submit' variant='contained'>
            cari
          </Button>
        </Grid>
        <Grid size={1}>
          <Button fullWidth variant='tonal' color='primary' type='reset' onClick={handleReset}>
            Reset
          </Button>
        </Grid>
      </Grid>
    </form>
  )
}

export default SearchContainer
