'use client'

// ** React Imports
import { forwardRef, useEffect, useState } from 'react'

import { useRouter, useSearchParams } from 'next/navigation'

import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid2'
import Button from '@mui/material/Button'
import Radio from '@mui/material/Radio'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import FormLabel from '@mui/material/FormLabel'
import FormControl from '@mui/material/FormControl'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormHelperText from '@mui/material/FormHelperText'
import RadioGroup from '@mui/material/RadioGroup'

import { format } from 'date-fns/format'
import DatePicker from 'react-datepicker'
import { useForm, Controller } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'

import CustomTextField from '@/@core/components/mui/TextField'
import { createJenjang, editJenjang } from '@/redux-store/admin-referensi/kategori-jenjang'
import CustomBreadcrumb from '@/components/widget/CustomBreadcrumb'
import AppReactDatepicker from '@/libs/styles/AppReactDatepicker'

// ** Icon Imports

const CreateJenjang = () => {
  const dispatch = useDispatch()
  const router = useRouter()
  const query = router.query
  const searchParams = useSearchParams()
  const insp_jenjang_id = searchParams.get('insp_jenjang_id') || ''
  const [startDate, setStartDate] = useState(new Date())

  const { isEditing, nama, ket_jenjang, urutan, tahun, tugas, status_id, is_inspektur } = useSelector(
    store => store.kategoriJenjang
  )

  const defaultValues = {
    nama: searchParams.get('nama') || '',
    ket_jenjang: searchParams.get('ket_jenjang') || '',
    urutan: searchParams.get('urutan') || '',
    tahun: searchParams.get('tahun') || '',
    tugas: searchParams.get('tugas') || '',
    status_id: searchParams.get('status_id') || '',
    is_inspektur: searchParams.get('is_inspektur') || ''
  }

  // ** Hooks
  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({ defaultValues })

  const onSubmit = dataform => {
    dataform = {
      ...dataform,
      tahun: format(startDate, 'yyyy')
    }

    if (isEditing) {
      dispatch(editJenjang({ insp_jenjang_id: insp_jenjang_id, dataform }))
    } else {
      dispatch(createJenjang(dataform))
    }

    const queryParams = new URLSearchParams({ tab: 'jenjang' }).toString()

    router.push(`/admin-referensi/kategori-jenjang?${queryParams}`)
  }

  const CustomInput = forwardRef(({ ...props }, ref) => {
    return <CustomTextField fullWidth inputRef={ref} {...props} sx={{ width: '100%' }} />
  })

  const breadcrumbs = [{ name: 'Referensi', path: '/admin-referensi' }, { name: 'Buat Kategori' }]

  return (
    <>
      <CustomBreadcrumb breadcrumbs={breadcrumbs} />
      <Card>
        <CardHeader title='Form Input Jenjang' />
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={5}>
              <Grid size={{ xs: 12, sm: 8 }}>
                <Controller
                  name='nama'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <CustomTextField
                      fullWidth
                      value={value}
                      label='Nama Jenjang'
                      onChange={onChange}
                      placeholder=''
                      error={Boolean(errors.nama)}
                      aria-describedby='validation-basic-first-name'
                      {...(errors.nama && {
                        helperText: 'This field is required'
                      })}
                    />
                  )}
                />
              </Grid>

              <Grid size={{ xs: 12, sm: 8 }}>
                <Controller
                  name='ket_jenjang'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <CustomTextField
                      fullWidth
                      value={value}
                      label='Nama English'
                      onChange={onChange}
                      placeholder=''
                      error={Boolean(errors.nama)}
                      aria-describedby='validation-basic-first-name'
                      {...(errors.nama && {
                        helperText: 'This field is required'
                      })}
                    />
                  )}
                />
              </Grid>

              <Grid size={{ xs: 12, sm: 6 }}>
                <Controller
                  name='tahun'
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
                          label='Date Of Birth'
                          {...(errors.tahun && { error: true, helperText: 'This field is required.' })}
                        />
                      }
                    />
                  )}
                />
              </Grid>

              <Grid size={{ xs: 12, sm: 8 }}>
                <Controller
                  name='urutan'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <CustomTextField
                      value={value}
                      label='Urutan'
                      onChange={onChange}
                      placeholder=''
                      error={Boolean(errors.urutan)}
                      aria-describedby='validation-basic-first-name'
                      {...(errors.nama && {
                        helperText: 'This field is required'
                      })}
                    />
                  )}
                />
              </Grid>

              <Grid size={{ xs: 12, sm: 8 }}>
                <Controller
                  name='tugas'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <CustomTextField
                      rows={4}
                      fullWidth
                      multiline
                      value={value}
                      label='Uraian Tugas'
                      onChange={onChange}
                      placeholder=''
                      error={Boolean(errors.ket_jenjang)}
                      aria-describedby='validation-basic-first-name'
                      {...(errors.nama && {
                        helperText: 'This field is required'
                      })}
                    />
                  )}
                />
              </Grid>

              <Grid size={{ xs: 12 }}>
                <FormControl error={Boolean(errors.radio)}>
                  <FormLabel>Status</FormLabel>
                  <Controller
                    name='status_id'
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => (
                      <RadioGroup row {...field} aria-label='gender' name='validation-basic-radio'>
                        <FormControlLabel
                          value='1'
                          label='Aktif'
                          sx={errors.status_id ? { color: 'error.main' } : null}
                          control={<Radio sx={errors.status_id ? { color: 'error.main' } : null} />}
                        />
                        <FormControlLabel
                          value='0'
                          label='Non Aktif'
                          sx={errors.status_id ? { color: 'error.main' } : null}
                          control={<Radio sx={errors.status_id ? { color: 'error.main' } : null} />}
                        />
                      </RadioGroup>
                    )}
                  />
                  {errors.radio && (
                    <FormHelperText
                      id='validation-basic-radio'
                      sx={{
                        mx: 0,
                        color: 'error.main',
                        fontSize: theme => theme.typography.body2.fontSize
                      }}
                    >
                      This field is required
                    </FormHelperText>
                  )}
                </FormControl>
              </Grid>

              <Grid size={{ xs: 12 }}>
                <FormControl error={Boolean(errors.radio)}>
                  <FormLabel>Status</FormLabel>
                  <Controller
                    name='is_inspektur'
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => (
                      <RadioGroup row {...field} aria-label='gender' name='validation-basic-radio'>
                        <FormControlLabel
                          value='1'
                          label='Ya'
                          sx={errors.is_inspektur ? { color: 'error.main' } : null}
                          control={<Radio sx={errors.is_inspektur ? { color: 'error.main' } : null} />}
                        />
                        <FormControlLabel
                          value='0'
                          label='Tidak'
                          sx={errors.is_inspektur ? { color: 'error.main' } : null}
                          control={<Radio sx={errors.is_inspektur ? { color: 'error.main' } : null} />}
                        />
                      </RadioGroup>
                    )}
                  />
                </FormControl>
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

CreateJenjang.acl = {
  action: 'read',
  subject: 'admin-page'
}

export default CreateJenjang
