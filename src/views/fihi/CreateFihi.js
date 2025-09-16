import React, { useEffect, useState } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { useForm, Controller } from 'react-hook-form'
import { useSession } from 'next-auth/react'
import {
  DialogActions,
  Button,
  Box,
  Typography,
  Checkbox,
  Pagination,
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
import Grid from '@mui/material/Grid2'
import { Icon } from '@iconify/react/dist/iconify.js'

import CustomTextField from '@/@core/components/mui/TextField'
import { StyledTableCell, StyledTableRow } from '@/components/styles/StyledTable'
import { jadwalKonfirm } from '@/redux-store/jadwal-fas'
import { createKonfirmInsp, getdetailJadwal } from '@/redux-store/jadwal'
import { createFihi, setTab } from '@/redux-store/fihi'

const CreateFihi = ({ data, itemfas, open, handleClose }) => {
  const dispatch = useDispatch()
  const { data: session } = useSession()
  const id = data.jadwal_id
  const [riwinspId, setRiwinspId] = useState('')

  const insp_master_id = session?.user?.insp_master_id
  const { detailJadwal, isLoading, tab } = useSelector(store => store.jadwal)

  const defaultValues = {
    status_inspeksi: ''
  }

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({ defaultValues })

  const onSubmit = forms => {
    if (forms) {
      const dataform = {
        insp_fas_id: data.insp_fas_id,
        alamat_id: itemfas.alamat_id,
        user_id: session?.user?.id,
        kelompok_id: data.kelompok_id,
        ...forms
      }

      console.log(dataform)

      dispatch(createFihi(dataform))
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
        Buat FIHI
        <Grid size={{ xs: 12 }} sx={{ pt: theme => `${theme.spacing(2)} !important` }}>
          <Table aria-label='simple table'>
            <TableHead>
              <StyledTableRow>
                <TableCell component='th'>Kelompok</TableCell>
                <TableCell>{data.kelompok.nama}</TableCell>
              </StyledTableRow>
            </TableHead>
          </Table>
        </Grid>
      </DialogTitle>

      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent>
          <Grid size={{ xs: 12 }} sx={{ pt: theme => `${theme.spacing(2)} !important` }}>
            <FormControl error={Boolean(errors.konfirmasi)}>
              <FormLabel>Status Inspeksi</FormLabel>
              <Controller
                name='status_inspeksi'
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <RadioGroup row {...field} aria-label='gender' name='validation-basic-radio'>
                    <FormControlLabel
                      value='1'
                      label='Terlaksana'
                      sx={errors.konfirmasi ? { color: 'error.main' } : null}
                      control={<Radio sx={errors.konfirmasi ? { color: 'error.main' } : null} />}
                    />
                    <FormControlLabel
                      value='2'
                      label='Tidak Terlaksana'
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

export default CreateFihi
