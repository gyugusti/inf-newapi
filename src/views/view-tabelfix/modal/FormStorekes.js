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
import { format } from 'date-fns/format'

import CircularProgress from '@mui/material/CircularProgress'

import { useDebounce } from 'react-use'

import { useSession } from 'next-auth/react'

import { getLkfPekerja, setFasilitas, lkfDosisStore, lkfKesStore, editLkfKes } from '@/redux-store/lkf/dataLkf'
import CustomAutocomplete from '@/@core/components/mui/Autocomplete'
import CustomTextField from '@/@core/components/mui/TextField'

import CustomDialog from '@/components/widget/CustomDialog'
import { setTab } from '@/redux-store/lkf'

const FormStorekes = ({ data, open, handleClose, edit, dataEdit }) => {
  const tahun = format(new Date(data.tanggal_lkf), 'yyyy')

  const dispatch = useDispatch()
  const { data: session } = useSession()
  const fas_id = session?.user?.fas_id

  const { pekerjaLkf, isLoading } = useSelector(store => store.dataLkf)

  const defaultValues = {
    nama_pekerja: dataEdit?.nama_pekerja || '',
    pek_id_npr: dataEdit?.pek_id_npr || '',
    pemeriksaan_n: dataEdit?.pemeriksaan_n || '',
    pemeriksaan_n1: dataEdit?.pemeriksaan_n1 || '',
    pemeriksaan_n2: dataEdit?.pemeriksaan_n2 || '',
    pemeriksaan_n3: dataEdit?.pemeriksaan_n3 || '',
    pemeriksaan_n4: dataEdit?.pemeriksaan_n4 || '',
    resume: dataEdit?.resume || ''
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
      if (edit) {
        dispatch(editLkfKes({ id: dataEdit.id, dataform }))
      } else {
        dispatch(lkfKesStore({ lkf_id: data.lkf_id, ...dataform }))
      }

      dispatch(setTab(dataform))
      handleClose()
      console.log(dataform)
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
      dispatch(getLkfPekerja(debouncedSearchQuery))
    }
  }, [dispatch, debouncedSearchQuery])

  useEffect(() => {
    const newOptions = pekerjaLkf.map(pekerja => ({
      label: pekerja.master_npr.nama,
      value: pekerja.pek_id_npr,
      pek_id_npr: pekerja.pek_id_npr
    }))

    setOptions(newOptions)
  }, [pekerjaLkf])

  const handleSearch = event => {
    setSearchQuery(event.target.value)
  }

  const handleAutocompleteChange = (event, newValue) => {
    if (newValue) {
      setValue('nama', newValue.label)
      setValue('pek_id_npr', newValue.pek_id_npr)
    } else {
      setValue('nama', searchQuery) // Allow manual input if no option is selected
      setValue('pek_id_npr', '')
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
        Form Update Data Pemeriksaan Kesehatan
      </DialogTitle>

      <form id='myForm' onSubmit={handleSubmit(onSubmit)}>
        <DialogContent>
          {edit ? (
            <Controller
              name='nama_pekerja'
              control={control}
              render={({ field: { value, onChange } }) => (
                <CustomTextField fullWidth value={value} label='Nama pekerja' onChange={onChange} />
              )}
            />
          ) : (
            <Controller
              name='nama_pekerja'
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
                      label='Nama Pekerja'
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
          )}

          {errors.nama_pekerja && <Typography color='error'>{errors.nama_pekerja.message}</Typography>}

          <Controller
            name='pek_id_npr'
            control={control}
            render={({ field: { value, onChange } }) => (
              <CustomTextField fullWidth value={value} label='Npr' onChange={onChange} />
            )}
          />

          <Controller
            name='pemeriksaan_n'
            control={control}
            render={({ field: { value, onChange } }) => (
              <CustomTextField
                type='date'
                fullWidth
                value={value}
                label={tahun}
                onChange={onChange}
                InputLabelProps={{
                  shrink: true
                }}
              />
            )}
          />

          <Controller
            name='pemeriksaan_n1'
            control={control}
            render={({ field: { value, onChange } }) => (
              <CustomTextField
                type='date'
                fullWidth
                value={value}
                label={tahun - 1}
                onChange={onChange}
                InputLabelProps={{
                  shrink: true
                }}
              />
            )}
          />

          <Controller
            name='pemeriksaan_n2'
            control={control}
            render={({ field: { value, onChange } }) => (
              <CustomTextField
                type='date'
                fullWidth
                value={value}
                label={tahun - 2}
                onChange={onChange}
                InputLabelProps={{
                  shrink: true
                }}
              />
            )}
          />

          <Controller
            name='pemeriksaan_n3'
            control={control}
            render={({ field: { value, onChange } }) => (
              <CustomTextField
                type='date'
                fullWidth
                value={value}
                label={tahun - 3}
                onChange={onChange}
                InputLabelProps={{
                  shrink: true
                }}
              />
            )}
          />

          <Controller
            name='pemeriksaan_n4'
            control={control}
            render={({ field: { value, onChange } }) => (
              <CustomTextField
                type='date'
                fullWidth
                value={value}
                label={tahun - 4}
                onChange={onChange}
                InputLabelProps={{
                  shrink: true
                }}
              />
            )}
          />

          <Controller
            name='resume'
            control={control}
            rules={{ required: true }}
            render={({ field: { value, onChange } }) => (
              <CustomTextField
                fullWidth
                value={value}
                label='Resume'
                onChange={onChange}
                placeholder=''
                error={Boolean(errors.resume)}
                {...(errors.resume && { helperText: 'This field is required' })}
              />
            )}
          />

          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type='submit' variant='contained' color='primary' disabled={isLoading && !edit}>
              Submit
            </Button>
          </DialogActions>
        </DialogContent>
      </form>
    </Dialog>
  )
}

export default FormStorekes
