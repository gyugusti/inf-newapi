import { useState, forwardRef, useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { useForm, Controller } from 'react-hook-form'
import {
  Button,
  Box,
  Typography,
  Checkbox,
  Pagination,
  TextField,
  MenuItem,
  IconButton,
  Table,
  TableCell,
  TableHead,
  DialogActions,
  TableBody,
  TableContainer
} from '@mui/material'
import Grid from '@mui/material/Grid2'

import AppReactDatepicker from '@/libs/styles/AppReactDatepicker'
import { StyledTableCell, StyledTableRow, TableCellNoRow } from '@/components/styles/StyledTable'
import CustomTextField from '@/@core/components/mui/TextField'
import CustomAutocomplete from '@/components/widget/CustomAutocomplete'
import { editLhilokasi, setTab } from '@/redux-store/lhi'

import CustomDialog from '@/components/widget/CustomDialog'
import { getAlamat } from '@/redux-store/referensi-balis'

const FormLhiLokasi = ({ data, open, handleClose }) => {
  const dispatch = useDispatch()
  const { listAlamat } = useSelector(store => store.refbalis)

  const defaultValues = {
    tgl_mulai: data?.tgl_mulai || '',
    tgl_akhir: data?.tgl_akhir || '',
    tgl_lhi: data?.tgl_lhi || '',
    alamat_id: data?.alamat_id || '',
    status_inspeksi: data.jadwal_tujuan.jadwal_fas?.status_inspeksi || ''
  }

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({ defaultValues })

  const onSubmit = dataform => {
    if (dataform) {
      dispatch(editLhilokasi({ id: data.lhi_id, dataform }))
      dispatch(setTab(dataform))
      handleClose()
    }
  }

  useEffect(() => {
    dispatch(getAlamat(data.fas_id))
  }, [dispatch, data])

  const optAlamat = listAlamat.map(({ alamat_id, alamat, nama }) => ({
    label: nama + ` , ` + alamat,
    value: alamat_id
  }))

  const CustomInput = forwardRef(({ ...props }, ref) => {
    return <CustomTextField fullWidth inputRef={ref} {...props} sx={{ width: '100%' }} />
  })

  return (
    <CustomDialog open={open} handleClose={handleClose} title='Form Data Lokasi Lhi' maxWidth='md'>
      {/* Form content here */}
      <Table aria-label='simple table'>
        <TableHead>
          <StyledTableRow>
            <TableCell component='th'>Jadwal</TableCell>
            <TableCell>
              {data.jadwal.kode_area} ({data.jadwal.propinsi.nama}) <br /> {data.jadwal.tgl_mulai} s/d
              {data.jadwal.tgl_akhir}
            </TableCell>
          </StyledTableRow>
          <StyledTableRow>
            <TableCell component='th'>Fasilitas</TableCell>
            <TableCell>{data.fas.nama}</TableCell>
          </StyledTableRow>
          <StyledTableRow>
            <TableCell component='th'>Kelompok</TableCell>
            <TableCell>{data.kelompok.nama}</TableCell>
          </StyledTableRow>
        </TableHead>
      </Table>
      <form id='myForm' onSubmit={handleSubmit(onSubmit)}>
        <Grid item xs={12} sm={12}>
          <Grid container spacing={2} sx={{ marginTop: 2 }}>
            <Grid item sm={6}>
              <Controller
                name='tgl_mulai'
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => {
                  let vals = value

                  if (value === '0000-00-00') {
                    vals = null
                  }

                  const formattedDate = vals ? new Date(vals) : null

                  return (
                    <AppReactDatepicker
                      dateFormat='yyyy-MM-dd'
                      selected={formattedDate}
                      showYearDropdown
                      showMonthDropdown
                      onChange={e => onChange(e)}
                      placeholderText='MM/DD/YYYY'
                      customInput={
                        <CustomInput
                          value={value}
                          onChange={val => onChange(new Date(val))}
                          label='Tanggal Mulai'
                          error={Boolean(errors.tgl_mulai)}
                          aria-describedby='validation-basic-dob'
                        />
                      }
                    />
                  )
                }}
              />
            </Grid>
            <Grid item='true' sm={6}>
              <Controller
                name='tgl_akhir'
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => {
                  let vals = value

                  if (value === '0000-00-00') {
                    vals = null
                  }

                  const formattedDate = vals ? new Date(vals) : null

                  return (
                    <AppReactDatepicker
                      dateFormat='yyyy-MM-dd'
                      selected={formattedDate}
                      showYearDropdown
                      showMonthDropdown
                      onChange={e => onChange(e)}
                      placeholderText='MM/DD/YYYY'
                      customInput={
                        <CustomInput
                          value={value}
                          onChange={val => onChange(new Date(val))}
                          label='Tanggal Akhir'
                          error={Boolean(errors.tgl_akhir)}
                          aria-describedby='validation-basic-dob'
                        />
                      }
                    />
                  )
                }}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item='true' xs={12} sm={6} sx={{ marginTop: 2 }}>
          <Controller
            name='status_inspeksi'
            control={control}
            render={({ field: { value, onChange } }) => (
              <CustomTextField select fullWidth value={value} label='Status Inspeksi' onChange={onChange}>
                <MenuItem value={1}>Terlaksana</MenuItem>
                <MenuItem value={2}>Tidak Terlaksana</MenuItem>
              </CustomTextField>
            )}
          />
        </Grid>
        <Grid item='true' sx={{ marginTop: 2 }}>
          <Controller
            name='tgl_lhi'
            control={control}
            rules={{ required: true }}
            render={({ field: { value, onChange } }) => {
              let vals = value

              if (value === '0000-00-00') {
                vals = null
              }

              const formattedDate = vals ? new Date(vals) : null

              return (
                <AppReactDatepicker
                  dateFormat='yyyy-MM-dd'
                  selected={formattedDate}
                  showYearDropdown
                  showMonthDropdown
                  onChange={e => onChange(e)}
                  placeholderText='MM/DD/YYYY'
                  customInput={
                    <CustomInput
                      value={value}
                      onChange={val => onChange(new Date(val))}
                      label='Tanggal LHI'
                      error={Boolean(errors.tgl_surat)}
                      aria-describedby='validation-basic-dob'
                    />
                  }
                />
              )
            }}
          />
        </Grid>
        <Grid item='true' xs={12} sm={12} sx={{ marginTop: 4 }}>
          <CustomAutocomplete
            control={control}
            errors={errors.alamat_id}
            name='alamat_id'
            label='Pilih Alamat'
            options={optAlamat}
          />
        </Grid>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type='submit' variant='contained' color='primary'>
            Submit
          </Button>
        </DialogActions>
      </form>
    </CustomDialog>
  )
}

export default FormLhiLokasi
