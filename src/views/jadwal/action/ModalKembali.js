import React, { useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import Grid from '@mui/material/Grid2'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import Button from '@mui/material/Button'
import { useForm, Controller } from 'react-hook-form'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'

import { getdetailJadwal, kembaliJadwal } from '@/redux-store/jadwal'
import { detail as getKoordDetail, returnJadwal as returnKoord } from '@/redux-store/jadwal-koord'

// ** Custom Components
import CustomTextField from '@/@core/components/mui/TextField'

const ModalKembali = ({ data, openBack, handleClose, view = 'verifikator' }) => {
  const dispatch = useDispatch()
  const jadwal_id = data.jadwal_id

  const useKoordinator = view === 'koordinator'

  const { detailJadwal, tab } = useSelector(store => {
    if (useKoordinator) {
      return {
        detailJadwal: store.jadwalKoord.detailJadwal,
        tab: store.jadwalKoord.tab
      }
    }

    return {
      detailJadwal: store.jadwal.detailJadwal,
      tab: store.jadwal.tab
    }
  })

  useEffect(() => {
    if (jadwal_id !== undefined && jadwal_id !== null) {
      if (useKoordinator) {
        dispatch(getKoordDetail(jadwal_id))
      } else {
        dispatch(getdetailJadwal(jadwal_id))
      }
    }
  }, [jadwal_id, dispatch, tab, useKoordinator])

  const defaultValues = {
    catatan_koordinator: data.catatan_koordinator ? data.catatan_koordinator : ''
  }

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({ defaultValues })

  const onSubmit = dataform => {
    if (dataform) {
      if (useKoordinator) {
        dispatch(returnKoord({ id: jadwal_id, dataform }))
      } else {
        dispatch(kembaliJadwal({ jadwal_id: jadwal_id, dataform }))
      }
      handleClose()
    }
  }

  return (
    <Dialog
      open={openBack}
      onClose={handleClose}
      aria-labelledby='user-view-edit'
      aria-describedby='user-view-edit-description'
      sx={{ '& .MuiPaper-root': { width: '100%', maxWidth: 650 } }}
    >
      <DialogTitle
        id='user-view-edit'
        sx={{
          textAlign: 'center',
          fontSize: '1.2rem !important'
        }}
      >
        <b>Kembalikan Ke Verifikator</b>
        <Table sx={{ minWidth: 650 }}>
          <TableBody>
            <TableRow>
              <TableCell>Kode Area</TableCell>
              <TableCell>{data.kode_area}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Waktu Pelaksanan </TableCell>
              <TableCell>
                {data.tgl_mulai} - {data.tgl_akhir} , {data.hari} Hari
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Kontak</TableCell>
              <TableCell>
                {data.nama_kontak} (Telp. {data.telp_kontak} )
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Status</TableCell>
              <TableCell>{data.status.nama} </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Tim</TableCell>
              <TableCell>
                {detailJadwal.jadwal_tim && detailJadwal.jadwal_tim.length > 0 ? (
                  detailJadwal.jadwal_tim.map((item, index) => (
                    <div key={index}>
                      {index + 1} . {item.inspektur?.nama}
                    </div>
                  ))
                ) : (
                  <div> No inspector </div>
                )}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </DialogTitle>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent>
          <Grid container spacing={12}>
            <Grid size={{ xs: 12, md: 12, sm: 12 }}>
              <Controller
                name='catatan_koordinator'
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <CustomTextField
                    fullWidth
                    value={value}
                    label='Catatan Untuk Verifikator'
                    onChange={onChange}
                    placeholder=''
                    error={Boolean(errors.uraian)}
                    aria-describedby='validation-basic-first-name'
                    {...(errors.uraian && {
                      helperText: 'This field is required'
                    })}
                  />
                )}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions
          sx={{
            justifyContent: 'center',
            px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
            pb: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`]
          }}
        >
          <Button type='submit' variant='contained' sx={{ mr: 4 }}>
            Submit
          </Button>
          <Button variant='tonal' color='secondary' onClick={handleClose}>
            Cancel
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  )
}

export default ModalKembali
