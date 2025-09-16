'use client'

import { useRouter } from 'next/navigation'

import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Grid from '@mui/material/Grid2'


import Button from '@mui/material/Button'
import { useForm, Controller } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'

import CustomBreadcrumb from '@/components/widget/CustomBreadcrumb'
import CustomTextField from '@/@core/components/mui/TextField'
import { createlkfJenisTabel, editlkfJenisTabel } from '@/redux-store/admin-referensi/lkf-jenis-tabel'

const breadcrumbs = [
  { name: 'Referensi', path: '/admin-referensi' },
  { name: 'LKF Jenis Tabel', path: '/admin-referensi/lkf-jenis-tabel' },
  { name: 'Buat Tabel' }
]

const Form = () => {
  const dispatch = useDispatch()
  const router = useRouter()

  const { isEditing, jenis_tabel_id, nama_tabel, keterangan } = useSelector(store => store.lkfJenisTabel)

  const defaultValues = {
    nama_tabel: nama_tabel,
    keterangan: keterangan
  }

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({ defaultValues })

  const onSubmit = dataform => {
    if (isEditing) {
      dispatch(editlkfJenisTabel({ jenis_tabel_id: jenis_tabel_id, dataform }))
    } else {
      dispatch(createlkfJenisTabel(dataform))
    }

    router.push('/admin-referensi/lkf-jenis-tabel')
  }

  return (
    <>
      <CustomBreadcrumb breadcrumbs={breadcrumbs} />
      <Card>
        <CardHeader title='Form Jenis Tabel' />
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={5}>
              <Grid size={{ xs: 12, sm: 8 }}>
                <Controller
                  name='nama_tabel'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <CustomTextField
                      fullWidth
                      value={value}
                      label='Nama Tabel'
                      onChange={onChange}
                      placeholder=''
                      error={Boolean(errors.nama_tabel)}
                      aria-describedby='validation-basic-first-name'
                      {...(errors.nama_tabel && {
                        helperText: 'This field is required'
                      })}
                    />
                  )}
                />
              </Grid>

              <Grid size={{ xs: 12, sm: 8 }}>
                <Controller
                  name='keterangan'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <CustomTextField
                      fullWidth
                      value={value}
                      label='Keterangan'
                      onChange={onChange}
                      placeholder=''
                      error={Boolean(errors.keterangan)}
                      aria-describedby='validation-basic-first-name'
                      {...(errors.keterangan && {
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
  action: 'read',
  subject: 'admin-page'
}

export default Form
