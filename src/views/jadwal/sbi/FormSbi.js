import { forwardRef, useEffect, useState } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { useSession } from 'next-auth/react'
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, IconButton, Fade, MenuItem } from '@mui/material'
import { Icon } from '@iconify/react/dist/iconify.js'
import Grid from '@mui/material/Grid2'
import { styled } from '@mui/material/styles'
import { useForm, Controller } from 'react-hook-form'

import { format } from 'date-fns/format'

import AppReactDatepicker from '@/libs/styles/AppReactDatepicker'


import CustomAutocomplete from '@/components/widget/CustomAutocomplete'
import { getAlamat, getPenandatangan } from '@/redux-store/referensi-balis'
import { editJadwalFas } from '@/redux-store/jadwal'

import CustomTextField from '@/@core/components/mui/TextField'
import { createSbi, editSbi } from '@/redux-store/sbi'

const CustomCloseButton = styled(IconButton)(({ theme }) => ({
  top: 0,
  right: 0,
  color: 'grey.500',
  position: 'absolute',
  boxShadow: theme.shadows[2],
  transform: 'translate(10px, -10px)',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: `${theme.palette.background.paper} !important`,
  transition: 'transform 0.25s ease-in-out, box-shadow 0.25s ease-in-out',
  '&:hover': {
    transform: 'translate(7px, -5px)'
  }
}))

const CustomInput = forwardRef(({ ...props }, ref) => {
  return <CustomTextField fullWidth inputRef={ref} {...props} sx={{ width: '100%' }} />
})

const Transition = forwardRef(function Transition(props, ref) {
  return <Fade ref={ref} {...props} />
})

const FormSbi = ({ jadwal_id, dataFas, dataTujuan, dataForm, dataSurat, open, edit, handleClose }) => {
  const dispatch = useDispatch()
  const { data: session } = useSession()
  const [nip, setNip] = useState(dataSurat ? dataSurat.nip_ttd : '')
  const [namaCetak, setNamaCetak] = useState(dataSurat ? dataSurat.nip_ttd : '')
  const [jabatan, setJabatan] = useState(dataSurat ? dataSurat.jabatan_ttd : '')
  const { listTtd, listAlamat } = useSelector(store => store.refbalis)

  useEffect(() => {
    dispatch(getPenandatangan())

    dispatch(getAlamat(dataFas.fas_id))
  }, [dispatch, dataFas])

  const optAlamat = listAlamat.map(({ alamat_id, alamat, nama }) => ({
    label: nama + ` , ` + alamat,
    value: alamat_id
  }))

  const defaultValues = {
    tgl_surat: dataSurat ? dataSurat.tgl_surat : '',
    no_surat: '',
    alamat_id: dataSurat ? dataSurat.alamat_id : '',
    alamat_cetak: dataSurat ? dataSurat.alamat_cetak : '',
    jabatan_pi: dataSurat ? dataSurat.jabatan_pi : '',
    ttd_id: dataSurat ? dataSurat.ttd_id : ''
  }

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({ defaultValues })

  const onSubmit = datas => {
    const dataform = {
      ...datas,
      jadwal_id: dataForm.jadwal_id,
      insp_fas_id: dataFas.insp_fas_id,
      tgl_surat: format(new Date(datas.tgl_surat), 'yyyy-MM-dd'),
      alamat_id: dataFas.alamat_id,
      user_id: session?.user?.id,
      jabatan_ttd: jabatan,
      nip_ttd: nip,
      nama_cetak: namaCetak,
      surat_kat_id: 1
    }

    if (edit) {
      dispatch(editSbi({ id: dataSurat.surat_id, dataform }))
    } else {
      dispatch(createSbi(dataform))
    }

    handleClose()
  }

  return (
    <Dialog
      fullWidth
      open={open}
      scroll='body'
      maxWidth='lg'
      onClose={handleClose}
      TransitionComponent={Transition}
      sx={{ '& .MuiDialog-paper': { overflow: 'visible' } }}
    >
      <CustomCloseButton onClick={handleClose}>
        <Icon icon='tabler:x' fontSize='1.25rem' />
      </CustomCloseButton>
      <DialogTitle
        id='user-view-edit'
        sx={{
          //  textAlign: 'center',
          fontSize: '1rem !important'
        }}
      >
        <Grid container spacing={1}>
          <Grid size={{ xs: 4, sm: 4 }}>Lokasi</Grid>
          <Grid size={{ xs: 1, sm: 1 }}>:</Grid>
          <Grid size={{ xs: 6, sm: 6 }}>{dataForm.propinsi.nama}</Grid>
        </Grid>
        <Grid container spacing={1}>
          <Grid size={{ xs: 4, sm: 4 }}>Kode Area</Grid>
          <Grid size={{ xs: 4, sm: 4 }}>:</Grid>
          <Grid size={{ xs: 6, sm: 6 }}>{dataForm.kode_area}</Grid>
        </Grid>
        <Grid container spacing={1}>
          <Grid size={{ xs: 4, sm: 4 }}>Tgl Pelaksanaan</Grid>
          <Grid size={{ xs: 1, sm: 1 }}>:</Grid>
          <Grid size={{ xs: 6, sm: 6 }}>
            {dataForm.tgl_mulai} s/d {dataForm.tgl_akhir} , {dataForm.hari} Hari
          </Grid>
        </Grid>
        <Grid container spacing={1}>
          <Grid size={{ xs: 4, sm: 4 }}>Kegiatan</Grid>
          <Grid size={{ xs: 1, sm: 1 }}>:</Grid>
          <Grid size={{ xs: 6, sm: 6 }}>
            {dataTujuan.map((kel, index) => (
              <span style={{ color: 'green' }} key={index}>
                {kel.kelompok.nama}
              </span>
            ))}
          </Grid>
        </Grid>
        <Grid container spacing={1}>
          <Grid size={{ xs: 4, sm: 4 }}>Jenis Surat</Grid>
          <Grid size={{ xs: 1, sm: 1 }}>:</Grid>
          <Grid size={{ xs: 6, sm: 6 }}>Surat Pemberitahuan Inspeksi</Grid>
        </Grid>
      </DialogTitle>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent>
          <Grid container spacing={6}>
            <Grid size={{ xs: 12, sm: 12 }}>
              <Controller
                name='tgl_surat'
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
                          label='Tanggal Surat'
                          error={Boolean(errors.tgl_surat)}
                          aria-describedby='validation-basic-dob'
                        />
                      }
                    />
                  )
                }}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 12 }}>
              <CustomAutocomplete
                control={control}
                errors={errors.alamat_id}
                name='alamat_id'
                label='Pilih Alamat'
                options={optAlamat}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 12 }}>
              <Controller
                name='alamat_cetak'
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <CustomTextField
                    fullWidth
                    value={value}
                    label='Masukkan Alamat manual'
                    onChange={onChange}
                    placeholder=''
                    error={Boolean(errors.alamat_cetak)}
                    aria-describedby='validation-basic-first-name'
                    {...(errors.alamat_cetak && {
                      helperText: 'This field is required'
                    })}
                  />
                )}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 12 }}>
              <Controller
                name='ttd_id'
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <CustomTextField
                    select
                    fullWidth
                    defaultValue=''
                    label='Penandatangan'
                    SelectProps={{
                      value: value,
                      onChange: e => {
                        onChange(e)
                        const selectedItem = listTtd.find(item => item.ttd_id === e.target.value)

                        if (selectedItem) {
                          setNip(selectedItem.nip)
                          setNamaCetak(selectedItem.nama_cetak)
                          setJabatan(selectedItem.jabatan)
                        }
                      }
                    }}
                    id='validation-basic-select'
                    error={Boolean(errors.ttd_id)}
                    aria-describedby='validation-basic-select'
                    {...(errors.ttd_id && { helperText: 'This field is required' })}
                  >
                    {listTtd.map((item, index) => {
                      const { ttd_id, nama, nip, nama_cetak, jabatan } = item

                      return (
                        <MenuItem key={index} value={ttd_id}>
                          {nama}
                        </MenuItem>
                      )
                    })}
                  </CustomTextField>
                )}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 12 }}>
              <Controller
                name='jabatan_pi'
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <CustomTextField
                    fullWidth
                    value={value}
                    label='Jabatan PI'
                    onChange={onChange}
                    placeholder=''
                    error={Boolean(errors.jabatan_pi)}
                    aria-describedby='validation-basic-first-name'
                    {...(errors.jabatan_pi && {
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

export default FormSbi
