'use client'

import React, { Fragment, useState, useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { useForm, Controller } from 'react-hook-form'
import { Button, Typography } from '@mui/material'
import { Icon } from '@iconify/react/dist/iconify.js'
import { useSession } from 'next-auth/react'

import CircularProgress from '@mui/material/CircularProgress'

import { useDebounce } from 'react-use'

import { getLkfPekerja, setFasilitas } from '@/redux-store/lkf/dataLkf'
import CustomAutocomplete from '@/@core/components/mui/Autocomplete'
import CustomTextField from '@/@core/components/mui/TextField'

import FormStoreTld from '@/views/view-tabelfix/modal/FormStoreTld'
import PilihKesehatan from '@/views/view-tabelfix/modal/PilihKesehatan'

const Index = () => {
  const dispatch = useDispatch()
  const { data: session } = useSession()
  const fas_id = session?.user?.fas_id
  const { pekerjaLkf, isLoading } = useSelector(store => store.dataLkf)

  const defaultValues = {
    nama: '',
    tempat_lahir: '',
    tgl_lahir: ''
  }

  const {
    control,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors }
  } = useForm({ defaultValues })

  const onSubmit = dataform => {
    console.log('Form submitted with data:', dataform)
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
      tempat_lahir: pekerja.master_npr.tempat_lahir,
      tgl_lahir: pekerja.master_npr.tgl_lahir
    }))

    setOptions(newOptions)
  }, [pekerjaLkf])

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

  const [open, setOpen] = useState(false)
  const [dataSrp, setDataSrp] = useState()

  const handleModalOpen = () => {
    setDataSrp('')
    setOpen(true)
  }

  const handleModalClose = () => setOpen(false)

  return (
    <>
      <form id='myForm' onSubmit={handleSubmit(onSubmit)}>
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
                  label='Search'
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

        <Button type='submit' variant='contained' color='primary' disabled={isLoading}>
          Submit
        </Button>
      </form>
      <br /> <br />
      <Button variant='tonal' color='error' size='small' onClick={() => handleModalOpen()}>
        <Icon icon='tabler:rotate-rectangle' fontSize={15} />
        Tarik Data kesehatan
      </Button>
      {open && <PilihKesehatan data={dataSrp} open={open} handleClose={handleModalClose} />}
    </>
  )
}

Index.acl = {
  action: 'read',
  subject: 'fasilitas-page'
}

export default Index
