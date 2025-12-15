'use client'

import { useEffect, useMemo, useState } from 'react'

import { useRouter, useSearchParams } from 'next/navigation'

import { useSession } from 'next-auth/react'
import { Controller, useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'

import { Autocomplete, Box, Button, MenuItem, TextField, Typography } from '@mui/material'
import Grid from '@mui/material/Grid2'

import { toast } from 'react-toastify'

import ShadowBox from '@/components/styles/ShadowBox'
import CustomAutocomplete from '@/components/widget/CustomAutocomplete'
import AppReactDatepicker from '@/libs/styles/AppReactDatepicker'
import { getModelSumber, getSatuan } from '@/redux-store/referensi-balis'

import LingkupAutoComplete from '@/components/widget/LingkupAutoComplete'

// helper untuk flatten error backend { field: [msg1, msg2], ... } jadi 1 string
const flattenApiErrors = errorsObj => {
  if (!errorsObj || typeof errorsObj !== 'object') return ''

  return Object.values(errorsObj).flat().join(' | ')
}

const FormSrpReg = ({ data, action }) => {
  const searchParams = useSearchParams()
  const dispatch = useDispatch()
  const router = useRouter()
  const { data: session } = useSession()

  const { dafSatuan, dafModelSumber } = useSelector(state => state.refbalis)

  // Helper baca query: jika ada → string; jika tidak → ''
  const sp = searchParams
  const getSP = key => (sp.get(key) ? sp.get(key) : '')

  // Semua defaultValues mengikuti pola jenis_sumber_id
  const defaultValues = {
    jenis_sumber_id: getSP('jenis_sumber_id'),
    kat_sumber_id: getSP('kat_sumber_id'),
    nama: getSP('nama'),
    tipe: getSP('tipe'),
    no_seri: getSP('no_seri'),
    sifat: getSP('sifat'),
    bentuk: getSP('bentuk'),
    model_sumber_id: getSP('model_sumber_id'),
    status_sumber_id: getSP('status_sumber_id'),
    aktivitas: getSP('aktivitas'),
    sat_aktivitas: getSP('sat_aktivitas'),
    tgl_aktivitas: getSP('tgl_aktivitas'),
    kv: getSP('kv'),
    sat_kv: getSP('sat_kv'),
    ma: getSP('ma'),
    sat_ma: getSP('sat_ma'),
    tipe_tabung: getSP('tipe_tabung'),
    no_seri_tabung: getSP('no_seri_tabung'),
    merk_tabung: getSP('merk_tabung'),
    jumlah: getSP('jumlah'),
    sat_jumlah: getSP('sat_jumlah'),
    ket_status: getSP('ket_status'),
    pabrikan: getSP('pabrikan'),
    tahun_produksi: getSP('tahun_produksi'),
    flag_kegiatan: getSP('flag_kegiatan'),
    kegiatan_id: getSP('kegiatan_id')

    // kalau mau, bisa tambahkan flag_kegiatan, kegiatan, flag_user, jadwal_id di sini juga
  }

  const formFields = useMemo(() => Object.keys(defaultValues), [])

  const {
    control,
    setValue,
    handleSubmit,
    setError,
    watch,
    formState: { errors }
  } = useForm({ defaultValues })

  // Jenis sumber & properti mandat
  const [jenisSbr, setJenisSbr] = useState(defaultValues.jenis_sumber_id ? Number(defaultValues.jenis_sumber_id) : '')
  const [prpMandatori, setPrpMandatori] = useState(jenisSbr === 1)

  useEffect(() => {
    dispatch(getModelSumber())
    dispatch(getSatuan())
  }, [dispatch])

  useEffect(() => {
    setPrpMandatori(jenisSbr === 1)
  }, [jenisSbr])

  useEffect(() => {
    formFields.forEach(k => setValue(k, getSP(k)))
    setJenisSbr(getSP('jenis_sumber_id') ? Number(getSP('jenis_sumber_id')) : '')
  }, [searchParams, setValue, formFields])

  useEffect(() => {
    if (!data) return

    const mappedValues = {
      flag_kegiatan: data.flag_kegiatan,
      kegiatan_id: data.kegiatan_id ?? data.kegiatan,
      kat_sumber_id: data.kat_sumber_id,
      jenis_sumber_id: data.jenis_sumber_id,
      nama: data.nama,
      tipe: data.tipe,
      no_seri: data.no_seri,
      sifat: data.sifat,
      bentuk: data.bentuk,
      model_sumber_id: data.model_sumber_id,
      status_sumber_id: data.status_sumber_id,
      aktivitas: data.aktivitas,
      sat_aktivitas: data.sat_aktivitas,
      tgl_aktivitas: data.tgl_aktivitas,
      kv: data.kv,
      sat_kv: data.sat_kv,
      ma: data.ma,
      sat_ma: data.sat_ma,
      tipe_tabung: data.tipe_tabung,
      no_seri_tabung: data.no_seri_tabung,
      merk_tabung: data.merk_tabung,
      jumlah: data.jumlah,
      sat_jumlah: data.sat_jumlah,
      ket_status: data.ket_status,
      pabrikan: data.pabrikan,
      tahun_produksi: data.tahun_produksi
    }

    Object.entries(mappedValues).forEach(([field, value]) => {
      if (formFields.includes(field)) {
        setValue(field, value ?? '')
      }
    })

    setJenisSbr(data.jenis_sumber_id ? Number(data.jenis_sumber_id) : '')
  }, [data, formFields, setValue])

  const optSatuan = useMemo(
    () => dafSatuan.map(item => ({ label: item.nama_satuan, value: item.satuan_id })),
    [dafSatuan]
  )

  const optMerk = useMemo(() => {
    const map = {}

    for (const { model_sumber_id, nama } of dafModelSumber) {
      if (!map[nama]) map[nama] = { label: nama, value: model_sumber_id }
    }

    return Object.values(map)
  }, [dafModelSumber])

  const [isSubmitting, setIsSubmitting] = useState(false)
  const flagKegiatanWatch = watch('flag_kegiatan')

  const onSubmit = async dataform => {
    if (!action) return

    const parsed = {
      jenis_sumber_id: dataform.jenis_sumber_id ? Number(dataform.jenis_sumber_id) : 0,
      flag_kegiatan: dataform.flag_kegiatan ?? '', // kalau ada field ini di form/hidden
      kat_sumber_id: dataform.kat_sumber_id ? Number(dataform.kat_sumber_id) : 0,
      kegiatan: dataform.kegiatan ? Number(dataform.kegiatan) : 0, // kalau ada
      model_sumber_id: dataform.model_sumber_id ? Number(dataform.model_sumber_id) : 0,
      tipe: dataform.tipe ?? '',
      no_seri: dataform.no_seri ?? '',
      nama: dataform.nama ?? '',

      merk_tabung: dataform.merk_tabung ? Number(dataform.merk_tabung) : 0,
      tipe_tabung: dataform.tipe_tabung ?? '',
      no_seri_tabung: dataform.no_seri_tabung ?? '',

      tahun_produksi: dataform.tahun_produksi ? String(dataform.tahun_produksi) : '',
      pabrikan: dataform.pabrikan ?? '',

      aktivitas: dataform.aktivitas ?? '',
      sat_aktivitas: dataform.sat_aktivitas ? Number(dataform.sat_aktivitas) : 0,
      tgl_aktivitas: dataform.tgl_aktivitas ?? '',

      kv: dataform.kv ? Number(dataform.kv) : 0,
      sat_kv: dataform.sat_kv ? Number(dataform.sat_kv) : 0,
      ma: dataform.ma ? Number(dataform.ma) : 0,
      sat_ma: dataform.sat_ma ? Number(dataform.sat_ma) : 0,

      sifat: dataform.sifat ?? '',
      bentuk: dataform.bentuk ?? '',

      jumlah: dataform.jumlah ? Number(dataform.jumlah) : 0,
      sat_jumlah: dataform.sat_jumlah ? Number(dataform.sat_jumlah) : 0,

      status_sumber_id: dataform.status_sumber_id ? Number(dataform.status_sumber_id) : 0,
      ket_status: dataform.ket_status ?? '',

      fas_id: session?.user?.fas_id ?? 0,
      user_id: session?.user?.id ?? 0,
      flag_user: dataform.flag_user ? Number(dataform.flag_user) : 0,
      username: session?.user?.name ?? '',
      jadwal_id: dataform.jadwal_id ? Number(dataform.jadwal_id) : 0
    }

    try {
      setIsSubmitting(true)

      const result = await action(parsed)

      toast.success(result?.message || 'Data registrasi SRP berhasil disimpan.')

      router.push('/frontend/srp-registrasi')
    } catch (error) {
      console.error('Error submitting registrasi SRP:', error)

      let messageForToast = 'Terjadi kesalahan saat menyimpan data.'
      let fieldErrors = {}

      try {
        // coba parse JSON dari server action
        const parsedErr = JSON.parse(error.message)

        if (parsedErr?.type === 'validation' && parsedErr?.errors) {
          fieldErrors = parsedErr.errors
          messageForToast = flattenApiErrors(parsedErr.errors)
        } else if (parsedErr?.errors) {
          fieldErrors = parsedErr.errors
          messageForToast = flattenApiErrors(parsedErr.errors)
        } else {
          messageForToast = error.message || messageForToast
        }
      } catch (e) {
        // kalau message bukan JSON
        messageForToast = error.message || messageForToast
      }

      // tampilkan toast global
      toast.error(messageForToast)

      // mapping ke field react-hook-form (kalau nama field cocok)
      Object.entries(fieldErrors).forEach(([field, msgs]) => {
        if (field in defaultValues) {
          setError(field, {
            type: 'server',
            message: Array.isArray(msgs) ? msgs.join(', ') : String(msgs)
          })
        }
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      <ShadowBox>
        <form id='myForm' onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2} justifyContent='center'>
            <Grid size={10}>
              <Controller
                name='flag_kegiatan'
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <TextField
                    fullWidth
                    select
                    label='Kegiatan'
                    value={value}
                    onChange={onChange}
                    error={Boolean(errors.flag_kegiatan)}
                    helperText={errors.flag_kegiatan && 'This field is required'}
                  >
                    <MenuItem value='2'>Ekspor/Impor</MenuItem>
                    <MenuItem value='1'>Pemanfaatan</MenuItem>
                  </TextField>
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
            </Grid>
            <Grid size={5}>
              <Controller
                name='kat_sumber_id'
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <TextField
                    fullWidth
                    select
                    label='Kategori Sumber'
                    value={value}
                    onChange={onChange}
                    error={Boolean(errors.kat_sumber_id)}
                    helperText={errors.kat_sumber_id && 'This field is required'}
                  >
                    <MenuItem value='1'>Tunggal</MenuItem>
                    <MenuItem value='2'>Curah</MenuItem>
                  </TextField>
                )}
              />
            </Grid>

            <Grid size={5}>
              <Controller
                name='jenis_sumber_id'
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <TextField
                    fullWidth
                    select
                    label='Jenis Sumber'
                    value={value}
                    onChange={e => {
                      onChange(e)
                      setJenisSbr(Number(e.target.value) || '')
                    }}
                    error={Boolean(errors.jenis_sumber_id)}
                    helperText={errors.jenis_sumber_id && 'This field is required'}
                  >
                    <MenuItem value='1'>Pembangkit Radiasi Pengion</MenuItem>
                    <MenuItem value='2'>Zat Radioaktif</MenuItem>
                  </TextField>
                )}
              />
            </Grid>

            <Grid size={10}>
              <Controller
                name='model_sumber_id'
                control={control}
                render={({ field: { onChange, value } }) => (
                  <Autocomplete
                    options={optMerk}
                    getOptionLabel={option => option?.label ?? ''}
                    onChange={(e, data) => onChange(data?.value ?? null)}
                    value={optMerk.find(opt => opt.value === Number(value)) || null}
                    renderInput={params => <TextField {...params} label='Merk Unit' />}
                  />
                )}
              />
            </Grid>

            <Grid size={5}>
              <Controller
                name='tipe'
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <TextField
                    fullWidth
                    label='Tipe Unit'
                    value={value}
                    onChange={onChange}
                    error={Boolean(errors.tipe)}
                    helperText={errors.tipe && 'This field is required'}
                  />
                )}
              />
            </Grid>

            <Grid size={5}>
              <Controller
                name='no_seri'
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <TextField
                    fullWidth
                    label='No Seri Unit'
                    value={value}
                    onChange={onChange}
                    error={Boolean(errors.no_seri)}
                    helperText={errors.no_seri && 'This field is required'}
                  />
                )}
              />
            </Grid>

            <Grid size={5}>
              <Grid container spacing={2}>
                <Grid size={6}>
                  <Controller
                    name='aktivitas'
                    control={control}
                    render={({ field: { value, onChange } }) => (
                      <TextField fullWidth label='Aktivitas' value={value} onChange={onChange} />
                    )}
                  />
                </Grid>
                <Grid size={6}>
                  <Controller
                    name='sat_aktivitas'
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <Autocomplete
                        options={optSatuan}
                        getOptionLabel={option => option?.label ?? ''}
                        onChange={(e, data) => onChange(data?.value ?? null)}
                        value={optSatuan.find(opt => opt.value === Number(value)) || null}
                        renderInput={params => <TextField {...params} label='Satuan Aktivitas' />}
                      />
                    )}
                  />
                </Grid>
              </Grid>
            </Grid>

            <Grid size={5}>
              <Controller
                name='tgl_aktivitas'
                control={control}
                render={({ field: { value, onChange } }) => {
                  const formattedDate = value && value !== '0000-00-00' ? new Date(value) : null

                  return (
                    <AppReactDatepicker
                      dateFormat='yyyy-MM-dd'
                      selected={formattedDate}
                      showYearDropdown
                      showMonthDropdown
                      onChange={date => onChange(date ? date.toISOString().split('T')[0] : '')}
                      placeholderText='Tanggal Aktivitas'
                      customInput={
                        <TextField
                          fullWidth
                          value={formattedDate ? formattedDate.toISOString().split('T')[0] : ''}
                          onChange={e => {
                            const parsed = new Date(e.target.value)

                            if (!isNaN(parsed)) onChange(parsed.toISOString().split('T')[0])
                          }}
                        />
                      }
                    />
                  )
                }}
              />
            </Grid>

            <Grid size={5}>
              <Controller
                name='sifat'
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <TextField
                    fullWidth
                    select
                    label='Sifat'
                    value={value}
                    onChange={onChange}
                    error={Boolean(errors.sifat)}
                    helperText={errors.sifat && 'This field is required'}
                  >
                    <MenuItem value='Cair'>Cair</MenuItem>
                    <MenuItem value='Gas'>Gas</MenuItem>
                    <MenuItem value='Padat'>Padat</MenuItem>
                    <MenuItem value='Padat dan/atau Cair'>Padat dan/atau Cair</MenuItem>
                  </TextField>
                )}
              />
            </Grid>

            <Grid size={5}>
              <Controller
                name='bentuk'
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <TextField
                    fullWidth
                    select
                    label='Bentuk'
                    value={value}
                    onChange={onChange}
                    error={Boolean(errors.bentuk)}
                    helperText={errors.bentuk && 'This field is required'}
                  >
                    <MenuItem value='Terbuka'>Terbuka</MenuItem>
                    <MenuItem value='Terbungkus'>Terbungkus</MenuItem>
                  </TextField>
                )}
              />
            </Grid>

            {/* ====================== DATA TABUNG (hanya untuk jenisSbr === 1) ====================== */}
            {jenisSbr === 1 && (
              <Grid size={10}>
                <Box
                  sx={{
                    mt: 2,
                    mb: 1,
                    p: 2,
                    borderRadius: 2,
                    border: '1px solid',
                    borderColor: 'divider'
                  }}
                >
                  <Typography variant='subtitle1' fontWeight={600} gutterBottom>
                    Data Tabung
                  </Typography>

                  <Grid container spacing={2}>
                    <Grid size={12}>
                      <CustomAutocomplete
                        control={control}
                        errors={errors.merk_tabung}
                        name='merk_tabung'
                        label='Merk Tabung'
                        options={optMerk}
                        required={prpMandatori}
                      />
                    </Grid>

                    <Grid size={6}>
                      <Controller
                        name='tipe_tabung'
                        control={control}
                        rules={{ required: prpMandatori }}
                        render={({ field: { value, onChange } }) => (
                          <TextField
                            fullWidth
                            label='Tipe Tabung'
                            value={value}
                            onChange={onChange}
                            error={Boolean(errors.tipe_tabung)}
                            helperText={errors.tipe_tabung && 'This field is required'}
                          />
                        )}
                      />
                    </Grid>

                    <Grid size={6}>
                      <Controller
                        name='no_seri_tabung'
                        control={control}
                        rules={{ required: prpMandatori }}
                        render={({ field: { value, onChange } }) => (
                          <TextField
                            fullWidth
                            label='No Seri Tabung'
                            value={value}
                            onChange={onChange}
                            error={Boolean(errors.no_seri_tabung)}
                            helperText={errors.no_seri_tabung && 'This field is required'}
                          />
                        )}
                      />
                    </Grid>

                    <Grid size={6}>
                      <Grid container spacing={2}>
                        <Grid size={6}>
                          <Controller
                            name='ma'
                            rules={{ required: prpMandatori }}
                            control={control}
                            render={({ field: { value, onChange } }) => (
                              <TextField
                                fullWidth
                                label='ma'
                                value={value}
                                onChange={onChange}
                                error={Boolean(errors.ma)}
                                helperText={errors.ma && 'This field is required'}
                              />
                            )}
                          />
                        </Grid>
                        <Grid size={6}>
                          <Controller
                            name='sat_ma'
                            control={control}
                            rules={{ required: prpMandatori ? 'This field is required' : false }}
                            render={({ field: { onChange, value }, fieldState: { error } }) => (
                              <Autocomplete
                                options={optSatuan}
                                getOptionLabel={option => option?.label ?? ''}
                                onChange={(e, data) => onChange(data?.value ?? null)}
                                value={optSatuan.find(opt => opt.value === Number(value)) || null}
                                renderInput={params => (
                                  <TextField
                                    {...params}
                                    label='Satuan Ma'
                                    required={prpMandatori}
                                    error={!!error}
                                    helperText={error?.message || ''}
                                  />
                                )}
                              />
                            )}
                          />
                        </Grid>
                      </Grid>
                    </Grid>

                    <Grid size={6}>
                      <Grid container spacing={2}>
                        <Grid size={6}>
                          <Controller
                            name='kv'
                            rules={{ required: prpMandatori }}
                            control={control}
                            render={({ field: { value, onChange } }) => (
                              <TextField
                                fullWidth
                                label='kv'
                                value={value}
                                onChange={onChange}
                                error={Boolean(errors.kv)}
                                helperText={errors.kv && 'This field is required'}
                              />
                            )}
                          />
                        </Grid>
                        <Grid size={6}>
                          <Controller
                            name='sat_kv'
                            control={control}
                            rules={{ required: prpMandatori ? 'This field is required' : false }}
                            render={({ field: { onChange, value }, fieldState: { error } }) => (
                              <Autocomplete
                                options={optSatuan}
                                getOptionLabel={option => option?.label ?? ''}
                                onChange={(e, data) => onChange(data?.value ?? null)}
                                value={optSatuan.find(opt => opt.value === Number(value)) || null}
                                renderInput={params => (
                                  <TextField
                                    {...params}
                                    label='Satuan Kv'
                                    required={prpMandatori}
                                    error={!!error}
                                    helperText={error?.message || ''}
                                  />
                                )}
                              />
                            )}
                          />
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Box>
              </Grid>
            )}

            <Grid size={5}>
              <Controller
                name='pabrikan'
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <TextField
                    fullWidth
                    label='Pabrikan'
                    value={value}
                    onChange={onChange}
                    error={Boolean(errors.pabrikan)}
                    helperText={errors.pabrikan && 'This field is required'}
                  />
                )}
              />
            </Grid>

            <Grid size={5}>
              <Controller
                name='tahun_produksi'
                control={control}
                render={({ field: { value, onChange } }) => (
                  <TextField
                    fullWidth
                    label='Tahun Produksi'
                    value={value}
                    onChange={onChange}
                    error={Boolean(errors.tahun_produksi)}
                    helperText={errors.tahun_produksi && 'This field is required'}
                  />
                )}
              />
            </Grid>

            <Grid size={10}>
              <Button type='submit' variant='contained' sx={{ float: 'right' }} disabled={isSubmitting}>
                {isSubmitting ? 'Submitting...' : 'Submit'}
              </Button>
            </Grid>
          </Grid>
        </form>
      </ShadowBox>
    </>
  )
}

export default FormSrpReg
