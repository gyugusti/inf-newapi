import React, { useEffect, useState } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { useSession } from 'next-auth/react'
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
  DialogContent,
  FormControl,
  FormLabel,
  Radio,
  RadioGroup,
  FormControlLabel,
  Table,
  TableHead,
  TableRow,
  TableCell,
  FormHelperText
} from '@mui/material'
import { Icon } from '@iconify/react/dist/iconify.js'

import CustomTextField from '@/@core/components/mui/TextField'
import { StyledTableCell, StyledTableRow } from '@/components/styles/StyledTable'
import { jadwalKonfirm } from '@/redux-store/jadwal-fas'
import { setTab, createKonfirmInsp, getdetailJadwal } from '@/redux-store/jadwal'

const KonfirmasiInspektur = ({ data, open, handleClose }) => {
  const dispatch = useDispatch()
  const { data: session } = useSession()
  const id = data.jadwal_id
  const [riwinspId, setRiwinspId] = useState('')

  const insp_master_id = session?.user?.insp_master_id
  const { detailJadwal, isLoading, tab } = useSelector(store => store.jadwal)

  // Filter and set the inspektur ID
  useEffect(() => {
    if (detailJadwal.jadwal_tim) {
      const filteredTim = detailJadwal.jadwal_tim.filter(tim => tim.inspektur.insp_master_id === insp_master_id)

      if (filteredTim.length > 0) {
        setRiwinspId(filteredTim[0].riw_insp_id)
      }
    }
  }, [detailJadwal, insp_master_id])

  useEffect(() => {
    if (id) {
      dispatch(getdetailJadwal(id))
    }
  }, [dispatch, id])

  const defaultValues = {
    konfirmasi: '',
    alasan: '',
    dokumen: ''
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
      const formData = new FormData()

      formData.append('jadwal_id', data.jadwal_id)
      formData.append('riw_insp_id', riwinspId)
      formData.append('konfirmasi', dataform.konfirmasi)
      formData.append('alasan', dataform.alasan)

      // Handle file if it's present
      if (dataform.dokumen) {
        formData.append('dokumen', dataform.dokumen) // Append the file to FormData
      }

      dispatch(createKonfirmInsp(formData))

      dispatch(setTab(dataform))
      handleClose()
    }
  }

  return (
    <Dialog
      open={open}
      maxWidth='lg'
      onClose={handleClose}
      aria-labelledby='user-view-edit'
      aria-describedby='user-view-edit-description'
      sx={{ '& .MuiPaper-root': { width: '100%' } }}
    >
      <DialogTitle
        id='user-view-edit'
        sx={{
          textAlign: 'center',
          fontSize: '1.2rem !important'
        }}
      >
        Form Konfirmasi Jadwal
        <Grid size={{ xs: 12 }} sx={{ pt: theme => `${theme.spacing(2)} !important` }}>
          <Table aria-label='simple table'>
            <TableHead>
              <StyledTableRow>
                <TableCell component='th'>Kode Area</TableCell>
                <TableCell>{data.kode_area} </TableCell>
              </StyledTableRow>
              <StyledTableRow>
                <TableCell component='th'>Tgl. Pelaksanaan</TableCell>
                <TableCell>
                  {data.tgl_mulai} s/d {data.tgl_akhir}
                </TableCell>
              </StyledTableRow>
              <StyledTableRow>
                <TableCell component='th'>Nama Inspektur</TableCell>
                <TableCell>
                  {detailJadwal.jadwal_tim &&
                    detailJadwal.jadwal_tim.map((tim, index) => (
                      <span style={{ color: 'green' }} key={index}>
                        {tim.inspektur.nama} <br />
                      </span>
                    ))}
                </TableCell>
              </StyledTableRow>
            </TableHead>
          </Table>
        </Grid>
      </DialogTitle>

      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent>
          <Grid size={{ xs: 12 }} sx={{ pt: theme => `${theme.spacing(2)} !important` }}>
            <FormControl error={Boolean(errors.konfirmasi)}>
              <FormLabel>Konfirmasi Ketersediaan</FormLabel>
              <Controller
                name='konfirmasi'
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <RadioGroup row {...field} aria-label='gender' name='validation-basic-radio'>
                    <FormControlLabel
                      value='1'
                      label='Bersedia'
                      sx={errors.konfirmasi ? { color: 'error.main' } : null}
                      control={<Radio sx={errors.konfirmasi ? { color: 'error.main' } : null} />}
                    />
                    <FormControlLabel
                      value='3'
                      label='Tidak bersedia'
                      sx={errors.konfirmasi ? { color: 'error.main' } : null}
                      control={<Radio sx={errors.konfirmasi ? { color: 'error.main' } : null} />}
                    />
                  </RadioGroup>
                )}
              />
              {errors.konfirmasi && (
                <FormHelperText
                  id='validation-basic-radio'
                  sx={{ mx: 0, color: 'error.main', fontSize: theme => theme.typography.body2.fontSize }}
                >
                  This field is required
                </FormHelperText>
              )}
            </FormControl>
          </Grid>
          <Grid size={{ xs: 12 }} sx={{ pt: theme => `${theme.spacing(2)} !important` }}>
            <Controller
              name='alasan'
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <CustomTextField
                  fullWidth
                  multiline
                  maxRows={4}
                  value={value}
                  label='Alasan'
                  onChange={onChange}
                  placeholder=''
                  error={Boolean(errors.alasan)}
                  {...(errors.alasan && { helperText: 'This field is required' })}
                />
              )}
            />
          </Grid>
          {/* File Upload */}
          <Grid size={{ xs: 12 }} sx={{ pt: theme => `${theme.spacing(2)} !important` }}>
            <FormControl>
              <FormLabel>Upload Dokumen</FormLabel>
              <Controller
                name='dokumen'
                control={control}
                render={({ field }) => (
                  <input
                    type='file'
                    accept='.pdf,.doc,.docx,.jpg,.png'
                    onChange={e => {
                      const file = e.target.files[0]

                      field.onChange(file) // Handle file input
                    }}
                  />
                )}
              />
              {errors.dokumen && <FormHelperText sx={{ color: 'error.main' }}>Dokumen diperlukan</FormHelperText>}
            </FormControl>
          </Grid>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type='submit' variant='contained' color='primary'>
              Kirim
            </Button>
          </DialogActions>
        </DialogContent>
      </form>
    </Dialog>
  )
}

export default KonfirmasiInspektur
