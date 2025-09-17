import { useEffect, useMemo } from 'react'

import Grid from '@mui/material/Grid2'
import { useDispatch, useSelector } from 'react-redux'

import { Button, IconButton, Card, CardContent, Typography } from '@mui/material'

import { useForm, Controller } from 'react-hook-form'

import CustomTextField from '@/@core/components/mui/TextField'
import { clearSrpfilter, handleChangeSrp } from '@/redux-store/validasi-data'
import CustomAutocomplete from '@/components/widget/CustomAutocomplete'
import { getModelSumber } from '@/redux-store/referensi-balis'

const SearchSrp = ({ data } = null) => {
  const dispatch = useDispatch()
  const { merk, merk_tabung, no_seri, no_seri_tabung, tipe, tipe_tabung } = useSelector(
    store => store.validasiData
  )
  const { dafModelSumber } = useSelector(store => store.refbalis)

  const defaultValues = useMemo(
    () => ({
      merk: merk || '',
      merk_tabung: merk_tabung || '',
      no_seri: no_seri || '',
      no_seri_tabung: no_seri_tabung || '',
      tipe: tipe || '',
      tipe_tabung: tipe_tabung || ''
    }),
    [merk, merk_tabung, no_seri, no_seri_tabung, tipe, tipe_tabung]
  )

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({ defaultValues })

  useEffect(() => {
    reset(defaultValues)
  }, [defaultValues, reset])

  const onSubmit = dataform => {
    console.log(dataform)

    dispatch(handleChangeSrp(dataform))
  }

  const handleReset = () => {
    dispatch(clearSrpfilter())
  }

  const optMerk = Object.values(
    dafModelSumber.reduce((acc, { model_sumber_id, nama }) => {
      if (!acc[nama]) {
        acc[nama] = { label: nama, value: model_sumber_id }
      }

      return acc
    }, {})
  )

  useEffect(() => {
    dispatch(getModelSumber())
  }, [dispatch])

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={2} alignItems='center'>
        <Grid size={{ xs: 3 }}>
          <Typography variant='caption' fontWeight={500} mb={0.5}>
            Merk
          </Typography>

          <CustomAutocomplete
            control={control}
            errors={errors.merk}
            name='merk'
            label='Merk'
            options={optMerk}
            required={false}
          />
        </Grid>
        <Grid size={{ xs: 3 }}>
          <Controller
            name='merk_tabung'
            control={control}
            render={({ field: { value, onChange } }) => (
              <CustomTextField
                value={value || ''}
                label='Merk Tabung'
                onChange={onChange}
                placeholder='Merk Tabung..'
                error={Boolean(errors.merk_tabung)}
                aria-describedby='validation-basic-merk-tabung'
              />
            )}
          />
        </Grid>
        <Grid size={{ xs: 3 }}>
          <Controller
            name='no_seri'
            control={control}
            render={({ field: { value, onChange } }) => (
              <CustomTextField
                value={value || ''}
                label='No Seri'
                onChange={onChange}
                placeholder='No Seri..'
                error={Boolean(errors.no_seri)}
                aria-describedby='validation-basic-no-seri'
              />
            )}
          />
        </Grid>
        <Grid size={{ xs: 3 }}>
          <Controller
            name='no_seri_tabung'
            control={control}
            render={({ field: { value, onChange } }) => (
              <CustomTextField
                value={value || ''}
                label='No Seri Tabung'
                onChange={onChange}
                placeholder='No Seri Tabung..'
                error={Boolean(errors.no_seri_tabung)}
                aria-describedby='validation-basic-no-seri-tabung'
              />
            )}
          />
        </Grid>
        <Grid size={{ xs: 3 }}>
          <Controller
            name='tipe'
            control={control}
            render={({ field: { value, onChange } }) => (
              <CustomTextField
                value={value || ''}
                label='Tipe'
                onChange={onChange}
                placeholder='Tipe..'
                error={Boolean(errors.tipe)}
                aria-describedby='validation-basic-tipe'
              />
            )}
          />
        </Grid>
        <Grid size={{ xs: 3 }}>
          <Controller
            name='tipe_tabung'
            control={control}
            render={({ field: { value, onChange } }) => (
              <CustomTextField
                value={value || ''}
                label='Tipe Tabung'
                onChange={onChange}
                placeholder='Tipe Tabung..'
                error={Boolean(errors.tipe_tabung)}
                aria-describedby='validation-basic-tipe-tabung'
              />
            )}
          />
        </Grid>
        <Grid size={12} display='flex' justifyContent='flex-end' gap={2}>
          <Button type='submit' variant='contained'>
            Cari
          </Button>
          <Button variant='tonal' color='primary' type='reset' onClick={handleReset}>
            Reset
          </Button>
        </Grid>
      </Grid>
    </form>
  )
}

export default SearchSrp
