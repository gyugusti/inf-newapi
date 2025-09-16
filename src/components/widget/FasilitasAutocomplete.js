'use client'

import { useCallback, useEffect, useState } from 'react'

import { Autocomplete, CircularProgress, TextField } from '@mui/material'
import debounce from 'lodash.debounce'
import { getSession } from 'next-auth/react'

import customFetch from '@/utils/axios'

const FasilitasAutocomplete = ({ value, onChange }) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [options, setOptions] = useState([])
  const [loading, setLoading] = useState(false)

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const fetchOptions = useCallback(
    debounce(async query => {
      if (query.length < 2) {
        setOptions([])

        return
      }

      setLoading(true)

      try {
        const session = await getSession()

        const res = await customFetch.get('/api/data/fasilitas', {
          headers: { 'balis-token': session?.user?.accessToken },
          params: { page: 1, limit: 100, cari: query }
        })

        if (res.data.status === 200) {
          setOptions(res.data.response.data || [])
        } else {
          setOptions([])
        }
      } catch (error) {
        console.error('Fetch fasilitas failed:', error)
        setOptions([])
      } finally {
        setLoading(false)
      }
    }, 500),
    []
  )

  useEffect(() => {
    if (value?.nama) setSearchTerm(value.nama)
  }, [value])

  return (
    <Autocomplete
      fullWidth
      size='small'
      freeSolo
      options={options}
      value={value || null}
      inputValue={searchTerm}
      onInputChange={(e, newInputValue, reason) => {
        if (reason !== 'reset') {
          setSearchTerm(newInputValue)
          fetchOptions(newInputValue)
        }
      }}
      onChange={(event, newValue) => {
        if (typeof newValue === 'string') {
          onChange({ nama: newValue })
        } else {
          onChange(newValue)
        }
      }}
      loading={loading}
      getOptionLabel={option =>
        typeof option === 'string' ? option : typeof option === 'object' && option?.nama ? option.nama : ''
      }
      isOptionEqualToValue={(option, val) => option?.fas_id === val?.fas_id}
      renderInput={params => (
        <TextField
          {...params}
          label='Fasilitas'
          placeholder='Cari fasilitas...'
          size='small'
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <>
                {loading ? <CircularProgress color='inherit' size={20} /> : null}
                {params.InputProps.endAdornment}
              </>
            )
          }}
          sx={{
            '& .MuiOutlinedInput-root': {
              height: '40px'
            }
          }}
        />
      )}
    />
  )
}

export default FasilitasAutocomplete
