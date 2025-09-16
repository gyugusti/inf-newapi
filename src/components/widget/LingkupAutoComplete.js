'use client'

import React, { useEffect, useMemo, useState, useCallback } from 'react'

import { useSession } from 'next-auth/react'
import { CircularProgress, TextField } from '@mui/material'
import Autocomplete from '@mui/material/Autocomplete'
import debounce from 'lodash.debounce'

import customFetch from '@/utils/axios'

const LingkupAutoComplete = ({ value, onChange, flagKegiatan }) => {
  const { data: session } = useSession()
  const [loading, setLoading] = useState(false)
  const [options, setOptions] = useState([])
  const [searchTerm, setSearchTerm] = useState('')

  // Debounce untuk membatasi jumlah fetch
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedSearch = useMemo(() => debounce(q => fetchOptions(q), 500), [flagKegiatan, session?.user?.accessToken])

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const fetchOptions = useCallback(
    async query => {
      if (!session?.user?.accessToken) return

      setLoading(true)

      try {
        const params = {
          page: 1,
          limit: 100,
          cari: query
        }

        if (flagKegiatan) {
          params.layan_id = flagKegiatan
        }

        const response = await customFetch.get('/apiBalis/kegiatan', {
          headers: { 'balis-token': session.user.accessToken },
          params
        })

        const kegiatanData = response?.data?.response?.data ?? []

        const results = kegiatanData.map(row => ({
          label: row.nama,
          kegiatan_id: row.kegiatan_id
        }))

        setOptions(results)
      } catch (error) {
        console.error('❌ Failed to fetch kegiatan:', error)
      } finally {
        setLoading(false)
      }
    },
    [flagKegiatan, session?.user?.accessToken]
  )

  // Trigger fetch secara debounce
  useEffect(() => {
    debouncedSearch(searchTerm)
  }, [searchTerm, debouncedSearch])

  const selectedOption = useMemo(() => {
    return options.find(option => option.kegiatan_id === value) || null
  }, [value, options])

  return (
    <Autocomplete
      fullWidth
      loading={loading}
      options={options}
      value={selectedOption}
      onInputChange={(_, newInputValue) => setSearchTerm(newInputValue)}
      onChange={(_, newValue) => onChange(newValue || {})}
      getOptionLabel={option => option.label || ''}
      isOptionEqualToValue={(option, val) => option.kegiatan_id === val.kegiatan_id}
      renderOption={(props, option) => (
        <li {...props} key={option.kegiatan_id}>
          {option.label}
        </li>
      )}
      renderInput={params => (
        <TextField
          {...params}
          placeholder='Cari Lingkup...'
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <>
                {loading ? <CircularProgress size={20} /> : null}
                {params.InputProps.endAdornment}
              </>
            )
          }}
        />
      )}
    />
  )
}

export default LingkupAutoComplete
