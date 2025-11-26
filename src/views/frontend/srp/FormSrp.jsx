'use client'

import { useEffect, useMemo, useState } from 'react'

import { useRouter, useSearchParams } from 'next/navigation'

import { useSession } from 'next-auth/react'
import { Controller, useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'

import {
  Autocomplete,
  Button,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  MenuItem,
  Switch,
  TextField,
  Typography
} from '@mui/material'
import Grid from '@mui/material/Grid2'

import ShadowBox from '@/components/styles/ShadowBox'
import CustomAutocomplete from '@/components/widget/CustomAutocomplete'
import AppReactDatepicker from '@/libs/styles/AppReactDatepicker'
import { getModelSumber, getSatuan } from '@/redux-store/referensi-balis'
import { updateSumber } from '@/redux-store/validasi-data'

const FormSrp = ({ data }) => {
  const searchParams = useSearchParams()
  const dispatch = useDispatch()
  const router = useRouter()
  const { data: session } = useSession()
  const id = searchParams.get('id')

  const { dafSatuan, dafModelSumber } = useSelector(state => state.refbalis)
  const { tab } = useSelector(state => state.validasiData)

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
    satuan_id: getSP('satuan_id'),
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
    tahun_produksi: getSP('tahun_produksi')
  }

  const {
    control,
    setValue,
    handleSubmit,
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
    const keys = Object.keys(defaultValues)

    keys.forEach(k => setValue(k, getSP(k)))
    setJenisSbr(getSP('jenis_sumber_id') ? Number(getSP('jenis_sumber_id')) : '')
  }, [searchParams])

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

  const onSubmit = dataform => {
    // Coerce tipe data seperlunya
    const parsed = {
      ...dataform,

      // angka
      jenis_sumber_id: dataform.jenis_sumber_id ? Number(dataform.jenis_sumber_id) : null,
      kat_sumber_id: dataform.kat_sumber_id ? Number(dataform.kat_sumber_id) : null,
      model_sumber_id: dataform.model_sumber_id ? Number(dataform.model_sumber_id) : null,
      satuan_id: dataform.satuan_id ? Number(dataform.satuan_id) : null,
      status_sumber_id: dataform.status_sumber_id ? Number(dataform.status_sumber_id) : 0,
      jumlah: dataform.jumlah ? Number(dataform.jumlah) : null,
      kv: dataform.kv ? Number(dataform.kv) : null,
      ma: dataform.ma ? Number(dataform.ma) : null,
      tahun_produksi: dataform.tahun_produksi ? String(dataform.tahun_produksi) : '',

      username: session?.user?.name || '',
      user_id: session?.user?.id || ''
    }

    dispatch(updateSumber({ id, dataforms: parsed }))

    router.push(`/sensus-srp/${id}?tab=${tab}`)
  }

  const breadcrumbs = [{ name: 'Sensus Sumber', path: `/sensus-srp/${id}` }, { name: 'Form Sensus Sumber' }]

  return (
    <>
      <ShadowBox>
        <form id='myForm' onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2} justifyContent='center'>
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
                    value={optMerk.find(opt => opt.value === value) || null}
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
                    name='satuan_id'
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <Autocomplete
                        options={optSatuan}
                        getOptionLabel={option => option?.label ?? ''}
                        onChange={(e, data) => onChange(data?.value ?? null)}
                        value={optSatuan.find(opt => opt.value === value) || null}
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

            <Grid size={10}>
              <CustomAutocomplete
                control={control}
                errors={errors.merk_tabung}
                name='merk_tabung'
                label='Merk Tabung'
                options={optMerk}
                required={prpMandatori}
              />
            </Grid>

            <Grid size={5}>
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

            <Grid size={5}>
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

            <Grid size={5}>
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
                    rules={{ required: prpMandatori }}
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <Autocomplete
                        options={optSatuan}
                        getOptionLabel={option => option?.label ?? ''}
                        onChange={(e, data) => onChange(data?.value ?? null)}
                        value={optSatuan.find(opt => opt.value === value) || null}
                        renderInput={params => <TextField {...params} label='Satuan Ma' />}
                      />
                    )}
                  />
                </Grid>
              </Grid>
            </Grid>

            <Grid size={5}>
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
                    rules={{ required: prpMandatori }}
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <Autocomplete
                        options={optSatuan}
                        getOptionLabel={option => option?.label ?? ''}
                        onChange={(e, data) => onChange(data?.value ?? null)}
                        value={optSatuan.find(opt => opt.value === value) || null}
                        renderInput={params => <TextField {...params} label='Satuan Kv' />}
                      />
                    )}
                  />
                </Grid>
              </Grid>
            </Grid>

            <Grid size={5}>
              <Grid container spacing={2}>
                <Grid size={6}>
                  <Controller
                    name='jumlah'
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { value, onChange } }) => (
                      <TextField
                        fullWidth
                        label='Jumlah'
                        value={value}
                        onChange={onChange}
                        error={Boolean(errors.jumlah)}
                        helperText={errors.jumlah && 'This field is required'}
                      />
                    )}
                  />
                </Grid>
                <Grid size={6}>
                  <Controller
                    name='sat_jumlah'
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <Autocomplete
                        options={optSatuan}
                        getOptionLabel={option => option?.label ?? ''}
                        onChange={(e, data) => onChange(data?.value ?? null)}
                        value={optSatuan.find(opt => opt.value === value) || null}
                        renderInput={params => <TextField {...params} label='Satuan Jumlah' />}
                      />
                    )}
                  />
                </Grid>
              </Grid>
            </Grid>

            <Grid size={5}>
              <Controller
                name='status_sumber_id'
                control={control}
                render={({ field: { value, onChange } }) => {
                  const checked = String(value) === '1'

                  return (
                    <FormControl component='fieldset' variant='standard'>
                      <FormLabel component='legend'>Status Sumber</FormLabel>
                      <FormGroup>
                        <FormControlLabel
                          control={
                            <Switch
                              checked={checked}
                              onChange={e => onChange(e.target.checked ? 1 : 0)}
                              color='primary'
                            />
                          }
                          label={<Typography>{checked ? 'ON' : 'OFF'}</Typography>}
                        />
                      </FormGroup>
                    </FormControl>
                  )
                }}
              />
            </Grid>

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
              <Controller
                name='ket_status'
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <TextField
                    fullWidth
                    multiline
                    maxRows={4}
                    label='Keterangan Status'
                    value={value}
                    onChange={onChange}
                    error={Boolean(errors.ket_status)}
                    helperText={errors.ket_status && 'This field is required'}
                  />
                )}
              />
            </Grid>

            <Grid size={10}>
              <Button type='submit' variant='contained' sx={{ float: 'right' }}>
                Submit
              </Button>
            </Grid>
          </Grid>
        </form>
      </ShadowBox>
    </>
  )
}

export default FormSrp
