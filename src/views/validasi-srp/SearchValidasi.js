import { useState, useEffect } from 'react'

import Grid from '@mui/material/Grid2'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Card, CardContent, Typography, MenuItem, IconButton } from '@mui/material'
import { Icon } from '@iconify/react/dist/iconify.js'

import { useForm, Controller } from 'react-hook-form'

import * as XLSX from 'xlsx'

import CustomTextField from '@/@core/components/mui/TextField'
import { clearFilters, handleChange, handleChangeSrp } from '@/redux-store/validasi-data'
import { getKategoriSumber } from '@/utils/balishelper'

const SearchValidasi = ({ showExcelSelect }) => {
  const { per_page, cari, listRegsrp } = useSelector(store => store.validasiData)

  const dispatch = useDispatch()

  const defaultValues = {
    cari: cari,
    per_page: per_page
  }

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({ defaultValues })

  const onSubmit = dataform => {
    dispatch(handleChangeSrp(dataform))
  }

  const handleReset = () => {
    dispatch(clearFilters())
    reset(defaultValues)
  }

  // const exportExcel = () => {
  //   const ws = XLSX.utils.json_to_sheet(listRegsrp)
  //   const wb = XLSX.utils.book_new()

  //   XLSX.utils.book_append_sheet(wb, ws, 'Data')
  //   XLSX.writeFile(wb, 'registrasi-srp.xlsx')
  // }

  const exportExcel = () => {
    const formattedData = listRegsrp.map(item => {
      const {
        id_encrypt, // remove
        jadwal_id,
        user_id,
        tgl_kirim,
        batas_waktu_validasi,
        kegiatan_id,
        flag_kegiatan,
        flag_user,
        otorisator_id,
        otorisator,
        validator_id, // remove
        validator,
        model_sumber_id,
        merk_sumber,
        fas_id,
        fasilitas,
        jenis_sumber_id,
        jenis_sumber,
        kat_sumber_id,
        kategori_sumber,
        merk_tabung,
        tabung,
        sat_aktivitas,
        satuan_aktivitas,
        aktivitas, // ← pastikan field ini ada di data
        tgl_aktivitas, // ← pastikan field ini ada di data
        sat_kv,
        satuan_kv,
        kv,
        sat_ma,
        satuan_ma,
        ma,
        tahap_reg_id,
        tahapan,
        master_sumber_id,
        master_sumber,
        ...rest
      } = item

      return {
        ...rest,
        master_Id: master_sumber?.master_id || '',
        jenis_sumber: jenis_sumber?.nama || '',
        kat_sumber_id: getKategoriSumber(kat_sumber_id),
        merk_sumber: merk_sumber?.nama || '',
        tabung: tabung?.nama || '',
        aktivitas: aktivitas || '',
        tgl_aktivitas: tgl_aktivitas || '',
        satuan_aktivitas: satuan_aktivitas?.nama_satuan || '',
        kv: kv || '',
        satuan_kv: satuan_kv?.nama_satuan || '',
        ma: ma || '',
        satuan_ma: satuan_ma?.nama_satuan || '',
        fasilitas: fasilitas?.nama || '',
        validator: validator?.username || '',
        tahapan: tahapan?.nama || ''
      }
    })

    const ws = XLSX.utils.json_to_sheet(formattedData)
    const wb = XLSX.utils.book_new()

    XLSX.utils.book_append_sheet(wb, ws, 'Data')
    XLSX.writeFile(wb, 'registrasi-srp.xlsx')
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={2} alignItems='center'>
        <Grid item='true' xs={4}>
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
        <Grid item='true' xs={2}>
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

        <Grid item='true' xs={6} container justifyContent='flex-end' spacing={2}>
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
          {showExcelSelect && (
            <Grid item='true'>
              <Button variant='tonal' color='primary' onClick={exportExcel}>
                <Icon icon='tabler:edit' fontSize={20} />
                Export Excel
              </Button>
            </Grid>
          )}
        </Grid>
      </Grid>
    </form>
  )
}

export default SearchValidasi
