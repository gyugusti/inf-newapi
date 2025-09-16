import { useState, useEffect } from 'react'

import Grid from '@mui/material/Grid2'
import { useDispatch, useSelector } from 'react-redux'

import MenuItem from '@mui/material/MenuItem'

import { Button, IconButton, Card, CardContent } from '@mui/material'

import { useForm, Controller } from 'react-hook-form'

import { getKabupaten, getPropinsi } from '@/redux-store/referensi-balis'

import { clearValues, clearFilters, handleChange } from '@/redux-store/jadwal-fas'
import CustomAutocomplete from '@/components/widget/CustomAutocomplete'
import CustomTextField from '@/@core/components/mui/TextField'

const SearchFasilitas = () => {
  const dispatch = useDispatch()

  const { propinsi, kabupaten, listUser } = useSelector(store => store.refbalis)
  const { propinsi_id, kab_id, search } = useSelector(store => store.jadwalFas)

  let listPropinsi = []

  if (propinsi) {
    listPropinsi = propinsi.map(({ propinsi_id, nama }) => ({
      label: nama,
      value: propinsi_id
    }))
  }

  let listKabupaten = []

  if (kabupaten && propinsi_id) {
    listKabupaten = kabupaten.map(({ kab_id, nama }) => ({
      label: nama,
      value: kab_id
    }))
  }

  const handleReset = () => {
    dispatch(clearFilters())
    reset(defaultValues)
  }

  useEffect(() => {
    dispatch(getPropinsi())
  }, [dispatch])

  useEffect(() => {
    dispatch(getKabupaten(propinsi_id))
  }, [dispatch, propinsi_id])

  let defaultValues = {
    search: search,
    propinsi_id: propinsi_id,
    kab_id: kab_id
  }

  const {
    control,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors }
  } = useForm({ defaultValues })

  const watchPropinsiId = watch('propinsi_id') // amati perubahan

  // Chain: update kabupaten saat propinsi berubah
  useEffect(() => {
    if (watchPropinsiId) {
      setValue('kab_id', '') // Reset kabupaten
      dispatch(getKabupaten(watchPropinsiId))
      dispatch(handleChange({ name: 'propinsi_id', value: watchPropinsiId }))
    }
  }, [watchPropinsiId, dispatch, setValue])

  const onSubmit = dataform => {
    console.log(dataform)

    if (dataform.propinsi_id) {
      dispatch(handleChange({ name: 'propinsi_id', value: dataform.propinsi_id }))
    }

    if (dataform.kab_id) {
      dispatch(handleChange({ name: 'kab_id', value: dataform.kab_id }))
    }

    if (dataform.search) {
      dispatch(handleChange({ name: 'search', value: dataform.search }))
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={2}>
        <Grid size={3}>
          <CustomAutocomplete
            control={control}
            errors={errors.propinsi_id}
            name='propinsi_id'
            label='Propinsi'
            options={propinsi}
            required={false}
          />
        </Grid>
        <Grid size={3}>
          <CustomAutocomplete
            control={control}
            errors={errors.kab_id}
            name='kab_id'
            label='Kabupaten'
            options={kabupaten}
            required={false}
          />
        </Grid>

        <Grid size={4}>
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
            Cari
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

export default SearchFasilitas
