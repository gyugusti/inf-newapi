import { useEffect } from 'react'

import { Button, MenuItem } from '@mui/material'
import Grid from '@mui/material/Grid2'
import { useDispatch, useSelector } from 'react-redux'

import { Controller, useForm } from 'react-hook-form'

import CustomTextField from '@/@core/components/mui/TextField'
import CustomAutocomplete from '@/components/widget/CustomAutocomplete'
import FasilitasAutocomplete from '@/components/widget/FasilitasAutocomplete'
import { getModelSumber } from '@/redux-store/referensi-balis'
import { clearFilters, clearValues, getSensusSrp, handleChangeSrp } from '@/redux-store/validasi-data'

const Search = () => {
  const dispatch = useDispatch()

  const { dafModelSumber } = useSelector(store => store.refbalis)

  const { per_page, cari } = useSelector(store => store.validasiData)

  const defaultValues = {
    cari: cari,
    per_page: per_page,
    merk: '',
    merk_tabung: '',
    no_seri: '',
    no_seri_tabung: '',
    tipe: '',
    tipe_tabung: '',
    jenis_sumber_id: '',
    fas_id: '',
    master_id: ''
  }

  const optMerk = Object.values(
    dafModelSumber.reduce((acc, { model_sumber_id, nama }) => {
      if (!acc[nama]) {
        acc[nama] = { label: nama, value: model_sumber_id }
      }

      return acc
    }, {})
  )

  const {
    control,
    handleSubmit,
    reset,
    setValue,
    formState: { errors }
  } = useForm({ defaultValues })

  const onSubmit = dataform => {
    //  console.log(dataform)
    dispatch(handleChangeSrp(dataform))
    dispatch(getSensusSrp())
  }

  const handleReset = () => {
    dispatch(clearFilters())
    dispatch(clearValues())
    reset(defaultValues)
  }

  useEffect(() => {
    dispatch(getModelSumber())
  }, [dispatch])

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={2} alignItems='center'>
        <Grid item='true' size={{ xs: 2 }}>
          <Controller
            name='master_id'
            control={control}
            render={({ field: { value, onChange } }) => (
              <CustomTextField
                fullWidth
                value={value}
                label=''
                onChange={onChange}
                placeholder='Master ID...'
                aria-describedby='validation-basic-first-name'
              />
            )}
          />
        </Grid>
        <Grid item='true' size={{ xs: 2 }}>
          <CustomAutocomplete
            control={control}
            errors={errors.merk}
            name='merk'
            label='Merk Unit'
            options={optMerk}
            required={false}
          />
        </Grid>
        <Grid item='true' size={{ xs: 2 }}>
          <Controller
            name='tipe'
            control={control}
            render={({ field: { value, onChange } }) => (
              <CustomTextField
                fullWidth
                value={value}
                label=''
                onChange={onChange}
                placeholder='Tipe Unit..'
                aria-describedby='validation-basic-first-name'
              />
            )}
          />
        </Grid>
        <Grid item='true' size={{ xs: 2 }}>
          <Controller
            name='no_seri'
            control={control}
            render={({ field: { value, onChange } }) => (
              <CustomTextField
                fullWidth
                value={value}
                label=''
                onChange={onChange}
                placeholder='No Seri Unit...'
                aria-describedby='validation-basic-first-name'
              />
            )}
          />
        </Grid>
        <Grid item='true' size={{ xs: 2 }}>
          <CustomAutocomplete
            control={control}
            errors={errors.merk}
            name='merk_tabung'
            label='Merk Tabung'
            options={optMerk}
            required={false}
          />
        </Grid>
        <Grid item='true' size={{ xs: 2 }}>
          <Controller
            name='tipe_tabung'
            control={control}
            render={({ field: { value, onChange } }) => (
              <CustomTextField
                fullWidth
                value={value}
                label=''
                onChange={onChange}
                placeholder='Tipe Tabung..'
                aria-describedby='validation-basic-first-name'
              />
            )}
          />
        </Grid>
        <Grid item='true' size={{ xs: 2 }}>
          <Controller
            name='no_seri_tabung'
            control={control}
            render={({ field: { value, onChange } }) => (
              <CustomTextField
                fullWidth
                value={value}
                label=''
                onChange={onChange}
                placeholder='No Seri Tabung...'
                aria-describedby='validation-basic-first-name'
              />
            )}
          />
        </Grid>
        <Grid item='true' size={{ xs: 2 }}>
          <Controller
            name='jenis_sumber_id'
            control={control}
            render={({ field: { value, onChange } }) => (
              <CustomTextField
                select
                fullWidth
                defaultValue='none'
                onChange={onChange}
                InputLabelProps={{ shrink: true }}
              >
                <MenuItem key={1} value={'none'} disabled>
                  Jenis Sumber
                </MenuItem>
                <MenuItem key={2} value={'1'}>
                  Pembangkit Radiasi Pengion
                </MenuItem>
                <MenuItem key={3} value={'2'}>
                  Zat Radioaktif
                </MenuItem>
              </CustomTextField>
            )}
          />
        </Grid>
        <Grid item='true' size={{ xs: 2 }}>
          <Controller
            name='fas_id'
            control={control}
            defaultValue={null}
            rules={{ required: false }}
            render={({ field, fieldState }) => (
              <div>
                <FasilitasAutocomplete
                  value={field.value}
                  onChange={selected => {
                    setValue('fas_id', selected?.fas_id ?? null)
                  }}
                />
                {fieldState.error && <p className='text-red text-sm'>{fieldState.error.message}</p>}
              </div>
            )}
          />
        </Grid>
        <Grid item='true' size={{ xs: 2 }}>
          <Controller
            name='cari'
            control={control}
            render={({ field: { value, onChange } }) => (
              <CustomTextField
                fullWidth
                value={value}
                label=''
                onChange={onChange}
                placeholder='Cari...'
                error={Boolean(errors.cari)}
                aria-describedby='validation-basic-first-name'
                {...(errors.cari && {
                  helperText: 'This field is required'
                })}
              />
            )}
          />
        </Grid>
        <Grid item='true' size={{ xs: 2 }}>
          <Controller
            name='per_page'
            control={control}
            render={({ field: { value, onChange } }) => (
              <CustomTextField select fullWidth value={value} onChange={onChange} label=''>
                {[5, 10, 20, 50, 100, 500].map(option => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </CustomTextField>
            )}
          />
        </Grid>
        <Grid item='true' size={{ xs: 6 }} container justifyContent='flex-end' spacing={2}>
          <Grid item='true'>
            <Button type='submit' variant='contained'>
              Cari
            </Button>
          </Grid>
          <Grid item='true'>
            <Button variant='tonal' color='primary' type='reset' onClick={handleReset}>
              Reset
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </form>
  )
}

export default Search
