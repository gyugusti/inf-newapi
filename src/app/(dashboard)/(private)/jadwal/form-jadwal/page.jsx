'use client'

import { forwardRef, useEffect } from 'react'

import { useParams, useRouter, useSearchParams } from 'next/navigation'

import { useDispatch, useSelector } from 'react-redux'
import { useForm, Controller } from 'react-hook-form'
import { useSession } from 'next-auth/react'
import { format } from 'date-fns'

import { Button, Card, CardContent, CardHeader, Select, MenuItem } from '@mui/material'
import Grid from '@mui/material/Grid2'

import CustomAutocomplete from '@/components/widget/CustomAutocomplete'
import CustomTextField from '@/@core/components/mui/TextField'
import CustomBreadcrumb from '@/components/widget/CustomBreadcrumb'
import AppReactDatepicker from '@/libs/styles/AppReactDatepicker'

import { getBidang, getListUser, getPropinsi } from '@/redux-store/referensi-balis'
import { createJadwal, editJadwal, setStatus } from '@/redux-store/jadwal'

const CustomInput = forwardRef(({ ...props }, ref) => {
  return <CustomTextField fullWidth inputRef={ref} {...props} sx={{ width: '100%' }} />
})

const breadcrumbs = [{ name: 'Jadwal', path: '/jadwal' }, { name: 'Form Jadwal' }]

const FormJadwal = () => {
  const dispatch = useDispatch()
  const router = useRouter()
  const params = useParams()
  const searchParams = useSearchParams()
  const { data: session } = useSession()
  const kode_area = searchParams.get('kode_area') || ''
  const jadwal_id = searchParams.get('jadwal_id') || ''

  const { propinsi, bidang, listUser } = useSelector(store => store.refbalis)

  useEffect(() => {
    dispatch(getPropinsi())
    dispatch(getBidang())
    dispatch(getListUser())
  }, [dispatch])

  let defaultValues = {
    kode_area: kode_area,
    propinsi_id: searchParams.get('propinsi_id') || '',
    bidang_id: searchParams.get('bidang_id') || '',
    user_id_pj: searchParams.get('user_id_pj') || '',
    tgl_akhir: searchParams.get('tgl_akhir') || '',
    tgl_mulai: searchParams.get('tgl_mulai') || '',
    hari: searchParams.get('hari') || '',
    nama_kontak: searchParams.get('nama_kontak') || '',
    telp_kontak: searchParams.get('telp_kontak') || '',
    batas_konfirmasi_insp: searchParams.get('batas_konfirmasi_insp') || '',
    batas_konfirmasi_fas: searchParams.get('batas_konfirmasi_fas') || ''
  }

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({ defaultValues })

  const onSubmit = dataform => {
    const data = {
      ...dataform,
      bidang_id: dataform.bidang_id,
      propinsi_id: dataform.propinsi_id,
      user_id_pj: dataform.user_id_pj,
      tgl_mulai: format(new Date(dataform.tgl_mulai), 'yyyy-MM-dd'),
      tgl_akhir: format(new Date(dataform.tgl_akhir), 'yyyy-MM-dd'),
      batas_konfirmasi_insp: format(new Date(dataform.batas_konfirmasi_insp), 'yyyy-MM-dd'),
      batas_konfirmasi_fas: format(new Date(dataform.batas_konfirmasi_fas), 'yyyy-MM-dd'),
      user_input: session?.user?.id
    }

    if (kode_area) {
      dispatch(editJadwal({ jadwal_id: jadwal_id, data }))
    } else {
      dispatch(createJadwal(data))
    }

    router.push('/jadwal')
  }

  return (
    <>
      <CustomBreadcrumb breadcrumbs={breadcrumbs} />
      <Card>
        <CardHeader title='Form Jadwal' />
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={5}>
              <Grid size={{ xs: 12, md: 12, sm: 12 }}>
                <Controller
                  name='kode_area'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <CustomTextField
                      fullWidth
                      value={value}
                      label='Kode Area'
                      onChange={onChange}
                      placeholder=''
                      error={Boolean(errors.kode_area)}
                      aria-describedby='validation-basic-first-name'
                      {...(errors.kode_area && {
                        helperText: 'This field is required'
                      })}
                    />
                  )}
                />
              </Grid>
              <Grid size={{ xs: 12, md: 12, sm: 12 }}>
                <Grid container spacing={2}>
                  <Grid sm={6} size={{ sm: 6 }}>
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
                  <Grid size={{ sm: 6 }}>
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
              <Grid size={{ xs: 12, md: 12, sm: 12 }}>
                <Controller
                  name='hari'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <CustomTextField
                      fullWidth
                      value={value}
                      label='Jumlah Hari'
                      type='number'
                      onChange={onChange}
                      placeholder=''
                      error={Boolean(errors.hari)}
                      aria-describedby='validation-basic-first-name'
                      {...(errors.hari && {
                        helperText: 'This field is required'
                      })}
                    />
                  )}
                />
              </Grid>
              <Grid size={{ xs: 12, md: 12, sm: 12 }}>
                <Controller
                  name='nama_kontak'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <CustomTextField
                      fullWidth
                      value={value}
                      label='Nama Kontak'
                      onChange={onChange}
                      placeholder=''
                      error={Boolean(errors.nama_kontak)}
                      aria-describedby='validation-basic-first-name'
                      {...(errors.nama_kontak && {
                        helperText: 'This field is required'
                      })}
                    />
                  )}
                />
              </Grid>
              <Grid size={{ xs: 12, md: 12, sm: 12 }}>
                <Controller
                  name='telp_kontak'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <CustomTextField
                      fullWidth
                      value={value}
                      label='Telp. Kontak'
                      type='number'
                      onChange={onChange}
                      placeholder=''
                      error={Boolean(errors.telp_kontak)}
                      aria-describedby='validation-basic-first-name'
                      {...(errors.telp_kontak && {
                        helperText: 'This field is required'
                      })}
                    />
                  )}
                />
              </Grid>
              <Grid size={{ xs: 12, md: 12, sm: 12 }}>
                <Controller
                  name='bidang_id'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <CustomTextField
                      select
                      fullWidth
                      defaultValue=''
                      label='Bidang'
                      SelectProps={{
                        value: value,
                        onChange: e => onChange(e)
                      }}
                      id='validation-basic-select'
                      error={Boolean(errors.bidang_id)}
                      aria-describedby='validation-basic-select'
                      {...(errors.bidang_id && { helperText: 'This field is required' })}
                    >
                      {bidang.map((item, index) => {
                        const { bidang_id, nama } = item

                        return (
                          <MenuItem key={index} value={bidang_id}>
                            {nama}
                          </MenuItem>
                        )
                      })}
                    </CustomTextField>
                  )}
                />
              </Grid>
              <Grid size={{ xs: 12, md: 12, sm: 12 }}>
                <CustomAutocomplete
                  control={control}
                  errors={errors.propinsi_id}
                  name='propinsi_id'
                  label='Propinsi'
                  options={propinsi}
                />
              </Grid>
              <Grid size={{ xs: 12, md: 12, sm: 12 }}>
                <CustomAutocomplete
                  control={control}
                  errors={errors.user_id_pj}
                  name='user_id_pj'
                  label='Penanggung Jawab'
                  options={listUser}
                />
              </Grid>
              <Grid size={{ xs: 12, md: 12, sm: 12 }}>
                <Controller
                  name='batas_konfirmasi_insp'
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
                            label='Batas Waktu Konf. Inspektur'
                            error={Boolean(errors.batas_konfirmasi_insp)}
                            aria-describedby='validation-basic-dob'
                          />
                        }
                      />
                    )
                  }}
                />
              </Grid>

              <Grid size={{ xs: 12, md: 12, sm: 12 }}>
                <Controller
                  name='batas_konfirmasi_fas'
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
                            label='Batas Waktu Konf. Instansi'
                            error={Boolean(errors.batas_konfirmasi_fas)}
                            aria-describedby='validation-basic-dob'
                          />
                        }
                      />
                    )
                  }}
                />
              </Grid>

              <Grid size={{ xs: 12 }}>
                <Button type='submit' variant='contained'>
                  Submit
                </Button>
              </Grid>
            </Grid>
          </form>
        </CardContent>
      </Card>
    </>
  )
}

FormJadwal.acl = {
  action: 'read',
  subject: 'verif-page'
}

export default FormJadwal
