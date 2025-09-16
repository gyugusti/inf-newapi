'use client'
import { useRouter, useSearchParams } from 'next/navigation'

import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Grid from '@mui/material/Grid2'


import Button from '@mui/material/Button'
import { useForm, Controller } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'

import CustomBreadcrumb from '@/components/widget/CustomBreadcrumb'
import CustomTextField from '@/@core/components/mui/TextField'
import { createInkf, editInkf } from '@/redux-store/admin-referensi/inkf'

const breadcrumbs = [
  { name: 'Referensi', path: '/admin-referensi' },
  { name: 'IKF', path: '/admin-referensi/inkf' },
  { name: 'Buat IKF' }
]

const Form = () => {
  const dispatch = useDispatch()
  const router = useRouter()
  const searchParams = useSearchParams() // Get query params
  const nama = searchParams.get('nama') || ''
  const uraian = searchParams.get('uraian') || ''
  const bobot = searchParams.get('bobot') || ''
  const { isEditing, inkf_id } = useSelector(store => store.inkf)

  const defaultValues = {
    uraian: uraian,
    nama: nama,
    bobot: bobot
  }

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({ defaultValues })

  const onSubmit = dataform => {
    if (nama) {
      dispatch(editInkf({ inkf_id: inkf_id, dataform }))
    } else {
      dispatch(createInkf(dataform))
    }

    router.push('/admin-referensi/inkf')
  }

  return (
    <>
      <CustomBreadcrumb breadcrumbs={breadcrumbs} />
      <Card>
        <CardHeader title='Form IKF' />
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={5}>
              <Grid size={{ xs: 12, md: 8, sm: 8 }}>
                <Controller
                  name='nama'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <CustomTextField
                      fullWidth
                      value={value}
                      label='Nama'
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

              <Grid size={{ xs: 12, md: 8, sm: 8 }}>
                <Controller
                  name='uraian'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <CustomTextField
                      fullWidth
                      value={value}
                      label='Uraian'
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

              <Grid size={{ xs: 12, md: 8, sm: 8 }}>
                <Controller
                  name='bobot'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <CustomTextField
                      fullWidth
                      value={value}
                      label='bobot'
                      type='number'
                      onChange={onChange}
                      placeholder=''
                      error={Boolean(errors.bobot)}
                      aria-describedby='validation-basic-first-name'
                      {...(errors.bobot && {
                        helperText: 'This field is required'
                      })}
                    />
                  )}
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

Form.acl = {
  action: 'all',
  subject: 'bptn-page'
}

export default Form
