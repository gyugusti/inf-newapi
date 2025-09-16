import { useState, useEffect } from 'react'

import Grid from '@mui/material/Grid2'
import { useDispatch, useSelector } from 'react-redux'

import MenuItem from '@mui/material/MenuItem'

import Button from '@mui/material/Button'

import { getBidang } from '@/redux-store/referensi-balis'
import { clearFilters, getkelKegiatan, handleChange } from '@/redux-store/admin-referensi/kelompok-kegiatan'
import CustomTextField from '@/@core/components/mui/TextField'

function SearchContainer() {
  const dispatch = useDispatch()
  const [searchTerm, setSearchTerm] = useState()
  const { bidang } = useSelector(store => store.refbalis)
  const { kelompokKegiatan, bidang_id, kelompok_id } = useSelector(store => store.kelKegiatan)

  useEffect(() => {
    dispatch(getBidang())
    dispatch(getkelKegiatan())
  }, [dispatch])

  const handleReset = () => {
    dispatch(clearFilters())
  }

  return (
    <div>
      <Grid container spacing={2}>
        <Grid size={{ xs: 5 }}>
          <CustomTextField
            select
            fullWidth
            defaultValue=''
            SelectProps={{
              value: bidang_id,
              onChange: e => dispatch(handleChange({ name: 'bidang_id', value: e.target.value }))
            }}
            id='bidang'
          >
            <MenuItem value=''>Pilih Bidang</MenuItem>
            {bidang.map((item, index) => {
              const { bidang_id, nama } = item

              return (
                <MenuItem key={index} value={bidang_id}>
                  {nama}
                </MenuItem>
              )
            })}
          </CustomTextField>
        </Grid>
        <Grid size={{ xs: 5 }}>
          <CustomTextField
            select
            fullWidth
            defaultValue=''
            SelectProps={{
              value: kelompok_id,
              onChange: e => dispatch(handleChange({ name: 'kelompok_id', value: e.target.value }))
            }}
            id='Bidang'
          >
            <MenuItem value=''>Pilih Kelompok</MenuItem>

            {kelompokKegiatan.map((item, index) => {
              const { kelompok_id, nama } = item

              return (
                <MenuItem key={index} value={kelompok_id}>
                  {nama}
                </MenuItem>
              )
            })}
          </CustomTextField>
        </Grid>
        <Grid size={{ xs: 2 }}>
          <Button variant='tonal' color='primary' type='reset' onClick={handleReset}>
            Reset
          </Button>
        </Grid>
      </Grid>
    </div>
  )
}

export default SearchContainer
