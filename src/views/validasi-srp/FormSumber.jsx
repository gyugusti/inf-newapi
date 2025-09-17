'use client'

import React, { Fragment, useState, forwardRef, useEffect, useMemo } from 'react'

import Link from 'next/link'

import { useRouter, useParams, useSearchParams } from 'next/navigation'

import { useDispatch, useSelector } from 'react-redux'
import { useForm, Controller } from 'react-hook-form'
import { DialogActions, Button, MenuItem, Card, CardHeader, CardContent, Grid2, Box } from '@mui/material'
import { Icon } from '@iconify/react/dist/iconify.js'
import { useSession } from 'next-auth/react'

import { parseISO, format } from 'date-fns'

import CustomDialog from '@/components/widget/CustomDialog'
import CustomTextField from '@/@core/components/mui/TextField'
import CustomAutocomplete from '@/components/widget/CustomAutocomplete'
import FasilitasAutocomplete from '@/components/widget/FasilitasAutocomplete'
import { getAlamat, getBidang, getModelSumber, getSatuan } from '@/redux-store/referensi-balis'
import { setTab } from '@/redux-store/fihi'
import { editFihiSumber } from '@/redux-store/fihi/dataFihi'

import AppReactDatepicker from '@/libs/styles/AppReactDatepicker'
import { createRegSumber, editRegSumber } from '@/redux-store/validasi-data'
import { getDataFasilitas } from '@/redux-store/data-inspeksi'
import LingkupAutoComplete from '@/components/widget/LingkupAutoComplete'
import PilihJadwal from './PilihJadwal'
import { setInspektur } from '@/redux-store/jadwal'

const FormSumber = ({ data }) => {
  const dispatch = useDispatch()
  const router = useRouter()
  const searchParams = useSearchParams()
  const reg_srp_id = searchParams.get('reg_srp_id')

  const { data: session } = useSession()
  const username = session?.user?.name || ''
  const insp_master_id = session?.user?.insp_master_id || ''

  const [jenisSbr, setJenisSbr] = useState(data ? data.jenis_sumber_id : 1)
  const [prpMandatori, setPrpMandatori] = useState(true)
  const [asignOpen, setAsignOpen] = useState(false)

  const [selectedFasilitas, setSelectedFasilitas] = useState(null)

  const { dafSatuan, dafModelSumber } = useSelector(store => store.refbalis)
  const { dataFasilitas } = useSelector(store => store.dataInspeksi)
  const { isLoading, msg, jadwalSrp } = useSelector(store => store.validasiData)

  useEffect(() => {
    dispatch(getModelSumber())
    dispatch(getSatuan())

    // Pastikan hanya mengambil data fasilitas saat pertama kali render
    if (!dataFasilitas.length) {
      dispatch(getDataFasilitas())
    }
  }, [dispatch, dataFasilitas.length])

  // useEffect(() => {
  //   if (searchTerm) {
  //     dispatch(getDataFasilitas({ cari: searchTerm })) // Kirim searchTerm ke API
  //       .then(res => {
  //         if (res.payload) {
  //           setFilteredFasilitas(
  //             res.payload.map(({ fas_id, nama }) => ({
  //               label: nama,
  //               value: fas_id
  //             }))
  //           )
  //         }
  //       })
  //   } else {
  //     setFilteredFasilitas([])
  //   }
  // }, [searchTerm, dispatch])

  useEffect(() => {
    if (data) {
      setJenisSbr(data.jenis_sumber_id)
    }
  }, [data])

  useEffect(() => {
    if (jenisSbr === 1) {
      setPrpMandatori(true)
    } else {
      setPrpMandatori(false)
    }
  }, [jenisSbr])

  const optSatuan = dafSatuan.map(({ satuan_id, nama_satuan }) => ({
    label: nama_satuan,
    value: satuan_id
  }))

  const optMerk = Object.values(
    dafModelSumber.reduce((acc, { model_sumber_id, nama }) => {
      if (!acc[nama]) {
        acc[nama] = { label: nama, value: model_sumber_id }
      }

      return acc
    }, {})
  )

  const optFasilitas = useMemo(
    () => dataFasilitas.map(({ fas_id, nama }) => ({ label: nama, value: fas_id })),
    [dataFasilitas]
  )

  const defaultValues = {
    jenis_sumber_id: searchParams.get('jenis_sumber_id') ? searchParams.get('jenis_sumber_id') : '',
    flag_kegiatan: searchParams.get('flag_kegiatan') ? searchParams.get('flag_kegiatan') : '',
    kat_sumber_id: searchParams.get('kat_sumber_id') ? searchParams.get('kat_sumber_id') : '',
    model_sumber_id: searchParams.get('model_sumber_id') ? searchParams.get('model_sumber_id') : '',
    tipe: searchParams.get('tipe') ? searchParams.get('tipe') : '',
    no_seri: searchParams.get('no_seri') ? searchParams.get('no_seri') : '',
    merk_tabung: searchParams.get('merk_tabung') ? searchParams.get('merk_tabung') : '',
    tipe_tabung: searchParams.get('tipe_tabung') ? searchParams.get('tipe_tabung') : '',
    no_seri_tabung: searchParams.get('no_seri_tabung') ? searchParams.get('no_seri_tabung') : '',
    tahun_produksi: searchParams.get('tahun_produksi') ? searchParams.get('tahun_produksi') : '',
    pabrikan: searchParams.get('pabrikan') ? searchParams.get('pabrikan') : '',
    aktivitas: searchParams.get('aktivitas') ? searchParams.get('aktivitas') : '',
    sat_aktivitas: searchParams.get('sat_aktivitas') ? searchParams.get('sat_aktivitas') : '',
    tgl_aktivitas: searchParams.get('tgl_aktivitas') ? searchParams.get('tgl_aktivitas') : '',
    kv: searchParams.get('kv') ? searchParams.get('kv') : '',
    sat_kv: searchParams.get('sat_kv') ? searchParams.get('sat_kv') : '',
    ma: searchParams.get('ma') ? searchParams.get('ma') : '',
    sat_ma: searchParams.get('sat_ma') ? searchParams.get('sat_ma') : '',
    fas_id: searchParams.get('fas_id') ? searchParams.get('fas_id') : '',
    sifat: searchParams.get('sifat') ? searchParams.get('sifat') : '',
    bentuk: searchParams.get('bentuk') ? searchParams.get('bentuk') : '',
    kegiatan_id: searchParams.get('kegiatan_id') ? searchParams.get('kegiatan_id') : '',
    jadwal_id: jadwalSrp.jadwal_id
  }

  const {
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors }
  } = useForm({ defaultValues })

  const flagKegiatanWatch = watch('flag_kegiatan')

  const onSubmit = dataform => {
    const dataforms = {
      ...dataform,
      tahun_produksi: dataform.tahun_produksi ? new Date(dataform.tahun_produksi).getFullYear().toString() : '',
      username: session ? session.user.name : '',
      user_id: session ? session.user.id : '',
      kegiatan: dataform.kegiatan_id,
      flag_user: 2
    }

    if (reg_srp_id) {
      dispatch(editRegSumber({ id: reg_srp_id, dataforms }))
    } else {
      dispatch(createRegSumber(dataforms))
    }

    router.push(`/inspektur/registrasi-srp`)
  }

  const handleCariJadwal = () => {
    dispatch(setInspektur(insp_master_id))
    setAsignOpen(true)
  }

  const handleAsignClose = () => setAsignOpen(false)

  useEffect(() => {
    if (jadwalSrp && jadwalSrp.jadwal_id) {
      setValue('jadwal_id', jadwalSrp.jadwal_id)
    } else {
      setValue('jadwal_id', '')
    }
  }, [jadwalSrp, setValue])

  return (
    <>
      <Card>
        <CardHeader title='Form Data Registrasi SRP' />
        <CardContent>
          <form id='myForm' onSubmit={handleSubmit(onSubmit)}>
            <Grid2 item='true' size={{ xs: 12 }}>
              <Box display='flex' alignItems='stretch' gap={2}>
                <Box flex={1}>
                  <Controller
                    name='jadwal_id'
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { value, onChange } }) => (
                      <CustomTextField
                        fullWidth
                        size='small'
                        value={jadwalSrp?.kode_area || ''}
                        label='Jadwal'
                        placeholder='Kode Area'
                        InputProps={{ readOnly: true }}
                        error={Boolean(errors.jadwal_id)}
                        helperText={errors.jadwal_id && 'This field is required'}
                      />
                    )}
                  />
                </Box>
                <Box height='100%' display='flex' alignItems='center'>
                  <Button
                    variant='outlined'
                    onClick={handleCariJadwal}
                    sx={{
                      height: '40px', // samakan dengan TextField kecil
                      px: 2.5,
                      textTransform: 'none',
                      marginTop: 4
                    }}
                  >
                    Cari Jadwal
                  </Button>
                </Box>
              </Box>
            </Grid2>

            <Controller
              name='fas_id'
              control={control}
              rules={{ required: false }}
              render={({ field, fieldState }) => (
                <div>
                  <label className='text-md font-medium'>Fasilitas</label>
                  <FasilitasAutocomplete
                    value={field.value} // Ambil nilai dari form
                    onChange={selected => setValue('fas_id', selected.fas_id)} // Hanya simpan fas_id
                  />
                  {fieldState.error && <p className='text-red text-sm'>{fieldState.error.message}</p>}
                </div>
              )}
            />

            <Controller
              name='flag_kegiatan'
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <CustomTextField
                  fullWidth
                  select
                  label='Kegiatan'
                  value={value}
                  onChange={e => {
                    onChange(e)
                    setJenisSbr(e.target.value)
                  }}
                  error={Boolean(errors.flag_kegiatan)}
                  helperText={errors.flag_kegiatan && 'This field is required'}
                >
                  <MenuItem value='2'>Ekspor/Impor</MenuItem>
                  <MenuItem value='1'>Pemanfaatan</MenuItem>
                </CustomTextField>
              )}
            />

            <Controller
              name='kegiatan_id'
              control={control}
              rules={{ required: 'Lingkup wajib dipilih' }}
              render={({ field, fieldState }) => (
                <div>
                  <label className='text-md font-medium'>Lingkup</label>
                  <LingkupAutoComplete
                    value={field.value}
                    onChange={selected => setValue('kegiatan_id', selected.kegiatan_id)}
                    flagKegiatan={flagKegiatanWatch}
                  />
                  {fieldState.error && <p className='text-red-500 text-sm'>{fieldState.error.message}</p>}
                </div>
              )}
            />

            <Controller
              name='jenis_sumber_id'
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <CustomTextField
                  fullWidth
                  select
                  label='Jenis Sumber'
                  value={value}
                  onChange={e => {
                    onChange(e)
                    setJenisSbr(e.target.value)
                  }}
                  error={Boolean(errors.jenis_sumber_id)}
                  helperText={errors.jenis_sumber_id && 'This field is required'}
                >
                  <MenuItem value='1'>Pembangkit Radiasi Pengion</MenuItem>
                  <MenuItem value='2'>Zat Radioaktif</MenuItem>
                </CustomTextField>
              )}
            />

            <Controller
              name='kat_sumber_id'
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <CustomTextField
                  fullWidth
                  select
                  label='Kategori Sumber'
                  value={value}
                  onChange={e => {
                    onChange(e)
                    setJenisSbr(e.target.value)
                  }}
                  error={Boolean(errors.kat_sumber_id)}
                  helperText={errors.kat_sumber_id && 'This field is required'}
                >
                  <MenuItem value='1'>Tunggal</MenuItem>
                  <MenuItem value='2'>Curah</MenuItem>
                </CustomTextField>
              )}
            />
            <br />
            <br />
            <CustomAutocomplete
              control={control}
              errors={errors.model_sumber_id}
              name='model_sumber_id'
              label='Model Sumber'
              options={optMerk}
              required={true}
            />

            <Controller
              name='tipe'
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <CustomTextField
                  fullWidth
                  value={value}
                  label='Tipe'
                  onChange={onChange}
                  placeholder=''
                  error={Boolean(errors.tipe)}
                  {...(errors.tipe && { helperText: 'This field is required' })}
                />
              )}
            />
            <Controller
              name='no_seri'
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <CustomTextField
                  fullWidth
                  value={value}
                  label='No Seri'
                  onChange={onChange}
                  placeholder=''
                  error={Boolean(errors.no_seri)}
                  {...(errors.no_seri && { helperText: 'This field is required' })}
                />
              )}
            />

            <Controller
              name='tahun_produksi'
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <AppReactDatepicker
                  selected={value}
                  onChange={onChange}
                  showYearPicker
                  dateFormat='yyyy'
                  yearItemNumber={9}
                  placeholderText='MM/DD/YYYY'
                  customInput={
                    <CustomTextField
                      value={value}
                      onChange={onChange}
                      fullWidth
                      label='Tahun Produksi'
                      {...(errors.tahun_produksi && { error: true, helperText: 'This field is required.' })}
                    />
                  }
                />
              )}
            />

            <Controller
              name='pabrikan'
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <CustomTextField
                  fullWidth
                  value={value}
                  label='Pabrikan'
                  onChange={onChange}
                  placeholder=''
                  error={Boolean(errors.no_seri)}
                  {...(errors.pabrikan && { helperText: 'This field is required' })}
                />
              )}
            />

            <Controller
              name='aktivitas'
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <CustomTextField
                  fullWidth
                  value={value}
                  label='Aktivitas'
                  onChange={onChange}
                  placeholder=''
                  error={Boolean(errors.aktivitas)}
                  {...(errors.aktivitas && { helperText: 'This field is required' })}
                />
              )}
            />
            <Controller
              name='tgl_aktivitas'
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <CustomTextField
                  fullWidth
                  type='date'
                  value={value}
                  label='Tanggal Aktivitas'
                  onChange={onChange}
                  placeholder=''
                  error={Boolean(errors.tgl_aktivitas)}
                  {...(errors.tgl_aktivitas && { helperText: 'This field is required' })}
                />
              )}
            />
            <br />
            <br />
            <label className='text-xs font-medium'>Satuan aktivitas</label>
            <CustomAutocomplete
              control={control}
              errors={errors.sat_aktivitas}
              name='sat_aktivitas'
              label='Satuan Aktivitas'
              options={optSatuan}
              required={true}
            />

            <Controller
              name='sifat'
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <CustomTextField
                  select
                  fullWidth
                  label='Sifat'
                  value={value}
                  onChange={onChange}
                  error={Boolean(errors.sifat)}
                  helperText={errors.sifat && 'This field is required'}
                >
                  <MenuItem value=''>- Pilih Sifat -</MenuItem>
                  <MenuItem value='Cair'>Cair</MenuItem>
                  <MenuItem value='Gas'>Gas</MenuItem>
                  <MenuItem value='Padat'>Padat</MenuItem>
                  <MenuItem value='Padat dan/atau Cair'>Padat dan/atau Cair</MenuItem>
                </CustomTextField>
              )}
            />

            <Controller
              name='bentuk'
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <CustomTextField
                  select
                  fullWidth
                  label='Bentuk'
                  value={value}
                  onChange={onChange}
                  error={Boolean(errors.bentuk)}
                  helperText={errors.bentuk && 'This field is required'}
                >
                  <MenuItem value=''>- Pilih Bentuk -</MenuItem>
                  <MenuItem value='Terbuka'>Terbuka</MenuItem>
                  <MenuItem value='Terbungkus'>Terbungkus</MenuItem>
                </CustomTextField>
              )}
            />

            {Number(jenisSbr) === 1 && (
              <div id='formPrp'>
                <Controller
                  name='tipe_tabung'
                  control={control}
                  rules={{ required: prpMandatori }}
                  render={({ field: { value, onChange } }) => (
                    <CustomTextField
                      fullWidth
                      value={value}
                      label='Tipe Tabung'
                      onChange={onChange}
                      placeholder=''
                      error={Boolean(errors.tipe_tabung)}
                      {...(errors.tipe_tabung && { helperText: 'This field is required' })}
                    />
                  )}
                />
                <Controller
                  name='no_seri_tabung'
                  control={control}
                  rules={{ required: prpMandatori }}
                  render={({ field: { value, onChange } }) => (
                    <CustomTextField
                      fullWidth
                      value={value}
                      label='No Seri Tabung'
                      onChange={onChange}
                      placeholder=''
                      error={Boolean(errors.no_seri_tabung)}
                      {...(errors.no_seri_tabung && { helperText: 'This field is required' })}
                    />
                  )}
                />
                <CustomAutocomplete
                  control={control}
                  errors={errors.merk_tabung}
                  name='merk_tabung'
                  label='Model Sumber'
                  options={optMerk}
                  required={prpMandatori}
                />
                <Controller
                  name='kv'
                  control={control}
                  rules={{ required: prpMandatori }}
                  render={({ field: { value, onChange } }) => (
                    <CustomTextField
                      fullWidth
                      type='number'
                      value={value}
                      label='KV'
                      onChange={onChange}
                      placeholder=''
                      error={Boolean(errors.kv)}
                      {...(errors.kv && { helperText: 'This field is required' })}
                    />
                  )}
                />

                <br />
                <br />
                <CustomAutocomplete
                  control={control}
                  errors={errors.sat_kv}
                  name='sat_kv'
                  label='Satuan Kv'
                  options={optSatuan}
                  required={prpMandatori}
                />

                <Controller
                  name='ma'
                  control={control}
                  rules={{
                    required: prpMandatori,
                    validate: value => Number.isInteger(Number(value)) || 'MA harus berupa angka bulat'
                  }}
                  render={({ field: { value, onChange } }) => (
                    <CustomTextField
                      fullWidth
                      type='number'
                      value={value}
                      label='MA'
                      onChange={e => onChange(e.target.value ? parseInt(e.target.value, 10) : '')}
                      placeholder=''
                      error={Boolean(errors.ma)}
                      {...(errors.ma && { helperText: errors.ma.message || 'This field is required' })}
                    />
                  )}
                />

                <br />
                <br />
                <CustomAutocomplete
                  control={control}
                  errors={errors.sat_ma}
                  name='sat_ma'
                  label='Satuan Ma'
                  options={optSatuan}
                  required={prpMandatori}
                />
              </div>
            )}

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

              <Button variant='tonal' color='secondary' component={Link} href='/inspektur/registrasi-srp'>
                Cancel
              </Button>
            </DialogActions>
          </form>
        </CardContent>
      </Card>
      {asignOpen && <PilihJadwal open={asignOpen} handleClose={handleAsignClose} />}
    </>
  )
}

export default FormSumber
