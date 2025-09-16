import React from 'react'

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
import { setTab } from '@/redux-store/sbi'

const FormKonfirmasi = ({ data, open, handleClose }) => {
  const dispatch = useDispatch()

  const defaultValues = {
    nama_kontak: '',
    telp_kontak: '',
    konfirmasi: '',
    alasan: ''
  }

  const {
    control,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors }
  } = useForm({ defaultValues })

  const onSubmit = dataform => {
    console.log(dataform)

    if (dataform) {
      dispatch(jadwalKonfirm({ jadwal_id: data.jadwal_id, insp_fas_id: data.insp_fas_id, ...dataform }))

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
                <TableCell>{data.jadwal.kode_area} </TableCell>
              </StyledTableRow>
              <StyledTableRow>
                <TableCell component='th'>Tgl. Pelaksanaan</TableCell>
                <TableCell>
                  {data.jadwal.tgl_mulai} s/d {data.jadwal.tgl_akhir}
                </TableCell>
              </StyledTableRow>
              <StyledTableRow>
                <TableCell component='th'>Kegiatan</TableCell>
                <TableCell>
                  {data.jadwal_fas.jadwal_tujuan &&
                    [...new Set(data.jadwal_fas.jadwal_tujuan.map(kel => kel.kelompok.nama))].map((nama, index) => (
                      <span style={{ color: 'green' }} key={index}>
                        {nama} <br />
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
            <Controller
              name='nama_kontak'
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <CustomTextField
                  fullWidth
                  value={value}
                  label='Nama yang bisa dihubungi'
                  onChange={onChange}
                  error={Boolean(errors.nama_kontak)}
                  helperText={errors.nama_kontak ? 'This field is required' : ''}
                />
              )}
            />
          </Grid>
          <Grid size={{ xs: 12 }} sx={{ pt: theme => `${theme.spacing(2)} !important` }}>
            <Controller
              name='telp_kontak'
              type='number'
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <CustomTextField
                  fullWidth
                  value={value}
                  label='Telp yang bisa dihubungi'
                  onChange={onChange}
                  error={Boolean(errors.telp_kontak)}
                  helperText={errors.telp_kontak ? 'This field is required' : ''}
                />
              )}
            />
          </Grid>

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
                      label='Bersedia dilaksanaan inspeksi'
                      sx={errors.konfirmasi ? { color: 'error.main' } : null}
                      control={<Radio sx={errors.konfirmasi ? { color: 'error.main' } : null} />}
                    />
                    <FormControlLabel
                      value='2'
                      label='Jadwal ulang pelaksanaan inspeksi'
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

export default FormKonfirmasi
