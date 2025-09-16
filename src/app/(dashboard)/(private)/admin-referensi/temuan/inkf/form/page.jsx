'use client'
import { Fragment } from 'react'

import { useParams, useRouter, useSearchParams } from 'next/navigation'

import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Grid from '@mui/material/Grid2'

import MenuItem from '@mui/material/MenuItem'

import Button from '@mui/material/Button'
import { useForm, Controller } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'

import CustomBreadcrumb from '@/components/widget/CustomBreadcrumb'
import CustomTextField from '@/@core/components/mui/TextField'
import { createItemLib, editItemLib } from '@/redux-store/admin-referensi/temuan'


const breadcrumbs = [
  { name: 'Referensi', path: '/admin-referensi' },
  { name: 'Library Temuan', path: '/admin-referensi/temuan' },
  { name: 'Temuan Item' }
]

const Form = () => {
  const dispatch = useDispatch()
  const router = useRouter()

  const params = useParams()
  const searchParams = useSearchParams()
  const inkf_id = searchParams.get('inkf_id') || ''
  const nama = searchParams.get('nama') || ''
  const temuan_id = searchParams.get('temuan_id') || ''

  const defaultValues = {
    nama_temuan: searchParams.get('nama_temuan') || '',
    kode_temuan: searchParams.get('kode_temuan') || '',
    urut_temuan: searchParams.get('urut_temuan') || '',
    rekomendasi: searchParams.get('rekomendasi') || '',
    rekomendasi_sphi: searchParams.get('rekomendasi_sphi') || '',
    ket_temuan: searchParams.get('ket_temuan') || '',
    level_id: searchParams.get('level_id') || '',
    inkf_id: searchParams.get('inkf_id') || ''
  }

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({ defaultValues })

  const onSubmit = dataform => {
    if (temuan_id) {
      dispatch(editItemLib({ temuan_id: temuan_id, dataform }))
    } else {
      const data = { ...dataform, inkf_id: inkf_id }

      dispatch(createItemLib(data))
    }

    const queryParams = {
      inkf_id: inkf_id,
      nama: nama
    }

    const queryString = new URLSearchParams(queryParams).toString()

    router.push(`/admin-referensi/temuan/inkf?${queryString}`)
  }

  return (
    <Fragment>
      <CustomBreadcrumb breadcrumbs={breadcrumbs} />
      <Card>
        <CardHeader title='Form Input Temuan Item' />
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={5}>
              <Grid size={{ xs: 12, md: 8, sm: 8 }}>
                <Controller
                  name='level_id'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <CustomTextField
                      select
                      fullWidth
                      defaultValue=''
                      label='Kategori'
                      SelectProps={{
                        value: value,
                        onChange: e => onChange(e)
                      }}
                      id='validation-basic-select'
                      error={Boolean(errors.select)}
                      aria-describedby='validation-basic-select'
                      {...(errors.select && { helperText: 'This field is required' })}
                    >
                      <MenuItem value='1'>I</MenuItem>
                      <MenuItem value='2'>II</MenuItem>
                      <MenuItem value='3'>III</MenuItem>
                      <MenuItem value='4'>??</MenuItem>
                    </CustomTextField>
                  )}
                />
              </Grid>
              <Grid size={{ xs: 12, md: 8, sm: 8 }}>
                <Controller
                  name='nama_temuan'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <CustomTextField
                      fullWidth
                      value={value}
                      label='Nama Temuan'
                      onChange={onChange}
                      placeholder=''
                      error={Boolean(errors.nama_temuan)}
                      aria-describedby='validation-basic-first-name'
                      {...(errors.nama_temuan && {
                        helperText: 'This field is required'
                      })}
                    />
                  )}
                />
              </Grid>

              <Grid size={{ xs: 12, md: 8, sm: 8 }}>
                <Controller
                  name='kode_temuan'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <CustomTextField
                      fullWidth
                      value={value}
                      label='Kode temuan'
                      onChange={onChange}
                      placeholder=''
                      error={Boolean(errors.kode_temuan)}
                      aria-describedby='validation-basic-first-name'
                      {...(errors.kode_temuan && {
                        helperText: 'This field is required'
                      })}
                    />
                  )}
                />
              </Grid>
              <Grid size={{ xs: 12, md: 8, sm: 8 }}>
                <Controller
                  name='urut_temuan'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <CustomTextField
                      fullWidth
                      value={value}
                      label='Urutan Temuan'
                      type='number'
                      onChange={onChange}
                      placeholder=''
                      error={Boolean(errors.urut_temuan)}
                      aria-describedby='validation-basic-first-name'
                      {...(errors.urut_temuan && {
                        helperText: 'This field is required'
                      })}
                    />
                  )}
                />
              </Grid>
              <Grid size={{ xs: 12, md: 8, sm: 8 }}>
                <Controller
                  name='rekomendasi'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <CustomTextField
                      fullWidth
                      value={value}
                      label='Rekomendasi'
                      onChange={onChange}
                      placeholder=''
                      error={Boolean(errors.rekomendasi)}
                      aria-describedby='validation-basic-first-name'
                      {...(errors.rekomendasi && {
                        helperText: 'This field is required'
                      })}
                    />
                  )}
                />
              </Grid>
              <Grid size={{ xs: 12, md: 8, sm: 8 }}>
                <Controller
                  name='rekomendasi_sphi'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <CustomTextField
                      fullWidth
                      value={value}
                      label='Rekomendasi SPHI'
                      onChange={onChange}
                      placeholder=''
                      error={Boolean(errors.rekomendasi_sphi)}
                      aria-describedby='validation-basic-first-name'
                      {...(errors.rekomendasi_sphi && {
                        helperText: 'This field is required'
                      })}
                    />
                  )}
                />
              </Grid>
              <Grid size={{ xs: 12, md: 8, sm: 8 }}>
                <Controller
                  name='ket_temuan'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <CustomTextField
                      fullWidth
                      value={value}
                      label='Keterangan'
                      onChange={onChange}
                      placeholder=''
                      error={Boolean(errors.ket_temuan)}
                      aria-describedby='validation-basic-first-name'
                      {...(errors.ket_temuan && {
                        helperText: 'This field is required'
                      })}
                    />
                  )}
                />
              </Grid>
              <Grid size={{ xs: 12, md: 8, sm: 8 }}>
                <Button type='submit' variant='contained'>
                  Submit
                </Button>
              </Grid>
            </Grid>
          </form>
        </CardContent>
      </Card>
    </Fragment>
  )
}

Form.acl = {
  action: 'read',
  subject: 'admin-page'
}

export default Form
