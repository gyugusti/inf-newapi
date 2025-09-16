import React, { Fragment, useState, useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { useForm, Controller } from 'react-hook-form'
import {
  DialogActions,
  Button,
  Box,
  Typography,
  Checkbox,
  Pagination,
  Grid,
  TextField,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent
} from '@mui/material'
import { Icon } from '@iconify/react/dist/iconify.js'

import CircularProgress from '@mui/material/CircularProgress'

import { useDebounce } from 'react-use'

import { getFihiPekerja, setFasilitas, fihiDosisStore } from '@/redux-store/fihi/dataFihi'
import CustomAutocomplete from '@/@core/components/mui/Autocomplete'
import CustomTextField from '@/@core/components/mui/TextField'

import CustomDialog from '@/components/widget/CustomDialog'
import { setTab } from '@/redux-store/fihi'

const FormStoreTldFihi = ({ data, open, handleClose }) => {
  const dispatch = useDispatch()

  const fas_id = data.alamat.fas_id

  const { pekerjaFihi, isLoading } = useSelector(store => store.dataFihi)

  const defaultValues = {
    nama: '',
    tempat_lahir: '',
    tgl_lahir: '',
    dosis_berjalan: '',
    dosis_n1: '',
    dosis_n2: '',
    dosis_n3: '',
    dosis_n4: ''
  }

  const {
    control,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors }
  } = useForm({ defaultValues })

  const onSubmit = dataform => {
    if (dataform) {
      dispatch(fihiDosisStore({ fihi_id: data.fihi_id, ...dataform }))

      dispatch(setTab(dataform))
      handleClose()
    }
  }

  const [options, setOptions] = useState([])
  const [searchQuery, setSearchQuery] = useState('')
  const [debouncedSearchQuery] = useDebounce(searchQuery, 300)

  useEffect(() => {
    dispatch(setFasilitas(fas_id))
  }, [dispatch, fas_id])

  useEffect(() => {
    if (debouncedSearchQuery && debouncedSearchQuery.length >= 3) {
      dispatch(getFihiPekerja(debouncedSearchQuery))
    }
  }, [dispatch, debouncedSearchQuery])

  useEffect(() => {
    const newOptions = pekerjaFihi.map(pekerja => ({
      label: pekerja.master_npr.nama,
      value: pekerja.pek_id_npr,
      tempat_lahir: pekerja.master_npr.tempat_lahir,
      tgl_lahir: pekerja.master_npr.tgl_lahir
    }))

    setOptions(newOptions)
  }, [pekerjaFihi])

  const handleSearch = event => {
    setSearchQuery(event.target.value)
  }

  const handleAutocompleteChange = (event, newValue) => {
    if (newValue) {
      setValue('nama', newValue.label)
      setValue('tempat_lahir', newValue.tempat_lahir)
      setValue('tgl_lahir', newValue.tgl_lahir)
    } else {
      setValue('nama', searchQuery) // Allow manual input if no option is selected
      setValue('tempat_lahir', '')
      setValue('tgl_lahir', '')
    }
  }

  return (
    <Dialog
      open={open}
      onClose={handleClose}
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
        Form dosis
      </DialogTitle>

      <form id='myForm' onSubmit={handleSubmit(onSubmit)}>
        <DialogContent>
          <Controller
            name='nama'
            control={control}
            rules={{ required: 'Nama is required' }}
            render={({ field: { value, onChange } }) => (
              <CustomAutocomplete
                options={options}
                loading={isLoading}
                getOptionLabel={option => option.label || ''}
                isOptionEqualToValue={(option, value) => option.value === value.value}
                value={options.find(option => option.label === value) || null}
                onChange={handleAutocompleteChange}
                onInputChange={(event, newValue) => {
                  handleSearch(event)
                  onChange(newValue) // Keep the field updated with the input
                }}
                renderInput={params => (
                  <CustomTextField
                    {...params}
                    label='Nama'
                    InputProps={{
                      ...params.InputProps,
                      endAdornment: (
                        <Fragment>
                          {isLoading ? <CircularProgress size={20} /> : null}
                          {params.InputProps.endAdornment}
                        </Fragment>
                      )
                    }}
                  />
                )}
                freeSolo // Allow free input when no options are available
              />
            )}
          />
          {errors.nama && <Typography color='error'>{errors.nama.message}</Typography>}

          <Controller
            name='tempat_lahir'
            control={control}
            render={({ field: { value, onChange } }) => (
              <CustomTextField fullWidth value={value} label='Tempat Lahir' onChange={onChange} />
            )}
          />
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

          <Controller
            name='dosis_berjalan'
            control={control}
            rules={{ required: true }}
            render={({ field: { value, onChange } }) => (
              <CustomTextField
                fullWidth
                value={value}
                label='Dosis Berjalan'
                onChange={onChange}
                error={Boolean(errors.dosis_berjalan)}
                helperText={errors.dosis_berjalan ? 'This field is required' : ''}
              />
            )}
          />
          <Controller
            name='dosis_n1'
            control={control}
            rules={{ required: true }}
            render={({ field: { value, onChange } }) => (
              <CustomTextField
                fullWidth
                value={value}
                label='dosis n1'
                onChange={onChange}
                error={Boolean(errors.dosis_n1)}
                helperText={errors.dosis_n1 ? 'This field is required' : ''}
              />
            )}
          />
          <Controller
            name='dosis_n2'
            control={control}
            rules={{ required: true }}
            render={({ field: { value, onChange } }) => (
              <CustomTextField
                fullWidth
                value={value}
                label='dosis n2'
                onChange={onChange}
                error={Boolean(errors.dosis_n2)}
                helperText={errors.dosis_n2 ? 'This field is required' : ''}
              />
            )}
          />
          <Controller
            name='dosis_n3'
            control={control}
            rules={{ required: true }}
            render={({ field: { value, onChange } }) => (
              <CustomTextField
                fullWidth
                value={value}
                label='dosis n3'
                onChange={onChange}
                error={Boolean(errors.dosis_n3)}
                helperText={errors.dosis_n3 ? 'This field is required' : ''}
              />
            )}
          />
          <Controller
            name='dosis_n4'
            control={control}
            rules={{ required: true }}
            render={({ field: { value, onChange } }) => (
              <CustomTextField
                fullWidth
                value={value}
                label='dosis n4'
                onChange={onChange}
                error={Boolean(errors.dosis_n4)}
                helperText={errors.dosis_n4 ? 'This field is required' : ''}
              />
            )}
          />

          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type='submit' variant='contained' color='primary' disabled={isLoading}>
              Submit
            </Button>
          </DialogActions>
        </DialogContent>
      </form>
    </Dialog>
  )
}

export default FormStoreTldFihi
