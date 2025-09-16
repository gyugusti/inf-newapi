import { useState, useEffect } from 'react'

import Grid from '@mui/material/Grid2'
import { useDispatch, useSelector } from 'react-redux'

import { Button, IconButton, Card, CardContent } from '@mui/material'

import { useForm, Controller } from 'react-hook-form'

import CustomTextField from '@/@core/components/mui/TextField'
import { clearSrpfilter, handleChangeSrp } from '@/redux-store/lkf/dataLkf'

const SearchSumber = () => {
  const dispatch = useDispatch()

  const { searchSrp } = useSelector(store => store.lkf)

  const handleReset = () => {
    dispatch(clearSrpfilter())
  }

  let defaultValues = {
    search: searchSrp
  }

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({ defaultValues })

  const onSubmit = dataform => {
    if (dataform.search) {
      dispatch(handleChangeSrp({ name: 'searchSrp', value: dataform.search }))
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={2}>
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
        <Grid size={{ xs: 1 }}>
          <Button type='submit' variant='contained'>
            cari
          </Button>
        </Grid>
        <Grid size={{ xs: 1 }}>
          <Button variant='tonal' color='primary' type='reset' onClick={handleReset}>
            Reset
          </Button>
        </Grid>
      </Grid>
    </form>
  )
}

export default SearchSumber
