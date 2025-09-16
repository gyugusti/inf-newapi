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
import { createKonfirmInsp, getdetailJadwal, setTab } from '@/redux-store/jadwal'
import { createLhi } from '@/redux-store/lhi'

const CreateLhi = ({ data, itemjadwal, itemfas, open, handleClose }) => {
  const { data: session, status } = useSession()
  const dispatch = useDispatch()
  const id = data.jadwal_id
  const fihi_id = data.kel_fihi?.fihi_id
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
        fas_tujuan_id: data.fas_tujuan_id,
        user_nama: session.user.nama,
        fihi_id: fihi_id
      }

      dispatch(createLhi(dataform))
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
        Buat LHI
        <Grid size={{ xs: 12 }} sx={{ pt: theme => `${theme.spacing(2)} !important` }}>
          <Table aria-label='simple table'>
            <TableHead>
              <StyledTableRow>
                <TableCell component='th'>Jadwal</TableCell>
                <TableCell>
                  {itemjadwal.kode_area} ({itemjadwal.propinsi.nama}) <br /> {itemjadwal.tgl_mulai} s/d{' '}
                  {itemjadwal.tgl_akhir}
                </TableCell>
              </StyledTableRow>
              <StyledTableRow>
                <TableCell component='th'>Fasilitas</TableCell>
                <TableCell>{itemfas.fas.nama}</TableCell>
              </StyledTableRow>
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
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type='submit' variant='contained' color='primary'>
              Simpan
            </Button>
          </DialogActions>
        </DialogContent>
      </form>
    </Dialog>
  )
}

export default CreateLhi
