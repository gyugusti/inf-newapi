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
import { createSyaratItem, editsyaratItem } from '@/redux-store/admin-referensi/syarat-item'

const breadcrumbs = [
  { name: 'Referensi', path: '/admin-referensi' },
  { name: 'Syarat', path: '/admin-referensi/syarat-item' },
  { name: 'Buat Syarat' }
]

const Form = () => {
  const dispatch = useDispatch()
  const router = useRouter()
  const searchParams = useSearchParams() // Get query params
  const urutan = searchParams.get('urutan')
  const nama = searchParams.get('nama')

  const { isEditing, item_id } = useSelector(store => store.syaratItem)

  const defaultValues = {
    urutan: urutan,
    nama: nama
  }

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({ defaultValues })

  const onSubmit = dataform => {
    if (isEditing) {
      dispatch(editsyaratItem({ item_id: item_id, dataform }))
    } else {
      dispatch(createSyaratItem(dataform))
    }

    router.push('/admin-referensi/syarat-item')
  }

  return (
    <>
      <CustomBreadcrumb breadcrumbs={breadcrumbs} />
      <Card>
        <CardHeader title='Form Input Syarat Item' />
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
                  name='urutan'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <CustomTextField
                      fullWidth
                      value={value}
                      label='Urutan'
                      onChange={onChange}
                      placeholder=''
                      error={Boolean(errors.urutan)}
                      aria-describedby='validation-basic-first-name'
                      {...(errors.urutan && {
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
